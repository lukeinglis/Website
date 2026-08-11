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

  it("renders skills categories", () => {
    render(<About />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("AI/ML")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders skill items", () => {
    render(<About />);
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("LLM Optimization")).toBeInTheDocument();
    expect(screen.getByText("PyTorch")).toBeInTheDocument();
  });
});
