"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ProjectVideoProps = {
  mp4Src: string;
  webmSrc?: string;
  poster: string;
  className?: string;
};

// Autoplay/pause is triggered from an IntersectionObserver callback the
// effect merely registers — an imperative side effect, not setState, so it
// doesn't run into react-hooks/set-state-in-effect (same pattern as
// useActiveSection).
export function ProjectVideo({ mp4Src, webmSrc, poster, className }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("flex h-full w-full items-center justify-center p-4", className)}>
      <video
        ref={videoRef}
        className="aspect-[1280/582] w-full rounded-md object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
