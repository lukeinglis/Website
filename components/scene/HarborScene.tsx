"use client";

import { useCallback, useEffect, useRef } from "react";
import type { TimePhase } from "@/lib/time";
import { SkylineSVG } from "./SkylineSVG";
import { BoatsSVG } from "./BoatsSVG";

interface HarborSceneProps {
  phase: TimePhase;
  reducedMotion: boolean;
}

const skyGradients: Record<TimePhase, string> = {
  dawn: "linear-gradient(to bottom, #2E3440 0%, #3B4252 40%, #D08770 100%)",
  morning: "linear-gradient(to bottom, #5E81AC 0%, #81A1C1 50%, #88C0D0 100%)",
  afternoon:
    "linear-gradient(to bottom, #81A1C1 0%, #88C0D0 50%, #EBCB8B 100%)",
  evening: "linear-gradient(to bottom, #2E3440 0%, #3B4252 40%, #B48EAD 100%)",
  night: "linear-gradient(to bottom, #2E3440 0%, #2E3440 60%, #3B4252 100%)",
};

const waterColors: Record<TimePhase, string> = {
  dawn: "#3B4252",
  morning: "#3B4252",
  afternoon: "#434C5E",
  evening: "#3B4252",
  night: "#2E3440",
};

const accentColors: Record<TimePhase, string> = {
  dawn: "#D08770",
  morning: "#88C0D0",
  afternoon: "#EBCB8B",
  evening: "#B48EAD",
  night: "#5E81AC",
};

const celestialConfig: Record<
  TimePhase,
  { cx: string; cy: string; r: number; color: string; glow: string }
> = {
  dawn: { cx: "50%", cy: "82%", r: 22, color: "#D08770", glow: "#D08770" },
  morning: { cx: "70%", cy: "35%", r: 18, color: "#EBCB8B", glow: "#EBCB8B" },
  afternoon: {
    cx: "35%",
    cy: "25%",
    r: 20,
    color: "#EBCB8B",
    glow: "#EBCB8B",
  },
  evening: { cx: "25%", cy: "78%", r: 20, color: "#B48EAD", glow: "#B48EAD" },
  night: { cx: "80%", cy: "18%", r: 10, color: "#D8DEE9", glow: "#E5E9F0" },
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Stars({ phase }: { phase: TimePhase }) {
  const isNight = phase === "night";
  const isEvening = phase === "evening";
  if (!isNight && !isEvening) return null;

  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars.push({
      cx: seededRandom(i * 3 + 1) * 100,
      cy: seededRandom(i * 3 + 2) * 55,
      r: seededRandom(i * 3 + 3) * 1.2 + 0.3,
      delay: seededRandom(i * 7) * 4,
    });
  }

  return (
    <div className="harbor-stars-layer" style={{ opacity: isNight ? 1 : 0.4 }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "55%" }}
        aria-hidden="true"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#D8DEE9"
            className="harbor-star"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function CelestialBody({ phase }: { phase: TimePhase }) {
  const config = celestialConfig[phase];
  return (
    <div className="harbor-celestial-layer" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="celestial-glow">
            <stop offset="0%" stopColor={config.glow} stopOpacity="0.6" />
            <stop offset="50%" stopColor={config.glow} stopOpacity="0.15" />
            <stop offset="100%" stopColor={config.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx={config.cx}
          cy={config.cy}
          r={config.r * 2.5}
          fill="url(#celestial-glow)"
        />
        <circle
          cx={config.cx}
          cy={config.cy}
          r={config.r}
          fill={config.color}
        />
      </svg>
    </div>
  );
}

function WaterLayer({ phase }: { phase: TimePhase }) {
  return (
    <div
      className="harbor-water-layer"
      style={{ backgroundColor: waterColors[phase] }}
    >
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="water-ripple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.003"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015 0.003;0.018 0.005;0.015 0.003"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="water-surface" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--scene-accent, #88C0D0)"
              stopOpacity="0.12"
            />
            <stop
              offset="100%"
              stopColor={waterColors[phase]}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <rect
          width="1000"
          height="300"
          fill="url(#water-surface)"
          filter="url(#water-ripple)"
        />
        {/* Subtle horizontal shimmer lines */}
        <line
          x1="0"
          y1="40"
          x2="1000"
          y2="40"
          stroke="var(--scene-accent, #88C0D0)"
          strokeWidth="0.5"
          opacity="0.08"
        />
        <line
          x1="0"
          y1="100"
          x2="1000"
          y2="100"
          stroke="var(--scene-accent, #88C0D0)"
          strokeWidth="0.3"
          opacity="0.06"
        />
        <line
          x1="0"
          y1="170"
          x2="1000"
          y2="170"
          stroke="var(--scene-accent, #88C0D0)"
          strokeWidth="0.4"
          opacity="0.05"
        />
      </svg>
    </div>
  );
}

function SkylineReflection({ phase }: { phase: TimePhase }) {
  return (
    <div className="harbor-reflection-layer" aria-hidden="true">
      <SkylineSVG phase={phase} />
    </div>
  );
}

function Foreground() {
  return (
    <div className="harbor-foreground-layer" aria-hidden="true">
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="xMidYMax slice"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Rocky shoreline */}
        <path
          d={[
            "M 0,120 L 0,90",
            "Q 20,85 40,88 Q 60,78 80,82 Q 100,75 130,80",
            "Q 150,72 170,78 Q 190,68 220,75 Q 250,70 280,74",
            "Q 310,65 350,72 Q 380,68 400,73",
            "Q 430,64 460,70 Q 490,66 520,72 Q 550,63 580,68",
            "Q 610,62 640,67 Q 670,60 700,66 Q 730,58 760,64",
            "Q 790,60 820,65 Q 850,58 880,62 Q 910,55 940,60",
            "Q 960,56 980,58 L 1000,55 L 1000,120 Z",
          ].join(" ")}
          fill="#2E3440"
        />

        {/* Dock posts */}
        <rect x="80" y="48" width="8" height="42" rx="1" fill="#2E3440" />
        <rect x="200" y="42" width="8" height="48" rx="1" fill="#2E3440" />
        <rect x="320" y="44" width="8" height="46" rx="1" fill="#2E3440" />

        {/* Chain railing — catenary curves between posts */}
        <path
          d="M 84,54 Q 140,70 204,48"
          fill="none"
          stroke="#3B4252"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 204,48 Q 260,64 324,50"
          fill="none"
          stroke="#3B4252"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function HarborScene({ phase, reducedMotion }: HarborSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (reducedMotion || !sceneRef.current) return;
    const scrollY = window.scrollY;
    const layers = sceneRef.current.querySelectorAll("[data-parallax]");
    layers.forEach((layer) => {
      const rate = parseFloat((layer as HTMLElement).dataset.parallax ?? "0");
      (layer as HTMLElement).style.transform =
        `translateY(${scrollY * rate}px)`;
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, reducedMotion]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const root = sceneRef.current;
    root.style.setProperty("--scene-accent", accentColors[phase]);
    root.style.setProperty("--sky-gradient", skyGradients[phase]);
  }, [phase]);

  return (
    <div
      ref={sceneRef}
      className="harbor-scene"
      role="img"
      aria-label="Illustrated view of Boston Harbor at dusk, looking west from East Boston toward the downtown skyline"
    >
      {/* Layer 1: Sky gradient (CSS only) */}
      <div className="harbor-sky-layer" data-parallax="-0.05" />

      {/* Layer 2: Stars */}
      <div data-parallax="-0.04">
        <Stars phase={phase} />
      </div>

      {/* Layer 3: Sun/Moon */}
      <div data-parallax="-0.06">
        <CelestialBody phase={phase} />
      </div>

      {/* Layer 4: Skyline */}
      <div className="harbor-skyline-container" data-parallax="-0.08">
        <SkylineSVG phase={phase} />
      </div>

      {/* Layer 5: Water + reflection */}
      <div data-parallax="-0.1">
        <SkylineReflection phase={phase} />
        <WaterLayer phase={phase} />
      </div>

      {/* Layer 6: Boats */}
      <div className="harbor-boats-container" data-parallax="-0.12">
        <BoatsSVG reducedMotion={reducedMotion} />
      </div>

      {/* Layer 7: Foreground dock */}
      <div className="harbor-foreground-container" data-parallax="-0.15">
        <Foreground />
      </div>
    </div>
  );
}
