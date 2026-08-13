import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("@/components/navigation/Nav", () => ({
  Nav: () => <nav data-testid="nav">Nav</nav>,
}));

vi.mock("@/components/hero/Hero", () => ({
  Hero: () => <section data-testid="hero">Hero</section>,
}));

vi.mock("@/components/about/About", () => ({
  About: () => <section data-testid="about">About</section>,
}));

vi.mock("@/components/projects/ProjectGrid", () => ({
  ProjectGrid: () => <section data-testid="projects">ProjectGrid</section>,
}));

vi.mock("@/components/interests/Interests", () => ({
  Interests: () => <section data-testid="interests">Interests</section>,
}));

vi.mock("@/components/contact/Contact", () => ({
  Contact: () => <section data-testid="contact">Contact</section>,
}));

vi.mock("@/components/footer/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/components/background/GenerativeBackground", () => ({
  GenerativeBackground: () => <div data-testid="background">Background</div>,
}));

describe("Home", () => {
  it("renders all sections in order", () => {
    render(<Home />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("projects")).toBeInTheDocument();
    expect(screen.getByTestId("interests")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders JSON-LD structured data", () => {
    render(<Home />);
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Luke Inglis");
  });

  it("has a main element wrapping content sections", () => {
    render(<Home />);
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});
