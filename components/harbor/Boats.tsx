"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { TimePhase } from "@/lib/time";

interface BoatConfig {
  startX: number;
  z: number;
  speed: number;
  direction: 1 | -1;
  scale: number;
  hasMast: boolean;
}

const boatConfigs: BoatConfig[] = [
  { startX: -5, z: -3, speed: 0.12, direction: 1, scale: 0.8, hasMast: true },
  {
    startX: 8,
    z: -5,
    speed: 0.06,
    direction: -1,
    scale: 0.5,
    hasMast: true,
  },
  {
    startX: 2,
    z: -2,
    speed: 0.15,
    direction: 1,
    scale: 0.6,
    hasMast: false,
  },
];

const hullColor: Record<TimePhase, string> = {
  dawn: "#434C5E",
  morning: "#4C566A",
  afternoon: "#434C5E",
  evening: "#3B4252",
  night: "#2E3440",
};

interface SingleBoatProps {
  config: BoatConfig;
  phase: TimePhase;
}

function SingleBoat({ config, phase }: SingleBoatProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    let x = config.startX + t * config.speed * config.direction;
    const range = 20;
    x = ((((x + range) % (range * 2)) + range * 2) % (range * 2)) - range;
    groupRef.current.position.x = x;

    groupRef.current.position.y =
      -0.3 + Math.sin(t * 0.8 + config.startX) * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.6 + config.startX * 2) * 0.03;
  });

  return (
    <group
      ref={groupRef}
      position={[config.startX, -0.3, config.z]}
      scale={config.scale}
    >
      {/* Hull */}
      <mesh>
        <boxGeometry args={[0.8, 0.15, 0.25]} />
        <meshStandardMaterial color={hullColor[phase]} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.05, 0.12, 0]}>
        <boxGeometry args={[0.25, 0.1, 0.15]} />
        <meshStandardMaterial color="#4C566A" />
      </mesh>
      {/* Mast */}
      {config.hasMast && (
        <>
          <mesh position={[-0.05, 0.4, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.6, 4]} />
            <meshStandardMaterial color="#4C566A" />
          </mesh>
          {/* Sail */}
          <mesh position={[0.08, 0.35, 0]} rotation={[0, 0, 0.1]}>
            <planeGeometry args={[0.2, 0.35]} />
            <meshStandardMaterial
              color="#D8DEE9"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

interface BoatsProps {
  phase: TimePhase;
  lowPower: boolean;
}

export function Boats({ phase, lowPower }: BoatsProps) {
  const activeBoats = lowPower ? boatConfigs.slice(0, 1) : boatConfigs;

  return (
    <group>
      {activeBoats.map((config, i) => (
        <SingleBoat key={i} config={config} phase={phase} />
      ))}
    </group>
  );
}
