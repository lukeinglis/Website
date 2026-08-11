"use client";

import { useEffect, useRef } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getAnimationTiming } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase, reducedMotion } = useTimeTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const timing = getAnimationTiming(phase);
      const targets = stagger ? el.children : el;

      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: timing.duration,
            ease: timing.ease,
            delay,
            stagger: stagger ? timing.staggerDelay : 0,
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el);
    })();

    return () => ctx?.revert();
  }, [phase, reducedMotion, stagger, delay]);

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
