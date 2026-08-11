import type { GitHubRepo } from "@/lib/github";
import { fetchGitHubRepos } from "@/lib/github";
import fallbackProjects from "@/content/projects.json";
import { ProjectCard } from "./ProjectCard";

async function getProjects(): Promise<GitHubRepo[]> {
  try {
    return await fetchGitHubRepos();
  } catch {
    return fallbackProjects.map((p) => ({
      name: p.name,
      description: p.description,
      language: p.language,
      stars: p.stars,
      url: p.url,
      updatedAt: p.updatedAt,
    }));
  }
}

export async function ProjectGrid() {
  const repos = await getProjects();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Projects
        </h2>
        <p
          className="mt-4 text-base sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Open source work and recent projects, pulled live from GitHub.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}
