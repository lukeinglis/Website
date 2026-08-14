import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectCard } from "./ProjectCard";

vi.mock("@/app/providers/TimeThemeProvider", () => ({
  useTimeTheme: () => ({
    phase: "morning" as const,
    mode: "auto" as const,
    setMode: vi.fn(),
    reducedMotion: true,
    setReducedMotion: vi.fn(),
  }),
}));

const mockProject = {
  name: "test-repo",
  description: "A test repository",
  language: "TypeScript",
  stars: 42,
  url: "https://github.com/user/test-repo",
};

describe("ProjectCard", () => {
  it("renders project name as a link when url is provided", () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole("link", { name: "test-repo" });
    expect(link).toHaveAttribute("href", "https://github.com/user/test-repo");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders project name as plain text when url is null", () => {
    render(<ProjectCard project={{ ...mockProject, url: null }} />);
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "test-repo" })).not.toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("A test repository")).toBeInTheDocument();
  });

  it("renders language with color dot", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders star count", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("hides star count when zero", () => {
    render(<ProjectCard project={{ ...mockProject, stars: 0 }} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("hides description when empty string", () => {
    render(<ProjectCard project={{ ...mockProject, description: "" }} />);
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.queryByText("A test repository")).not.toBeInTheDocument();
  });
});
