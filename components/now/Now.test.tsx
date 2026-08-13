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
    expect(screen.getByText(/What I.m up to lately/)).toBeInTheDocument();
  });

  it("renders the last updated date", () => {
    render(<Now />);
    expect(screen.getByText(/Updated 2026-08-13/)).toBeInTheDocument();
  });

  it("renders working on heading and items", () => {
    render(<Now />);
    expect(screen.getByText("Working on")).toBeInTheDocument();
    expect(
      screen.getByText("Inference-time scaling for enterprise LLMs"),
    ).toBeInTheDocument();
    expect(screen.getByText("Red Hat AI")).toBeInTheDocument();
    expect(screen.getByText("lukeinglis.me redesign")).toBeInTheDocument();
    expect(screen.getByText("Side project")).toBeInTheDocument();
  });

  it("hides empty categories", () => {
    render(<Now />);
    expect(screen.queryByText("Reading")).not.toBeInTheDocument();
    expect(screen.queryByText("Watching")).not.toBeInTheDocument();
    expect(screen.queryByText("Cooking")).not.toBeInTheDocument();
  });

  it("has the correct section id", () => {
    render(<Now />);
    const section = document.querySelector("#now");
    expect(section).toBeInTheDocument();
  });
});
