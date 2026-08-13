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

  it("renders subsection headings", () => {
    render(<Now />);
    expect(screen.getByText("Working on")).toBeInTheDocument();
    expect(screen.getByText("Reading")).toBeInTheDocument();
    expect(screen.getByText("Watching")).toBeInTheDocument();
    expect(screen.getByText("Cooking")).toBeInTheDocument();
  });

  it("renders working items with context", () => {
    render(<Now />);
    expect(
      screen.getByText("Inference-time scaling for enterprise LLMs"),
    ).toBeInTheDocument();
    expect(screen.getByText("Red Hat AI")).toBeInTheDocument();
  });

  it("renders reading items with author", () => {
    render(<Now />);
    expect(screen.getByText("Thinking, Fast and Slow")).toBeInTheDocument();
    expect(screen.getByText("Daniel Kahneman")).toBeInTheDocument();
  });

  it("renders watching items with season and service", () => {
    render(<Now />);
    expect(screen.getByText("Severance")).toBeInTheDocument();
  });

  it("renders cooking items with source", () => {
    render(<Now />);
    expect(
      screen.getByText("Braised short ribs over Parmesan polenta"),
    ).toBeInTheDocument();
    expect(screen.getByText("NYT Cooking")).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    render(<Now />);
    const section = document.querySelector("#now");
    expect(section).toBeInTheDocument();
  });
});
