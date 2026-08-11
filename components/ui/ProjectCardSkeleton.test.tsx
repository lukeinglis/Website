import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ProjectCardSkeleton,
  ProjectGridSkeleton,
} from "./ProjectCardSkeleton";

describe("ProjectCardSkeleton", () => {
  it("renders shimmer elements", () => {
    const { container } = render(<ProjectCardSkeleton />);
    const shimmers = container.querySelectorAll(".shimmer");
    expect(shimmers.length).toBeGreaterThan(0);
  });
});

describe("ProjectGridSkeleton", () => {
  it("renders 6 skeleton cards", () => {
    const { container } = render(<ProjectGridSkeleton />);
    const shimmers = container.querySelectorAll(".shimmer");
    expect(shimmers.length).toBe(30);
  });
});
