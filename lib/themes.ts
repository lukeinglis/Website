import type { Season, TimePhase } from "./time";

export interface ThemePalette {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
}

export interface SeasonalAccent {
  accentSeasonal: string;
  particleColor: string;
}

export const themes: Record<TimePhase, ThemePalette> = {
  dawn: {
    bgPrimary: "#FFF7ED",
    bgSecondary: "#FFE4C9",
    textPrimary: "#431407",
    textSecondary: "#78350F",
    accent: "#FF9A76",
  },
  morning: {
    bgPrimary: "#F0F9FF",
    bgSecondary: "#E0F2FE",
    textPrimary: "#0C1929",
    textSecondary: "#1E3A5F",
    accent: "#2563EB",
  },
  afternoon: {
    bgPrimary: "#FFFBEB",
    bgSecondary: "#FEF3C7",
    textPrimary: "#451A03",
    textSecondary: "#713F12",
    accent: "#D97706",
  },
  evening: {
    bgPrimary: "#EEF2FF",
    bgSecondary: "#E0E7FF",
    textPrimary: "#1E1B4B",
    textSecondary: "#312E81",
    accent: "#6366F1",
  },
  night: {
    bgPrimary: "#0F0D2E",
    bgSecondary: "#1E1B4B",
    textPrimary: "#E0E7FF",
    textSecondary: "#A5B4FC",
    accent: "#818CF8",
  },
};

export const seasonalAccents: Record<Season, SeasonalAccent> = {
  spring: {
    accentSeasonal: "#10B981",
    particleColor: "#F9A8D4",
  },
  summer: {
    accentSeasonal: "#FBBF24",
    particleColor: "#F472B6",
  },
  fall: {
    accentSeasonal: "#D97706",
    particleColor: "#92400E",
  },
  winter: {
    accentSeasonal: "#93C5FD",
    particleColor: "#E2E8F0",
  },
};

export function getThemeCssVars(
  phase: TimePhase,
  season?: Season,
): Record<string, string> {
  const palette = themes[phase];
  const vars: Record<string, string> = {
    "--bg-primary": palette.bgPrimary,
    "--bg-secondary": palette.bgSecondary,
    "--text-primary": palette.textPrimary,
    "--text-secondary": palette.textSecondary,
    "--accent": palette.accent,
  };

  if (season) {
    const seasonal = seasonalAccents[season];
    vars["--accent-seasonal"] = seasonal.accentSeasonal;
    vars["--particle-color"] = seasonal.particleColor;
  }

  return vars;
}
