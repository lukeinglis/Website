import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrollProgress } from "./ScrollProgress";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

describe("ScrollProgress with reduced motion", () => {
  it("renders nothing when reduced motion is on", () => {
    render(<ScrollProgress />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
