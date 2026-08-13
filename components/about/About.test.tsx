import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { About } from "./About";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

describe("About", () => {
  it("renders the About heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("renders the timeline and work areas sections", () => {
    render(<About />);
    expect(screen.getByText("The path")).toBeInTheDocument();
    expect(screen.getByText("What I work on")).toBeInTheDocument();
  });

  it("renders timeline entries with details", () => {
    render(<About />);
    expect(screen.getByText("Auburn University")).toBeInTheDocument();
    expect(
      screen.getByText("Sports Information & Media Relations"),
    ).toBeInTheDocument();
    expect(screen.getByText("IBM Research")).toBeInTheDocument();
    expect(screen.getByText("Red Hat AI")).toBeInTheDocument();
  });

  it("renders work area items", () => {
    render(<About />);
    expect(screen.getByText("Inference-Time Scaling")).toBeInTheDocument();
    expect(screen.getByText("Post-Training Techniques")).toBeInTheDocument();
    expect(screen.getByText("Enterprise AI")).toBeInTheDocument();
    expect(screen.getByText("Cost-Effective AI Systems")).toBeInTheDocument();
  });
});
