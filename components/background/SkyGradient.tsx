"use client";

import { useMemo } from "react";
import type { TimePhase } from "@/lib/time";

const skyColors: Record<TimePhase, { top: string; bottom: string }> = {
  dawn: { top: "#FF9A76", bottom: "#FFE4C9" },
  morning: { top: "#87CEEB", bottom: "#E0F2FE" },
  afternoon: { top: "#F59E0B", bottom: "#FEF3C7" },
  evening: { top: "#4338CA", bottom: "#E0E7FF" },
  night: { top: "#0F0D2E", bottom: "#1E1B4B" },
};

interface SkyGradientProps {
  phase: TimePhase;
}

export function SkyGradient({ phase }: SkyGradientProps) {
  const colors = skyColors[phase];

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = useMemo(() => {
    const topRgb = hexToGlsl(colors.top);
    const bottomRgb = hexToGlsl(colors.bottom);
    return `
      varying vec2 vUv;
      void main() {
        vec3 topColor = vec3(${topRgb});
        vec3 bottomColor = vec3(${bottomRgb});
        vec3 color = mix(bottomColor, topColor, vUv.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  }, [colors]);

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[30, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

function hexToGlsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return `${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)}`;
}
