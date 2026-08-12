"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import type { TimePhase } from "@/lib/time";
import { ParticleField } from "./ParticleField";
import { SkyGradient } from "./SkyGradient";

interface BackgroundSceneProps {
  phase: TimePhase;
  particleColor: string;
  lowPower: boolean;
}

export function BackgroundScene({
  phase,
  particleColor,
  lowPower,
}: BackgroundSceneProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (lowPower) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    },
    [lowPower],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={lowPower ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        frameloop={lowPower ? "demand" : "always"}
        gl={{ antialias: !lowPower, alpha: true }}
      >
        <Suspense fallback={null}>
          <SkyGradient phase={phase} />
          <ParticleField
            phase={phase}
            particleColor={particleColor}
            mousePosition={mousePos}
            lowPower={lowPower}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
