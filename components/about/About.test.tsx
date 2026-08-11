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
    expect(screen.getByText("Focus Areas")).toBeInTheDocument();
    expect(screen.getByText("Domains")).toBeInTheDocument();
    expect(screen.getByText("Background")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders skill items", () => {
    render(<About />);
    expect(screen.getByText("Inference-Time Scaling")).toBeInTheDocument();
    expect(screen.getByText("Enterprise AI")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });
});
