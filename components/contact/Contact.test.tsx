import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

describe("Contact", () => {
  it("renders the heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: "Say hello" }),
    ).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", {
      name: "lukerichardinglis@gmail.com",
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:lukerichardinglis@gmail.com",
    );
  });

  it("renders social links", () => {
    render(<Contact />);
    expect(screen.getByLabelText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/lukeinglis",
    );
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/luke-inglis/",
    );
  });
});
