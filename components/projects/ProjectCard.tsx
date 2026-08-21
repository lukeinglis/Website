"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/github";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getMotionTransition } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { phase, reducedMotion } = useTimeTheme();
  const transition = getMotionTransition(phase);

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
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
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
