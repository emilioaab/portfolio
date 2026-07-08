"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// This value never changes after mount, so subscribe is a no-op — the
// point of useSyncExternalStore here is just to defer this read past
// the server-rendered pass (getServerSnapshot) without setState-in-effect.
function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobileViewport = window.innerWidth < 768;
  return !reducedMotion && !isMobileViewport && supportsWebGL();
}

function getServerSnapshot(): boolean {
  return false;
}

// Renders nothing on the server and nothing until we've confirmed the
// client supports it — the static CSS HeroBackground underneath is the
// real fallback, this is a progressive enhancement layered on top of it.
export function HeroCanvas() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) return null;

  return (
    <div className="animate-fade-in absolute inset-0 -z-10">
      <NetworkScene />
    </div>
  );
}
