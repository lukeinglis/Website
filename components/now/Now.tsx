"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { RecentActivity } from "@/lib/github";

function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function eventLabel(type: string): string {
  switch (type) {
    case "PushEvent":
      return "pushed";
    case "CreateEvent":
      return "created";
    case "PullRequestEvent":
      return "PR";
    case "IssuesEvent":
      return "issue";
    case "WatchEvent":
      return "starred";
    case "ForkEvent":
      return "forked";
    case "ReleaseEvent":
      return "released";
    default:
      return "active";
  }
}

export function Now() {
  const [activity, setActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="now"
      className="px-6 py-24"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Now
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p
            className="mt-4 text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            What I&apos;ve been working on lately.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <h3
              className="font-mono text-sm font-medium uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Recent activity
            </h3>
            {loading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-48 rounded shimmer"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  />
                ))}
              </div>
            ) : activity.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {activity.map((item) => (
                  <li key={item.repo} className="flex items-baseline gap-3">
                    <a
                      href={`https://github.com/lukeinglis/${item.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-base transition-opacity hover:opacity-70"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.repo}
                    </a>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {eventLabel(item.type)} {formatRelativeTime(item.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="mt-4 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                No recent activity found.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
