import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

const mockSetMode = vi.fn();

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,

    mode: "auto" as const,
    setMode: mockSetMode,
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("ThemeToggle", () => {
  it("renders all phase options", () => {
    render(<ThemeToggle />);
    const select = screen.getByLabelText("Select theme");
    const options = select.querySelectorAll("option");
    const values = Array.from(options).map((o) => o.value);
    expect(values).toEqual([
      "auto",
      "dawn",
      "morning",
      "afternoon",
      "evening",
      "night",
    ]);
  });

  it("calls setMode when an option is selected", () => {
    render(<ThemeToggle />);
    const select = screen.getByLabelText("Select theme");
    fireEvent.change(select, { target: { value: "evening" } });
    expect(mockSetMode).toHaveBeenCalledWith("evening");
  });

  it("shows current mode as selected value", () => {
    render(<ThemeToggle />);
    const select = screen.getByLabelText("Select theme") as HTMLSelectElement;
    expect(select.value).toBe("auto");
  });
});
