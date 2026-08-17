"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import nowData from "@/content/now.json";

interface WorkItem {
  title: string;
  context: string;
}

interface ReadingItem {
  title: string;
  author: string;
}

interface WatchingItem {
  title: string;
  season: string;
  service: string;
}

interface CookingItem {
  title: string;
  source: string;
}

interface NowData {
  lastUpdated: string;
  working: WorkItem[];
  reading: ReadingItem[];
  watching: WatchingItem[];
  cooking: CookingItem[];
}

const data: NowData = nowData;

function SubsectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-mono text-sm font-medium uppercase tracking-wider"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </h3>
  );
}

export function Now() {
  const hasWorking = data.working.length > 0;
  const hasReading = data.reading.length > 0;
  const hasWatching = data.watching.length > 0;
  const hasCooking = data.cooking.length > 0;

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
          <p className="mt-4 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            What I&apos;m up to lately.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-2 font-mono text-sm" style={{ color: "var(--border)" }}>
            Updated {data.lastUpdated}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {hasWorking && (
              <div>
                <SubsectionHeading>Working on</SubsectionHeading>
                <ul className="mt-3 space-y-2">
                  {data.working.map((item) => (
                    <li key={item.title}>
                      <span
                        className="font-sans text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="ml-2 font-mono text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.context}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasReading && (
              <div>
                <SubsectionHeading>Reading</SubsectionHeading>
                <ul className="mt-3 space-y-2">
                  {data.reading.map((item) => (
                    <li key={item.title}>
                      <span
                        className="font-sans text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="ml-2 font-mono text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.author}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasWatching && (
              <div>
                <SubsectionHeading>Watching</SubsectionHeading>
                <ul className="mt-3 space-y-2">
                  {data.watching.map((item) => (
                    <li key={item.title}>
                      <span
                        className="font-sans text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="ml-2 font-mono text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.season} &middot; {item.service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasCooking && (
              <div>
                <SubsectionHeading>Cooking</SubsectionHeading>
                <ul className="mt-3 space-y-2">
                  {data.cooking.map((item) => (
                    <li key={item.title}>
                      <span
                        className="font-sans text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="ml-2 font-mono text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.source}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
