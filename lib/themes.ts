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
    bgPrimary: "#FFF7ED",
    bgSecondary: "#FFE4C9",
    textPrimary: "#431407",
    textSecondary: "#78350F",
    accent: "#FF9A76",
    particleColor: "#FFB89A",
  },
  morning: {
    bgPrimary: "#F0F9FF",
    bgSecondary: "#E0F2FE",
    textPrimary: "#0C1929",
    textSecondary: "#1E3A5F",
    accent: "#2563EB",
    particleColor: "#60A5FA",
  },
  afternoon: {
    bgPrimary: "#FFFBEB",
    bgSecondary: "#FEF3C7",
    textPrimary: "#451A03",
    textSecondary: "#713F12",
    accent: "#D97706",
    particleColor: "#FBBF24",
  },
  evening: {
    bgPrimary: "#EEF2FF",
    bgSecondary: "#E0E7FF",
    textPrimary: "#1E1B4B",
    textSecondary: "#312E81",
    accent: "#6366F1",
    particleColor: "#818CF8",
  },
  night: {
    bgPrimary: "#0F0D2E",
    bgSecondary: "#1E1B4B",
    textPrimary: "#E0E7FF",
    textSecondary: "#A5B4FC",
    accent: "#818CF8",
    particleColor: "#A5B4FC",
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
