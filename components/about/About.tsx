"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const skills = [
  {
    category: "Focus Areas",
    items: [
      "Inference-Time Scaling",
      "Post-Training Techniques",
      "Model Customization",
      "Continual Learning",
    ],
  },
  {
    category: "Domains",
    items: ["Enterprise AI", "LLM Optimization", "AI Product Strategy"],
  },
  {
    category: "Background",
    items: ["IBM Research", "MIT-IBM Watson AI Lab", "Red Hat AI"],
  },
  {
    category: "Tools",
    items: ["Python", "TypeScript", "Git", "GitHub Actions"],
  },
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
              I&apos;m a Technical Product Manager at Red Hat AI, working with
              the AI Innovation Team to translate emerging research into
              practical product capabilities. My focus is bringing
              inference-time scaling and post-training techniques into
              enterprise AI platforms.
            </p>
            <p>
              Before joining Red Hat in 2025, I spent nearly seven years at IBM
              Research, supporting AI research organizations and large-scale
              partnerships, including the MIT-IBM Watson AI Lab. In those roles,
              I connected research, product strategy, operations, and customer
              needs to accelerate the path from promising ideas to real-world
              impact.
            </p>
            <p>
              I&apos;m especially interested in how enterprises can improve the
              reliability, adaptability, and cost-effectiveness of their AI
              systems. My current work explores how to get more value from
              smaller, fit-for-purpose models through inference-time scaling,
              continual learning, and flexible approaches to model
              customization. I studied at Auburn University.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <ScrollReveal>
            <h3
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              What I Focus On
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
