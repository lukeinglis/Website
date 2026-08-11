import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrollProgress } from "./ScrollProgress";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("ScrollProgress", () => {
  it("renders a progressbar", () => {
    render(<ScrollProgress />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<ScrollProgress />);
    expect(screen.getByLabelText("Page scroll progress")).toBeInTheDocument();
  });
});
