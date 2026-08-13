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
        span.textContent = char === " " ? " " : char;
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
      className="relative flex min-h-screen flex-col items-start justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p
          className="font-mono text-sm tracking-widest uppercase animate-fade-in"
          style={{ color: "var(--accent)" }}
        >
          {greeting}
        </p>
        <h1
          ref={headingRef}
          className="mt-2 font-serif text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          Luke Inglis
        </h1>
        <p
          className="mt-4 text-lg font-medium animate-fade-in"
          style={{ color: "var(--text-secondary)", animationDelay: "0.6s" }}
        >
          Technical Product Manager, Red Hat AI
        </p>
        <div
          className="mt-10 flex flex-col items-start gap-3 animate-fade-in"
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
            Say hello
          </a>
        </div>
      </div>
    </section>
  );
}
