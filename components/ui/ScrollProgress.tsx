"use client";

import { useEffect, useState } from "react";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { reducedMotion } = useTimeTheme();

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5"
      style={{
        width: `${progress * 100}%`,
        backgroundColor: "var(--accent)",
        transition: "width 100ms linear",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
