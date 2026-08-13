"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { TimePhase } from "@/lib/time";
import { Water } from "./Water";
import { Skyline } from "./Skyline";
import { Boats } from "./Boats";
import { HarborSky } from "./HarborSky";
import { HarborLighting } from "./HarborLighting";

interface HarborSceneProps {
  phase: TimePhase;
  lowPower: boolean;
}

export function HarborScene({ phase, lowPower }: HarborSceneProps) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.5]}
      camera={{
        position: [0, 1.2, 5],
        fov: 60,
        near: 0.1,
        far: 1000,
      }}
      frameloop={lowPower ? "demand" : "always"}
      gl={{ antialias: !lowPower, alpha: false }}
    >
      <Suspense fallback={null}>
        <HarborSky phase={phase} lowPower={lowPower} />
        <HarborLighting phase={phase} />
        <Water phase={phase} lowPower={lowPower} />
        <Skyline phase={phase} lowPower={lowPower} />
        <Boats phase={phase} lowPower={lowPower} />
        <fog
          attach="fog"
          args={[phase === "night" ? "#2E3440" : "#D8DEE9", 8, 25]}
        />
      </Suspense>
    </Canvas>
  );
}
