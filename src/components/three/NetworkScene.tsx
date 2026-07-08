"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINT_COUNT = 70;
const BOUNDS = 6;
const CONNECTION_DISTANCE = 2.2;
const ACCENT_COLOR = "#22d3ee";

// Deterministic pseudo-random (classic sine hash) instead of Math.random —
// keeps position generation a pure function, computed once at module load
// since this file only ever runs client-side (dynamically imported, ssr: false).
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

function generatePositions(): Float32Array {
  const arr = new Float32Array(POINT_COUNT * 3);
  for (let i = 0; i < POINT_COUNT; i++) {
    arr[i * 3] = (seededRandom(i * 12.9898) - 0.5) * BOUNDS * 2;
    arr[i * 3 + 1] = (seededRandom(i * 78.233) - 0.5) * BOUNDS * 2;
    arr[i * 3 + 2] = (seededRandom(i * 37.719 + 4.2) - 0.5) * BOUNDS;
  }
  return arr;
}

function generateLinePositions(positions: Float32Array): Float32Array {
  const segments: number[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    for (let j = i + 1; j < POINT_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < CONNECTION_DISTANCE) {
        segments.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2],
        );
      }
    }
  }
  return new Float32Array(segments);
}

const POSITIONS = generatePositions();
const LINE_POSITIONS = generateLinePositions(POSITIONS);

// Static point cloud — the only per-frame work is a single cheap group
// rotation lerp toward the cursor. No per-point physics, no raycasting,
// no dynamic buffer rewrites: kept deliberately light so it stays snappy.
function NetworkGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  useEffect(() => {
    pointsRef.current?.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(POSITIONS, 3),
    );
    lineRef.current?.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(LINE_POSITIONS, 3),
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.4,
      0.04,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.28,
      0.04,
    );
    groupRef.current.rotation.z += 0.0004;
  });

  return (
    <group ref={groupRef}>
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
