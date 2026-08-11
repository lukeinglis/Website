import type { GitHubRepo } from "@/lib/github";
import { languageColors } from "@/lib/github";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language
    ? (languageColors[repo.language] ?? "var(--text-secondary)")
    : null;

  return (
    <article
      className="flex flex-col rounded-xl border p-6 transition-shadow duration-200 hover:shadow-lg"
      style={{
        borderColor:
          "color-mix(in srgb, var(--text-secondary) 20%, transparent)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {repo.name}
        </a>
      </h3>
      {repo.description && (
        <p
          className="mt-2 flex-1 text-sm leading-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {repo.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-4 text-xs">
        {langColor && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            <span style={{ color: "var(--text-secondary)" }}>
              {repo.language}
            </span>
          </span>
        )}
        {repo.stars > 0 && (
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
            {repo.stars}
          </span>
        )}
        <span style={{ color: "var(--text-secondary)" }}>
          Updated {formatDate(repo.updatedAt)}
        </span>
      </div>
    </article>
  );
}
