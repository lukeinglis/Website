"use client";

import { useTimeTheme } from "@/app/providers/TimeThemeProvider";

export function MotionToggle() {
  const { reducedMotion, setReducedMotion } = useTimeTheme();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-[var(--text-secondary)]">Reduce motion</span>
      <button
        role="switch"
        aria-checked={reducedMotion}
        onClick={() => setReducedMotion(!reducedMotion)}
        className="relative h-5 w-9 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: reducedMotion
            ? "var(--accent)"
            : "var(--text-secondary)",
          opacity: reducedMotion ? 1 : 0.4,
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200"
          style={{
            transform: reducedMotion ? "translateX(16px)" : "translateX(0)",
          }}
        />
      </button>
    </label>
  );
}
