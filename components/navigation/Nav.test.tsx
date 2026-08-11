import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Nav } from "./Nav";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: false,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Nav", () => {
  it("renders navigation links", () => {
    render(<Nav />);
    expect(screen.getByText("About")).toHaveAttribute("href", "#about");
    expect(screen.getByText("Projects")).toHaveAttribute("href", "#projects");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "#contact");
  });

  it("renders the logo link", () => {
    render(<Nav />);
    expect(screen.getByText("LI")).toHaveAttribute("href", "#hero");
  });

  it("toggles mobile menu", () => {
    render(<Nav />);
    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});
