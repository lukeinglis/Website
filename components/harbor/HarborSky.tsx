"use client";

import { useMemo } from "react";
import { Sky, Stars } from "@react-three/drei";
import type { TimePhase } from "@/lib/time";

interface SkyConfig {
  turbidity: number;
  rayleigh: number;
  sunPosition: [number, number, number];
  useSky: boolean;
}

const skyConfigs: Record<TimePhase, SkyConfig> = {
  dawn: {
    turbidity: 10,
    rayleigh: 3,
    sunPosition: [0, 0.2, -1],
    useSky: true,
  },
  morning: {
    turbidity: 6,
    rayleigh: 1,
    sunPosition: [1, 1.5, -1],
    useSky: true,
  },
  afternoon: {
    turbidity: 8,
    rayleigh: 2,
    sunPosition: [-0.5, 1, -1],
    useSky: true,
  },
  evening: {
    turbidity: 10,
    rayleigh: 3,
    sunPosition: [-1, 0.1, -1],
    useSky: true,
  },
  night: {
    turbidity: 0,
    rayleigh: 0,
    sunPosition: [0, -1, 0],
    useSky: false,
  },
};

interface HarborSkyProps {
  phase: TimePhase;
  lowPower: boolean;
}

export function HarborSky({ phase, lowPower }: HarborSkyProps) {
  const config = skyConfigs[phase];
  const isNight = phase === "night";

  const starCount = useMemo(() => (lowPower ? 1000 : 3000), [lowPower]);

  if (!config.useSky) {
    return (
      <>
        <color attach="background" args={["#2E3440"]} />
        {!lowPower && (
          <Stars
            radius={80}
            depth={50}
            count={starCount}
            factor={3}
            saturation={0}
            fade
            speed={0.3}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={config.sunPosition}
        turbidity={config.turbidity}
        rayleigh={config.rayleigh}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      {isNight && !lowPower && (
        <Stars
          radius={80}
          depth={50}
          count={starCount}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />
      )}
    </>
  );
}
