import { Suspense } from "react";
import type { GitHubRepo } from "@/lib/github";
import { fetchGitHubRepos } from "@/lib/github";
import fallbackProjects from "@/content/projects.json";
import { ProjectCard } from "./ProjectCard";
import { ProjectGridSkeleton } from "@/components/ui/ProjectCardSkeleton";
import { ProjectGridClient } from "./ProjectGridClient";

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

async function ProjectList() {
  const repos = await getProjects();

  return (
    <ProjectGridClient>
      {repos.map((repo, index) => (
        <ProjectCard key={repo.name} repo={repo} featured={index === 0} />
      ))}
    </ProjectGridClient>
  );
}

export async function ProjectGrid() {
  return (
    <section
      id="projects"
      className="px-6 py-24"
      style={{ backgroundColor: "#2E3440" }}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Projects
        </h2>
        <p
          className="mt-4 text-base sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Things I&apos;ve built or am building.
        </p>
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectList />
        </Suspense>
      </div>
    </section>
  );
}
