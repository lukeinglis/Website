"use client";

import type { TimePhase } from "@/lib/time";

const ambientColors: Record<TimePhase, string> = {
  dawn: "#D08770",
  morning: "#88C0D0",
  afternoon: "#EBCB8B",
  evening: "#B48EAD",
  night: "#4C566A",
};

const ambientIntensity: Record<TimePhase, number> = {
  dawn: 0.4,
  morning: 0.6,
  afternoon: 0.7,
  evening: 0.35,
  night: 0.15,
};

const directionalColors: Record<TimePhase, string> = {
  dawn: "#D08770",
  morning: "#ECEFF4",
  afternoon: "#EBCB8B",
  evening: "#B48EAD",
  night: "#4C566A",
};

const directionalIntensity: Record<TimePhase, number> = {
  dawn: 0.6,
  morning: 0.8,
  afternoon: 1.0,
  evening: 0.5,
  night: 0,
};

const sunPositions: Record<TimePhase, [number, number, number]> = {
  dawn: [0, 2, -5],
  morning: [5, 8, -3],
  afternoon: [-3, 6, -4],
  evening: [-5, 1, -5],
  night: [0, -5, 0],
};

interface HarborLightingProps {
  phase: TimePhase;
}

export function HarborLighting({ phase }: HarborLightingProps) {
  const isNight = phase === "night";

  return (
    <>
      <ambientLight
        color={ambientColors[phase]}
        intensity={ambientIntensity[phase]}
      />
      {!isNight && (
        <directionalLight
          color={directionalColors[phase]}
          intensity={directionalIntensity[phase]}
          position={sunPositions[phase]}
        />
      )}
      {isNight && (
        <>
          <pointLight
            color="#EBCB8B"
            intensity={0.3}
            position={[-1, 2.5, -7.5]}
            distance={5}
          />
          <pointLight
            color="#EBCB8B"
            intensity={0.2}
            position={[2, 1.8, -7.5]}
            distance={4}
          />
        </>
      )}
    </>
  );
}
