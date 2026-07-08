"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINT_COUNT = 70;
const BOUNDS = 6;
const CONNECTION_DISTANCE = 2.2;
const ACCENT_COLOR = "#22d3ee";

// Cursor-repulsion tuning: points drift away within INFLUENCE_RADIUS of the
// cursor and spring back via RETURN_EASE; a click adds a decaying pulse on
// top of the same force for a momentary outward push.
const INFLUENCE_RADIUS = 1.8;
const PUSH_STRENGTH = 0.9;
const RETURN_EASE = 0.06;
const PULSE_DECAY = 0.92;
const PULSE_BOOST = 2.5;

// Deterministic pseudo-random (classic sine hash) instead of Math.random —
// keeps position generation a pure function, computed once at module load
// since this file only ever runs client-side (dynamically imported, ssr: false).
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

function generateBasePositions(): Float32Array {
  const arr = new Float32Array(POINT_COUNT * 3);
  for (let i = 0; i < POINT_COUNT; i++) {
    arr[i * 3] = (seededRandom(i * 12.9898) - 0.5) * BOUNDS * 2;
    arr[i * 3 + 1] = (seededRandom(i * 78.233) - 0.5) * BOUNDS * 2;
    arr[i * 3 + 2] = (seededRandom(i * 37.719 + 4.2) - 0.5) * BOUNDS;
  }
  return arr;
}

function generateConnectionPairs(positions: Float32Array): Array<[number, number]> {
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    for (let j = i + 1; j < POINT_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < CONNECTION_DISTANCE) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

const BASE_POSITIONS = generateBasePositions();
const CONNECTION_PAIRS = generateConnectionPairs(BASE_POSITIONS);

function NetworkGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef(0);

  // Mutated every frame by useFrame (an imperative animation-loop callback,
  // not render code) — useRef, not useMemo, since these are meant to be
  // freely mutated in place rather than treated as immutable render output.
  const currentPositionsRef = useRef<Float32Array>(Float32Array.from(BASE_POSITIONS));
  const linePositionsRef = useRef<Float32Array>(new Float32Array(CONNECTION_PAIRS.length * 6));
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const pointerWorldRef = useRef(new THREE.Vector3());

  // Attach the mutable buffers imperatively post-mount rather than via
  // JSX <bufferAttribute args={[ref.current, ...]} /> — reading a ref's
  // .current during render (even just to pass it as a prop) isn't allowed.
  useEffect(() => {
    pointsRef.current?.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositionsRef.current, 3),
    );
    lineRef.current?.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositionsRef.current, 3),
    );
  }, []);

  function triggerPulse() {
    pulseRef.current = 1;
  }

  useFrame((state) => {
    const currentPositions = currentPositionsRef.current;
    const linePositions = linePositionsRef.current;
    const pointerWorld = pointerWorldRef.current;

    const { pointer, raycaster, camera } = state;
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(planeRef.current, pointerWorld);

    pulseRef.current *= PULSE_DECAY;
    const pulseMultiplier = 1 + pulseRef.current * PULSE_BOOST;

    for (let i = 0; i < POINT_COUNT; i++) {
      const bx = BASE_POSITIONS[i * 3];
      const by = BASE_POSITIONS[i * 3 + 1];

      const dx = bx - pointerWorld.x;
      const dy = by - pointerWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = bx;
      let targetY = by;

      if (dist < INFLUENCE_RADIUS && dist > 0.0001) {
        const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_STRENGTH * pulseMultiplier;
        targetX = bx + (dx / dist) * force;
        targetY = by + (dy / dist) * force;
      }

      currentPositions[i * 3] += (targetX - currentPositions[i * 3]) * RETURN_EASE;
      currentPositions[i * 3 + 1] += (targetY - currentPositions[i * 3 + 1]) * RETURN_EASE;
    }

    if (pointsRef.current) {
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    for (let k = 0; k < CONNECTION_PAIRS.length; k++) {
      const [i, j] = CONNECTION_PAIRS[k];
      linePositions[k * 6] = currentPositions[i * 3];
      linePositions[k * 6 + 1] = currentPositions[i * 3 + 1];
      linePositions[k * 6 + 2] = currentPositions[i * 3 + 2];
      linePositions[k * 6 + 3] = currentPositions[j * 3];
      linePositions[k * 6 + 4] = currentPositions[j * 3 + 1];
      linePositions[k * 6 + 5] = currentPositions[j * 3 + 2];
    }
    if (lineRef.current) {
      (lineRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.3,
        0.02,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.2,
        0.02,
      );
      groupRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Invisible full-field plane so clicking anywhere in the hero
          triggers the pulse, not just when a ray happens to hit a
          sparse point or thin line. */}
      <mesh onPointerDown={triggerPulse} position={[0, 0, -1]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial color={ACCENT_COLOR} size={0.06} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color={ACCENT_COLOR} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <NetworkGroup />
    </Canvas>
  );
}
