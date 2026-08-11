"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const skills = [
  { category: "Languages", items: ["TypeScript", "Python", "Go", "Rust"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL"] },
  {
    category: "Infrastructure",
    items: ["AWS", "Vercel", "Docker", "Kubernetes"],
  },
  { category: "Tools", items: ["Git", "GitHub Actions", "Terraform"] },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            About
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div
            className="mt-6 space-y-4 text-base leading-7 sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              I&apos;m a software engineer who builds tools and systems that
              make complex work simpler. With experience spanning full-stack
              development, cloud infrastructure, and developer tooling, I focus
              on shipping software that&apos;s reliable, maintainable, and
              genuinely useful.
            </p>
            <p>
              I care about the craft of engineering — clean APIs, thoughtful
              abstractions, and systems that are easy to reason about. I believe
              the best code is the code you don&apos;t have to think twice
              about.
            </p>
            <p>
              When I&apos;m not writing code, you&apos;ll find me exploring new
              technologies, contributing to open source, and thinking about how
              to make developer experiences better.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <ScrollReveal>
            <h3
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              What I Work With
            </h3>
          </ScrollReveal>
          <ScrollReveal stagger delay={0.1}>
            <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category}>
                  <dt
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    {group.category}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md px-2.5 py-1 text-sm"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
