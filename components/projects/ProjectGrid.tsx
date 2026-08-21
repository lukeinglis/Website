import type { ProjectCategory } from "@/lib/github";
import projectsData from "@/content/projects.json";
import { ProjectCard } from "./ProjectCard";
import { ProjectGridClient } from "./ProjectGridClient";

const categories: ProjectCategory[] = projectsData.categories;

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="px-6 py-24"
      style={{ backgroundColor: "var(--bg-primary)" }}
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
        {categories.map((category, idx) => (
          <div key={category.name} className={idx === 0 ? "mt-10" : "mt-12"}>
            <h3
              className="font-mono text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              {category.name}
            </h3>
            <ProjectGridClient>
              {category.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </ProjectGridClient>
            {category.name === "Personal" && (
              <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                See more on{" "}
                <a
                  href="https://github.com/lukeinglis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  GitHub
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
