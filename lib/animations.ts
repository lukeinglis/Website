import type { TimePhase } from "./time";

export interface AnimationTiming {
  duration: number;
  staggerDelay: number;
  ease: string;
}

const timings: Record<TimePhase, AnimationTiming> = {
  dawn: { duration: 0.8, staggerDelay: 0.12, ease: "power2.out" },
  morning: { duration: 0.5, staggerDelay: 0.08, ease: "power3.out" },
  afternoon: { duration: 0.6, staggerDelay: 0.1, ease: "power2.out" },
  evening: { duration: 0.9, staggerDelay: 0.14, ease: "power2.inOut" },
  night: { duration: 1.1, staggerDelay: 0.16, ease: "power1.inOut" },
};

export function getAnimationTiming(phase: TimePhase): AnimationTiming {
  return timings[phase];
}

export function getMotionTransition(phase: TimePhase) {
  const t = timings[phase];
  const easeMap: Record<string, [number, number, number, number]> = {
    "power1.inOut": [0.42, 0, 0.58, 1],
    "power2.out": [0.33, 1, 0.68, 1],
    "power2.inOut": [0.65, 0, 0.35, 1],
    "power3.out": [0.22, 1, 0.36, 1],
  };
  return {
    duration: t.duration,
    ease: easeMap[t.ease] ?? [0.33, 1, 0.68, 1],
  };
}
