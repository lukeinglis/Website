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

const mockRepo = {
  name: "test-repo",
  description: "A test repository",
  language: "TypeScript",
  stars: 42,
  url: "https://github.com/user/test-repo",
  updatedAt: "2026-08-01T00:00:00Z",
};

describe("ProjectCard", () => {
  it("renders repo name as a link", () => {
    render(<ProjectCard repo={mockRepo} />);
    const link = screen.getByRole("link", { name: "test-repo" });
    expect(link).toHaveAttribute("href", "https://github.com/user/test-repo");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders description", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("A test repository")).toBeInTheDocument();
  });

  it("renders language with color dot", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders star count", () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("hides star count when zero", () => {
    render(<ProjectCard repo={{ ...mockRepo, stars: 0 }} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("handles missing description", () => {
    render(<ProjectCard repo={{ ...mockRepo, description: null }} />);
    expect(screen.getByRole("link", { name: "test-repo" })).toBeInTheDocument();
  });
});
