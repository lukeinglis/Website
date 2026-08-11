import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionToggle } from "./MotionToggle";

const mockSetReducedMotion = vi.fn();

let mockReducedMotion = false;

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    season: "summer" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: mockReducedMotion,
    setReducedMotion: mockSetReducedMotion,
  }),
}));

describe("MotionToggle", () => {
  it("renders with switch role", () => {
    render(<MotionToggle />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("shows aria-checked=false when motion is not reduced", () => {
    mockReducedMotion = false;
    render(<MotionToggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("shows aria-checked=true when motion is reduced", () => {
    mockReducedMotion = true;
    render(<MotionToggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("calls setReducedMotion with toggled value on click", () => {
    mockReducedMotion = false;
    render(<MotionToggle />);
    fireEvent.click(screen.getByRole("switch"));
    expect(mockSetReducedMotion).toHaveBeenCalledWith(true);
  });

  it("renders the label text", () => {
    render(<MotionToggle />);
    expect(screen.getByText("Reduce motion")).toBeInTheDocument();
  });
});
