import { describe, expect, it, vi, beforeEach } from "vitest";
import { fetchGitHubRepos, languageColors } from "./github";

const mockRepos = [
  {
    name: "repo-a",
    description: "First repo",
    language: "TypeScript",
    stargazers_count: 10,
    html_url: "https://github.com/lukeinglis/repo-a",
    updated_at: "2026-08-01T00:00:00Z",
    fork: false,
    archived: false,
  },
  {
    name: "repo-b",
    description: null,
    language: "Python",
    stargazers_count: 5,
    html_url: "https://github.com/lukeinglis/repo-b",
    updated_at: "2026-07-01T00:00:00Z",
    fork: false,
    archived: false,
  },
  {
    name: "forked-repo",
    description: "A fork",
    language: "JavaScript",
    stargazers_count: 100,
    html_url: "https://github.com/lukeinglis/forked-repo",
    updated_at: "2026-06-01T00:00:00Z",
    fork: true,
    archived: false,
  },
  {
    name: "archived-repo",
    description: "Archived",
    language: "Go",
    stargazers_count: 20,
    html_url: "https://github.com/lukeinglis/archived-repo",
    updated_at: "2025-01-01T00:00:00Z",
    fork: false,
    archived: true,
  },
];

describe("fetchGitHubRepos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and transforms repos", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      }),
    );

    const repos = await fetchGitHubRepos();
    expect(repos).toHaveLength(2);
    expect(repos[0].name).toBe("repo-a");
    expect(repos[0].stars).toBe(10);
    expect(repos[1].name).toBe("repo-b");
  });

  it("filters out forks and archived repos", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      }),
    );

    const repos = await fetchGitHubRepos();
    const names = repos.map((r) => r.name);
    expect(names).not.toContain("forked-repo");
    expect(names).not.toContain("archived-repo");
  });

  it("sorts by star count descending", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      }),
    );

    const repos = await fetchGitHubRepos();
    expect(repos[0].stars).toBeGreaterThanOrEqual(repos[1].stars);
  });

  it("throws on API error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
      }),
    );

    await expect(fetchGitHubRepos()).rejects.toThrow("GitHub API error: 403");
  });

  it("sends auth header when GITHUB_TOKEN is set", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
    vi.stubGlobal("fetch", mockFetch);

    const originalToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = "test-token";

    await fetchGitHubRepos();

    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers.Authorization).toBe("Bearer test-token");

    if (originalToken === undefined) {
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });
});

describe("languageColors", () => {
  it("has colors for common languages", () => {
    expect(languageColors.TypeScript).toBe("#3178c6");
    expect(languageColors.Python).toBe("#3572A5");
    expect(languageColors.Go).toBe("#00ADD8");
  });
});
