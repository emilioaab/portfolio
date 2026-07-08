"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  // Each segment types out in sequence; a beat (pauseBetween) is inserted
  // after every segment except the last, so callers can make a phrase
  // "breathe" between clauses (e.g. ["Hello. ", "My name is Emil"]).
  segments: string[];
  speed?: number;
  pauseBetween?: number;
  startDelay?: number;
  className?: string;
};

export function Typewriter({
  segments,
  speed = 35,
  pauseBetween = 500,
  startDelay = 0,
  className,
}: TypewriterProps) {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  const text = useMemo(() => segments.join(""), [segments]);
  const pauseIndices = useMemo(() => {
    const indices = new Set<number>();
    let cumulative = 0;
    for (let i = 0; i < segments.length - 1; i++) {
      cumulative += segments[i].length;
      indices.add(cumulative);
    }
    return indices;
  }, [segments]);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick(i: number) {
      if (cancelled) return;
      setCount(i);
      if (i >= text.length) return;
      const delay = pauseIndices.has(i) ? speed + pauseBetween : speed;
      timeoutId = setTimeout(() => tick(i + 1), delay);
    }

    timeoutId = setTimeout(() => tick(1), startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, pauseIndices, speed, pauseBetween, startDelay, reducedMotion]);

  const visibleText = reducedMotion ? text : text.slice(0, count);

  return <span className={className}>{visibleText}</span>;
}
