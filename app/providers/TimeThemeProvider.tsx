"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getThemeCssVars } from "@/lib/themes";
import { type TimePhase, getPhaseForHour } from "@/lib/time";

export type ThemeMode = "auto" | TimePhase;

interface TimeThemeContextValue {
  phase: TimePhase;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}

const TimeThemeContext = createContext<TimeThemeContextValue | null>(null);

export function useTimeTheme() {
  const ctx = useContext(TimeThemeContext);
  if (!ctx)
    throw new Error("useTimeTheme must be used within TimeThemeProvider");
  return ctx;
}

const STORAGE_KEY_MODE = "theme-mode";
const STORAGE_KEY_MOTION = "reduced-motion";

function getCurrentHour(): number {
  return new Date().getHours();
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem(STORAGE_KEY_MODE);
  if (
    stored === "auto" ||
    stored === "dawn" ||
    stored === "morning" ||
    stored === "afternoon" ||
    stored === "evening" ||
    stored === "night"
  ) {
    return stored;
  }
  return "auto";
}

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY_MOTION);
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [currentHour, setCurrentHour] = useState<number>(getCurrentHour);
  const [reducedMotion, setReducedMotionState] = useState(
    getInitialReducedMotion,
  );
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const msUntilNextHour =
      (60 - new Date().getMinutes()) * 60 * 1000 -
      new Date().getSeconds() * 1000;

    const timeout = setTimeout(() => {
      setCurrentHour(getCurrentHour());

      const interval = setInterval(() => {
        setCurrentHour(getCurrentHour());
      }, 3600000);

      return () => clearInterval(interval);
    }, msUntilNextHour);

    return () => clearTimeout(timeout);
  }, []);

  const phase = useMemo<TimePhase>(() => {
    if (mode !== "auto") return mode;
    return getPhaseForHour(currentHour);
  }, [mode, currentHour]);

  useEffect(() => {
    const vars = getThemeCssVars(phase);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    root.dataset.theme = phase;
  }, [phase]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reducedMotion]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY_MODE, newMode);
    const resolvedPhase =
      newMode === "auto" ? getPhaseForHour(getCurrentHour()) : newMode;
    setAnnouncement(`Theme changed to ${resolvedPhase}`);
  }, []);

  const setReducedMotion = useCallback((v: boolean) => {
    setReducedMotionState(v);
    localStorage.setItem(STORAGE_KEY_MOTION, String(v));
  }, []);

  const value = useMemo(
    () => ({ phase, mode, setMode, reducedMotion, setReducedMotion }),
    [phase, mode, setMode, reducedMotion, setReducedMotion],
  );

  return (
    <TimeThemeContext value={value}>
      {children}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </TimeThemeContext>
  );
}
