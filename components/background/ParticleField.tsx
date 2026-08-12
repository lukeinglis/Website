"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import type { TimePhase } from "@/lib/time";

interface ParticleConfig {
  count: number;
  speed: number;
  spread: number;
  sizeRange: [number, number];
}

const particleConfigs: Record<TimePhase, ParticleConfig> = {
  dawn: { count: 120, speed: 0.15, spread: 8, sizeRange: [0.02, 0.06] },
  morning: { count: 200, speed: 0.3, spread: 10, sizeRange: [0.02, 0.05] },
  afternoon: { count: 180, speed: 0.25, spread: 10, sizeRange: [0.03, 0.07] },
  evening: { count: 100, speed: 0.12, spread: 8, sizeRange: [0.02, 0.06] },
  night: { count: 60, speed: 0.08, spread: 12, sizeRange: [0.01, 0.04] },
};

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  sizes: Float32Array;
}

function generateParticleData(
  count: number,
  config: ParticleConfig,
): ParticleData {
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const sz = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * config.spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * config.spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * config.spread * 0.5;

    vel[i * 3] = (Math.random() - 0.5) * config.speed * 0.3;
    vel[i * 3 + 1] = (Math.random() - 0.5) * config.speed * 0.2;
    vel[i * 3 + 2] = (Math.random() - 0.5) * config.speed * 0.1;

    sz[i] =
      config.sizeRange[0] +
      Math.random() * (config.sizeRange[1] - config.sizeRange[0]);
  }
  return { positions: pos, velocities: vel, sizes: sz };
}

interface ParticleFieldProps {
  phase: TimePhase;
  particleColor: string;
  mousePosition: { x: number; y: number };
  lowPower: boolean;
}

export function ParticleField({
  phase,
  particleColor,
  mousePosition,
  lowPower,
}: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const config = particleConfigs[phase];
  const count = lowPower ? Math.floor(config.count / 3) : config.count;

  const [data] = useState<ParticleData>(() =>
    generateParticleData(count, config),
  );

  const frameSkip = useRef(0);

  useFrame(() => {
    if (lowPower) {
      frameSkip.current++;
      if (frameSkip.current % 2 !== 0) return;
    }

    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    const halfSpread = config.spread / 2;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += data.velocities[i * 3];
      arr[i * 3 + 1] += data.velocities[i * 3 + 1];
      arr[i * 3 + 2] += data.velocities[i * 3 + 2];

      arr[i * 3] += mousePosition.x * 0.002;
      arr[i * 3 + 1] += mousePosition.y * 0.002;

      if (arr[i * 3] > halfSpread) arr[i * 3] = -halfSpread;
      if (arr[i * 3] < -halfSpread) arr[i * 3] = halfSpread;
      if (arr[i * 3 + 1] > halfSpread) arr[i * 3 + 1] = -halfSpread;
      if (arr[i * 3 + 1] < -halfSpread) arr[i * 3 + 1] = halfSpread;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[data.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={config.sizeRange[1]}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
