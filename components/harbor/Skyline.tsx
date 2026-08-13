"use client";

import { useMemo } from "react";
import type { TimePhase } from "@/lib/time";

interface Building {
  width: number;
  height: number;
  depth: number;
  x: number;
}

const buildings: Building[] = [
  { width: 0.6, height: 1.8, depth: 0.5, x: -8 },
  { width: 0.8, height: 2.4, depth: 0.6, x: -7 },
  { width: 0.5, height: 1.5, depth: 0.4, x: -6.2 },
  { width: 0.7, height: 2.8, depth: 0.5, x: -5.5 },
  { width: 0.4, height: 2.0, depth: 0.4, x: -4.8 },
  { width: 0.9, height: 3.2, depth: 0.6, x: -4 },
  { width: 0.5, height: 2.6, depth: 0.5, x: -3.2 },
  { width: 0.6, height: 3.5, depth: 0.5, x: -2.5 },
  { width: 0.3, height: 4.0, depth: 0.3, x: -1.8 },
  // Custom House Tower — taller, narrow, distinctive
  { width: 0.35, height: 4.8, depth: 0.35, x: -1.0 },
  { width: 0.7, height: 3.0, depth: 0.5, x: -0.2 },
  { width: 0.8, height: 3.8, depth: 0.6, x: 0.7 },
  { width: 0.5, height: 2.5, depth: 0.4, x: 1.5 },
  { width: 0.6, height: 3.3, depth: 0.5, x: 2.2 },
  { width: 0.9, height: 2.8, depth: 0.6, x: 3.0 },
  { width: 0.4, height: 2.0, depth: 0.4, x: 3.8 },
  { width: 0.7, height: 2.5, depth: 0.5, x: 4.5 },
  { width: 0.5, height: 1.8, depth: 0.4, x: 5.3 },
  { width: 0.8, height: 2.2, depth: 0.6, x: 6.0 },
  { width: 0.6, height: 1.5, depth: 0.5, x: 6.8 },
  { width: 0.5, height: 1.2, depth: 0.4, x: 7.5 },
];

const buildingColor: Record<TimePhase, string> = {
  dawn: "#3B4252",
  morning: "#3B4252",
  afternoon: "#434C5E",
  evening: "#3B4252",
  night: "#2E3440",
};

const edgeLightColor: Record<TimePhase, string> = {
  dawn: "#D08770",
  morning: "#88C0D0",
  afternoon: "#EBCB8B",
  evening: "#B48EAD",
  night: "#4C566A",
};

interface SkylineProps {
  phase: TimePhase;
  lowPower: boolean;
}

// Deterministic hash to replace Math.random() during render
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function WindowLights({ buildings: bldgs }: { buildings: Building[] }) {
  const windowData = useMemo(() => {
    const positions: number[] = [];
    let seed = 0;
    for (const b of bldgs) {
      const windowCols = Math.max(1, Math.floor(b.width / 0.2));
      const windowRows = Math.max(1, Math.floor(b.height / 0.4));
      for (let col = 0; col < windowCols; col++) {
        for (let row = 0; row < windowRows; row++) {
          seed++;
          if (seededRandom(seed) > 0.4) continue;
          const wx = b.x - b.width / 2 + (col + 0.5) * (b.width / windowCols);
          const wy = (row + 0.5) * (b.height / windowRows);
          const wz = -8 + b.depth / 2 + 0.01;
          positions.push(wx, wy, wz);
        }
      }
    }
    return new Float32Array(positions);
  }, [bldgs]);

  if (windowData.length === 0) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[windowData, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#EBCB8B"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Skyline({ phase, lowPower }: SkylineProps) {
  const isNight = phase === "night" || phase === "evening";

  return (
    <group position={[0, -0.5, -8]}>
      {buildings.map((b, i) => (
        <group key={i}>
          <mesh position={[b.x, b.height / 2, 0]}>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color={buildingColor[phase]}
              emissive={isNight ? edgeLightColor[phase] : "#000000"}
              emissiveIntensity={isNight ? 0.05 : 0}
            />
          </mesh>
          {/* Custom House Tower clock section */}
          {i === 9 && (
            <mesh position={[b.x, b.height + 0.25, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial
                color={buildingColor[phase]}
                emissive={isNight ? "#EBCB8B" : "#000000"}
                emissiveIntensity={isNight ? 0.1 : 0}
              />
            </mesh>
          )}
        </group>
      ))}
      {isNight && !lowPower && <WindowLights buildings={buildings} />}
    </group>
  );
}
