import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Now } from "./Now";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Now", () => {
  it("renders the Now heading", () => {
    render(<Now />);
    expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Now />);
    expect(
      screen.getByText(/What I've been working on lately/),
    ).toBeInTheDocument();
  });

  it("renders the recent activity heading", () => {
    render(<Now />);
    expect(screen.getByText("Recent activity")).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    render(<Now />);
    const section = document.querySelector("#now");
    expect(section).toBeInTheDocument();
  });
});
