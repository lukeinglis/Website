import { describe, expect, it } from "vitest";
import { getThemeCssVars, seasonalAccents, themes } from "./themes";
import type { Season, TimePhase } from "./time";

const ALL_PHASES: TimePhase[] = [
  "dawn",
  "morning",
  "afternoon",
  "evening",
  "night",
];

const ALL_SEASONS: Season[] = ["spring", "summer", "fall", "winter"];

describe("themes", () => {
  it("defines a palette for every phase", () => {
    for (const phase of ALL_PHASES) {
      expect(themes[phase]).toBeDefined();
      expect(themes[phase].bgPrimary).toBeTruthy();
      expect(themes[phase].bgSecondary).toBeTruthy();
      expect(themes[phase].textPrimary).toBeTruthy();
      expect(themes[phase].textSecondary).toBeTruthy();
      expect(themes[phase].accent).toBeTruthy();
    }
  });

  it("all color values are valid hex codes", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const phase of ALL_PHASES) {
      const palette = themes[phase];
      for (const val of Object.values(palette)) {
        expect(val).toMatch(hexRegex);
      }
    }
  });
});

describe("seasonalAccents", () => {
  it("defines accents for every season", () => {
    for (const season of ALL_SEASONS) {
      expect(seasonalAccents[season]).toBeDefined();
      expect(seasonalAccents[season].accentSeasonal).toBeTruthy();
      expect(seasonalAccents[season].particleColor).toBeTruthy();
    }
  });

  it("all seasonal color values are valid hex codes", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const season of ALL_SEASONS) {
      const accent = seasonalAccents[season];
      expect(accent.accentSeasonal).toMatch(hexRegex);
      expect(accent.particleColor).toMatch(hexRegex);
    }
  });
});

describe("getThemeCssVars", () => {
  it("returns correct CSS variable names without season", () => {
    const vars = getThemeCssVars("morning");
    expect(vars).toHaveProperty("--bg-primary");
    expect(vars).toHaveProperty("--bg-secondary");
    expect(vars).toHaveProperty("--text-primary");
    expect(vars).toHaveProperty("--text-secondary");
    expect(vars).toHaveProperty("--accent");
    expect(vars).not.toHaveProperty("--accent-seasonal");
    expect(vars).not.toHaveProperty("--particle-color");
  });

  it("returns values matching the palette for each phase", () => {
    for (const phase of ALL_PHASES) {
      const vars = getThemeCssVars(phase);
      expect(vars["--bg-primary"]).toBe(themes[phase].bgPrimary);
      expect(vars["--accent"]).toBe(themes[phase].accent);
    }
  });

  it("includes seasonal vars when season is provided", () => {
    const vars = getThemeCssVars("morning", "spring");
    expect(vars["--accent-seasonal"]).toBe(
      seasonalAccents.spring.accentSeasonal,
    );
    expect(vars["--particle-color"]).toBe(seasonalAccents.spring.particleColor);
  });

  it("all 20 phase×season combos produce valid CSS values", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const phase of ALL_PHASES) {
      for (const season of ALL_SEASONS) {
        const vars = getThemeCssVars(phase, season);
        for (const [key, value] of Object.entries(vars)) {
          expect(value, `${phase}/${season} ${key}`).toMatch(hexRegex);
        }
      }
    }
  });
});
