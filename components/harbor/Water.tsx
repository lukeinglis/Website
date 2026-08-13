"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { TimePhase } from "@/lib/time";

const waterColors: Record<TimePhase, string> = {
  dawn: "#3B4252",
  morning: "#3B4252",
  afternoon: "#434C5E",
  evening: "#3B4252",
  night: "#2E3440",
};

const reflectionTints: Record<TimePhase, string> = {
  dawn: "#D08770",
  morning: "#88C0D0",
  afternoon: "#EBCB8B",
  evening: "#B48EAD",
  night: "#4C566A",
};

interface WaterProps {
  phase: TimePhase;
  lowPower: boolean;
}

export function Water({ phase, lowPower }: WaterProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const segments = lowPower ? 32 : 64;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaterColor: { value: new THREE.Color(waterColors[phase]) },
      uReflectionColor: { value: new THREE.Color(reflectionTints[phase]) },
    }),
    [phase],
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uWaterColor.value.set(waterColors[phase]);
    materialRef.current.uniforms.uReflectionColor.value.set(
      reflectionTints[phase],
    );
  });

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.04;
      float wave2 = sin(pos.x * 4.0 - uTime * 0.3) * 0.02;
      float wave3 = sin(pos.y * 3.0 + uTime * 0.4) * 0.03;
      pos.z += wave1 + wave2 + wave3;
      vElevation = wave1 + wave2 + wave3;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uWaterColor;
    uniform vec3 uReflectionColor;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float reflectionStrength = smoothstep(-0.02, 0.06, vElevation);
      float distanceFade = smoothstep(0.0, 1.0, vUv.y);
      vec3 color = mix(uWaterColor, uReflectionColor, reflectionStrength * 0.3 + distanceFade * 0.15);
      float shimmer = smoothstep(0.03, 0.06, vElevation) * 0.15;
      color += shimmer;
      gl_FragColor = vec4(color, 0.95);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[40, 20, segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
