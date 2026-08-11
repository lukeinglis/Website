"use client";

import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { getGreeting } from "@/lib/time";

export default function Home() {
  const { phase } = useTimeTheme();
  const greeting = getGreeting(phase);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <p
          className="text-lg font-medium tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {greeting}
        </p>
        <h1
          className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          Luke Inglis
        </h1>
        <p
          className="mt-6 text-lg leading-8"
          style={{ color: "var(--text-secondary)" }}
        >
          A dynamic, time-aware personal website — coming soon.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6">
          <ThemeToggle />
          <MotionToggle />
        </div>
      </div>
    </main>
  );
}
