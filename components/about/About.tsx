"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const timeline = [
  {
    label: "Auburn University",
    detail: "Sports Information & Media Relations",
  },
  {
    label: "IBM Research",
    detail: "7 years · MIT-IBM Watson AI Lab",
  },
  {
    label: "Red Hat AI",
    detail: "2025 · AI Innovation Team",
  },
];

const workAreas = [
  "Inference-Time Scaling",
  "Model Customization",
  "Cross-team Strategy & Operations",
  "Partnership Development",
  "Program Leadership",
  "Stakeholder Alignment",
];

export function About() {
  return (
    <section
      id="about"
      className="px-6 py-24"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            About
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <div
              className="space-y-6 text-base leading-7 sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                I&apos;m a Technical Product Manager at Red Hat AI, working with
                the{" "}
                <a
                  href="https://ai-innovation.team/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  AI Innovation Team
                </a>{" "}
                to translate emerging research into practical product
                capabilities. My focus is bringing inference-time scaling,
                advanced model customization, and post-training techniques into
                enterprise AI platforms, helping organizations get more value
                from AI without starting from scratch.
              </p>
              <p>
                Before Red Hat, I spent seven years at{" "}
                <a
                  href="https://research.ibm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  IBM Research
                </a>
                , supporting AI research organizations and large-scale
                partnerships, including the{" "}
                <a
                  href="https://mitibm.mit.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  MIT-IBM Watson AI Lab
                </a>
                . I spent most of that time connecting research, product
                strategy, and customer needs to accelerate the path from ideas
                to real-world impact.
              </p>
              <p>
                Outside of work I&apos;m usually putting together side projects.
                I&apos;m currently working on{" "}
                <a
                  href="https://reelpalate.lukeinglis.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  Reel Palate
                </a>{" "}
                and a handful of other{" "}
                <a
                  href="https://github.com/lukeinglis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  side projects
                </a>
                . I studied at Auburn, where I worked in sports information and
                media relations, and I&apos;m still a big sports fan (Auburn,
                Orioles, Chelsea, Timberwolves).
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-10">
            <ScrollReveal delay={0.2}>
              <div>
                <h3
                  className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  The path
                </h3>
                <ol className="mt-4 space-y-4" aria-label="Career timeline">
                  {timeline.map((step, i) => (
                    <li key={step.label} className="relative flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className="mt-1.5 h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: "var(--accent)" }}
                          aria-hidden="true"
                        />
                        {i < timeline.length - 1 && (
                          <span
                            className="mt-1 w-px flex-1"
                            style={{ backgroundColor: "var(--border)" }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="pb-2">
                        <p
                          className="text-sm font-medium font-sans"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {step.label}
                        </p>
                        {step.detail && (
                          <p
                            className="mt-0.5 font-mono text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <h3
                  className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  What I work on
                </h3>
                <ul className="mt-4 space-y-2">
                  {workAreas.map((area) => (
                    <li
                      key={area}
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
