"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/github";
import { languageColors } from "@/lib/github";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getMotionTransition } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { phase, reducedMotion } = useTimeTheme();
  const transition = getMotionTransition(phase);
  const langColor = project.language
    ? (languageColors[project.language] ?? "var(--text-secondary)")
    : null;

  const title = project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {project.name}
    </a>
  ) : (
    project.name
  );

  const card = (
    <article
      className="flex flex-col rounded-xl border p-6 transition-all duration-200 hover:brightness-110"
      style={{
        borderColor: "#4C566A",
        backgroundColor: "#3B4252",
      }}
    >
      <h4
        className="font-serif text-lg font-semibold"
        style={{ color: "var(--accent)" }}
      >
        {title}
      </h4>
      {project.description && (
        <p
          className="mt-2 flex-1 text-sm leading-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-4 font-mono text-xs">
        {langColor && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            <span style={{ color: "var(--text-secondary)" }}>
              {project.language}
            </span>
          </span>
        )}
        {project.stars > 0 && (
          <span
            className="flex items-center gap-1"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {project.stars}
          </span>
        )}
      </div>
    </article>
  );

  if (reducedMotion) return card;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 40px color-mix(in srgb, var(--accent) 15%, transparent)",
      }}
      transition={transition}
    >
      {card}
    </motion.div>
  );
}
