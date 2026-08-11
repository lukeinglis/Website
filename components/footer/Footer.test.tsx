import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/lukeinglis",
    );
    expect(screen.getByText("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/lukeinglis",
    );
  });
});
