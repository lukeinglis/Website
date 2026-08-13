import type { TimePhase } from "./time";

export interface ThemePalette {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  particleColor: string;
}

export const themes: Record<TimePhase, ThemePalette> = {
  dawn: {
    bgPrimary: "#2E3440",
    bgSecondary: "#3B4252",
    textPrimary: "#ECEFF4",
    textSecondary: "#D8DEE9",
    accent: "#D08770",
    particleColor: "#D08770",
  },
  morning: {
    bgPrimary: "#2E3440",
    bgSecondary: "#3B4252",
    textPrimary: "#ECEFF4",
    textSecondary: "#D8DEE9",
    accent: "#88C0D0",
    particleColor: "#88C0D0",
  },
  afternoon: {
    bgPrimary: "#2E3440",
    bgSecondary: "#3B4252",
    textPrimary: "#ECEFF4",
    textSecondary: "#D8DEE9",
    accent: "#EBCB8B",
    particleColor: "#EBCB8B",
  },
  evening: {
    bgPrimary: "#2E3440",
    bgSecondary: "#3B4252",
    textPrimary: "#E5E9F0",
    textSecondary: "#D8DEE9",
    accent: "#B48EAD",
    particleColor: "#B48EAD",
  },
  night: {
    bgPrimary: "#2E3440",
    bgSecondary: "#3B4252",
    textPrimary: "#D8DEE9",
    textSecondary: "#D8DEE9",
    accent: "#5E81AC",
    particleColor: "#5E81AC",
  },
};

export function getThemeCssVars(phase: TimePhase): Record<string, string> {
  const palette = themes[phase];
  return {
    "--bg-primary": palette.bgPrimary,
    "--bg-secondary": palette.bgSecondary,
    "--text-primary": palette.textPrimary,
    "--text-secondary": palette.textSecondary,
    "--accent": palette.accent,
  };
}
