import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockReturnValue({ matches: false }),
});

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Home", () => {
  it("renders the name heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Luke Inglis" }),
    ).toBeInTheDocument();
  });

  it("renders a time-based greeting", () => {
    render(<Home />);
    expect(screen.getByText("Good morning")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Home />);
    const elements = screen.getAllByText(/time-aware personal website/i);
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders theme toggle", () => {
    render(<Home />);
    expect(screen.getByLabelText("Select theme")).toBeInTheDocument();
  });

  it("renders motion toggle", () => {
    render(<Home />);
    expect(
      screen.getByRole("switch", { name: /reduce motion/i }),
    ).toBeInTheDocument();
  });
});
