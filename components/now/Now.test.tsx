import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/github", () => ({
  fetchRecentActivity: vi.fn().mockResolvedValue([
    { repo: "Website", type: "PushEvent", timestamp: "2026-08-20T12:00:00Z" },
  ]),
}));

describe("Now", () => {
  it("renders the Now heading", async () => {
    const { Now } = await import("./Now");
    const NowResolved = await Now();
    render(NowResolved);
    expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
  });

  it("renders the recent activity heading", async () => {
    const { Now } = await import("./Now");
    const NowResolved = await Now();
    render(NowResolved);
    expect(screen.getByText("Recent activity")).toBeInTheDocument();
  });

  it("has the correct section id", async () => {
    const { Now } = await import("./Now");
    const NowResolved = await Now();
    render(NowResolved);
    const section = document.querySelector("#now");
    expect(section).toBeInTheDocument();
  });
});
