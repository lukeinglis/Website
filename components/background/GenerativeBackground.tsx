"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";

const HarborScene = dynamic(
  () =>
    import("@/components/harbor/HarborScene").then((mod) => mod.HarborScene),
  { ssr: false },
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return true;
  const cores = navigator.hardwareConcurrency ?? 0;
  return cores > 0 && cores < 4;
}

let cachedWebGL: boolean | null = null;
let cachedLowPower: boolean | null = null;

function getWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebGL === null) cachedWebGL = hasWebGL();
  return cachedWebGL;
}

function getLowPower(): boolean {
  if (typeof window === "undefined") return true;
  if (cachedLowPower === null) cachedLowPower = isLowPowerDevice();
  return cachedLowPower;
}

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getLowPowerServer = () => true;

function CssGradientFallback() {
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: -1,
        background:
          "linear-gradient(135deg, #2E3440 0%, #3B4252 40%, #434C5E 70%, #2E3440 100%)",
        transition: "background 300ms ease",
      }}
      aria-hidden="true"
    />
  );
}

export function GenerativeBackground() {
  const { phase, reducedMotion } = useTimeTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef(1);

  const canRender3D = useSyncExternalStore(
    subscribe,
    getWebGLSupport,
    getServerSnapshot,
  );
  const lowPower = useSyncExternalStore(
    subscribe,
    getLowPower,
    getLowPowerServer,
  );

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

  if (reducedMotion || !canRender3D) {
    return <CssGradientFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 hero-scene-container"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <HarborScene phase={phase} lowPower={lowPower} />
    </div>
  );
}
