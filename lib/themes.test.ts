import { describe, expect, it } from "vitest";
import { getThemeCssVars, themes } from "./themes";
import type { TimePhase } from "./time";

const ALL_PHASES: TimePhase[] = [
  "dawn",
  "morning",
  "afternoon",
  "evening",
  "night",
];

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

  it("defines a particleColor for every phase", () => {
    for (const phase of ALL_PHASES) {
      expect(themes[phase].particleColor).toBeTruthy();
    }
  });
});

describe("getThemeCssVars", () => {
  it("returns correct CSS variable names", () => {
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

  it("all 5 phases produce valid CSS values", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const phase of ALL_PHASES) {
      const vars = getThemeCssVars(phase);
      for (const [key, value] of Object.entries(vars)) {
        expect(value, `${phase} ${key}`).toMatch(hexRegex);
      }
    }
  });
});
