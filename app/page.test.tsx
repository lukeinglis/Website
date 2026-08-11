import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the name heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Luke Inglis" }),
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Home />);
    const elements = screen.getAllByText(/time-aware personal website/i);
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});
