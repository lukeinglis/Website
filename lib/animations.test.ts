import { describe, expect, it } from "vitest";
import { getAnimationTiming, getMotionTransition } from "./animations";
import type { TimePhase } from "./time";

describe("getAnimationTiming", () => {
  const phases: TimePhase[] = [
    "dawn",
    "morning",
    "afternoon",
    "evening",
    "night",
  ];

  it.each(phases)("returns valid timing for %s", (phase) => {
    const timing = getAnimationTiming(phase);
    expect(timing.duration).toBeGreaterThan(0);
    expect(timing.staggerDelay).toBeGreaterThan(0);
    expect(timing.ease).toBeTruthy();
  });

  it("morning is snappier than night", () => {
    const morning = getAnimationTiming("morning");
    const night = getAnimationTiming("night");
    expect(morning.duration).toBeLessThan(night.duration);
  });
});

describe("getMotionTransition", () => {
  it("returns a cubic bezier array for each phase", () => {
    const transition = getMotionTransition("morning");
    expect(transition.duration).toBeGreaterThan(0);
    expect(transition.ease).toHaveLength(4);
    transition.ease.forEach((v: number) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    });
  });
});
