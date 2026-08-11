import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("renders the heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: "Get in Touch" }),
    ).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", {
      name: "hello@lukeinglis.me",
    });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@lukeinglis.me");
  });

  it("renders social links", () => {
    render(<Contact />);
    expect(screen.getByLabelText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/lukeinglis",
    );
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/lukeinglis",
    );
  });
});
