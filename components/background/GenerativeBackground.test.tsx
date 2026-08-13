import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GenerativeBackground } from "./GenerativeBackground";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("GenerativeBackground", () => {
  it("renders without crashing", () => {
    render(<GenerativeBackground />);
    expect(document.querySelector("[aria-hidden]")).toBeTruthy();
  });

  it("renders the harbor scene with correct aria label", () => {
    render(<GenerativeBackground />);
    const scene = document.querySelector("[role='img']");
    expect(scene).toBeTruthy();
    expect(scene?.getAttribute("aria-label")).toContain("Boston Harbor");
  });
});
