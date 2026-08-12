"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { themes } from "@/lib/themes";

const BackgroundScene = dynamic(
  () => import("./BackgroundScene").then((mod) => mod.BackgroundScene),
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
          "linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))",
        transition: "background 300ms ease",
      }}
      aria-hidden="true"
    />
  );
}

export function GenerativeBackground() {
  const { phase, reducedMotion } = useTimeTheme();

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

  if (reducedMotion || !canRender3D) {
    return <CssGradientFallback />;
  }

  const particleColor = themes[phase].particleColor;

  return (
    <BackgroundScene
      phase={phase}
      particleColor={particleColor}
      lowPower={lowPower}
    />
  );
}
