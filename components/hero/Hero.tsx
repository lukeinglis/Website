"use client";

import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getGreeting } from "@/lib/time";

export function Hero() {
  const { phase } = useTimeTheme();
  const greeting = getGreeting(phase);

  return (
    <section
      id="hero"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-2xl text-center animate-fade-in">
        <p
          className="text-lg font-medium tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {greeting}
        </p>
        <h1
          className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          Luke Inglis
        </h1>
        <p
          className="mt-6 text-lg leading-8 sm:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Software engineer building tools and systems that make complex work
          simpler.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
