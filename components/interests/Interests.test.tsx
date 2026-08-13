import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Interests } from "./Interests";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Interests", () => {
  it("renders the Interests heading", () => {
    render(<Interests />);
    expect(
      screen.getByRole("heading", { name: "Interests" }),
    ).toBeInTheDocument();
  });

  it("renders all team names", () => {
    render(<Interests />);
    expect(screen.getByText("Auburn Tigers")).toBeInTheDocument();
    expect(screen.getByText("Baltimore Orioles")).toBeInTheDocument();
    expect(screen.getByText("Chelsea FC")).toBeInTheDocument();
    expect(screen.getByText("Minnesota Timberwolves")).toBeInTheDocument();
  });

  it("renders league labels", () => {
    render(<Interests />);
    expect(screen.getByText("College Football")).toBeInTheDocument();
    expect(screen.getByText("MLB")).toBeInTheDocument();
    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("NBA")).toBeInTheDocument();
  });

  it("renders subtitle about Auburn", () => {
    render(<Interests />);
    expect(
      screen.getByText(
        "Sports have been part of my life since working in media relations at Auburn.",
      ),
    ).toBeInTheDocument();
  });
});
