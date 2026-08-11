import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Hero } from "./Hero";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Hero", () => {
  it("renders the name", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: "Luke Inglis" }),
    ).toBeInTheDocument();
  });

  it("renders a time-based greeting", () => {
    render(<Hero />);
    expect(screen.getByText("Good morning")).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<Hero />);
    expect(screen.getByText("View Projects")).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByText("Get in Touch")).toHaveAttribute(
      "href",
      "#contact",
    );
  });
});
