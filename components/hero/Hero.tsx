"use client";

import { useEffect, useRef } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getGreeting } from "@/lib/time";
import { getAnimationTiming } from "@/lib/animations";

export function Hero() {
  const { phase, reducedMotion } = useTimeTheme();
  const greeting = getGreeting(phase, new Date());
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el || reducedMotion) return;

    let ctx: { revert: () => void } | undefined;
    const originalText = el.textContent ?? "";

    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      const timing = getAnimationTiming(phase);

      el.innerHTML = "";
      const chars = originalText.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? " " : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        el.appendChild(span);
        return span;
      });

      ctx = gsap.context(() => {
        gsap.fromTo(
          chars,
          { y: 30, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: timing.duration * 0.8,
            ease: timing.ease,
            stagger: 0.03,
            force3D: true,
            delay: 0.3,
          },
        );
      }, el);
    })();

    return () => {
      ctx?.revert();
      if (el) el.textContent = originalText;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="hero"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-2xl text-center">
        <p
          className="text-lg font-medium tracking-wide animate-fade-in"
          style={{ color: "var(--accent)" }}
        >
          {greeting}
        </p>
        <h1
          ref={headingRef}
          className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          Luke Inglis
        </h1>
        <p
          className="mt-6 text-lg leading-8 sm:text-xl animate-fade-in"
          style={{ color: "var(--text-secondary)", animationDelay: "0.6s" }}
        >
          AI research engineer at Red Hat, making LLMs faster and more
          efficient.
        </p>
        <div
          className="mt-10 flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
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
