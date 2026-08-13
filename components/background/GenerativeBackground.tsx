"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { HarborScene } from "@/components/scene/HarborScene";

export function GenerativeBackground() {
  const { phase, reducedMotion } = useTimeTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef(1);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const newOpacity = Math.max(0, 1 - scrollY / vh);
    if (Math.abs(newOpacity - opacityRef.current) > 0.01) {
      opacityRef.current = newOpacity;
      containerRef.current.style.opacity = String(newOpacity);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 hero-scene-container"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <HarborScene phase={phase} reducedMotion={reducedMotion} />
    </div>
  );
}
