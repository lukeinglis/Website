import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GenerativeBackground } from "./GenerativeBackground";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    season: "spring" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const MockScene = () => <div data-testid="background-scene">3D Scene</div>;
    MockScene.displayName = "MockScene";
    return MockScene;
  },
}));

describe("GenerativeBackground", () => {
  it("renders without crashing", () => {
    render(<GenerativeBackground />);
    expect(document.querySelector("[aria-hidden]")).toBeTruthy();
  });

  it("renders CSS fallback when WebGL is unavailable", () => {
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === "canvas") {
        (el as HTMLCanvasElement).getContext = () => null;
      }
      return el;
    });

    render(<GenerativeBackground />);
    const fallback = document.querySelector("[aria-hidden='true']");
    expect(fallback).toBeTruthy();

    vi.restoreAllMocks();
  });
});
