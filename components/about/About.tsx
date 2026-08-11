"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const skills = [
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript"] },
  {
    category: "AI/ML",
    items: [
      "LLM Optimization",
      "Inference Scaling",
      "KV Cache Quantization",
      "Reinforcement Learning",
    ],
  },
  {
    category: "Frameworks",
    items: ["PyTorch", "Synthetic Data Generation", "Agentic Systems"],
  },
  {
    category: "Infrastructure",
    items: ["Red Hat OpenShift", "Kubernetes", "Open Source AI"],
  },
  {
    category: "Tools",
    items: ["Git", "Obsidian", "Claude Code", "GitHub Actions"],
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
              I&apos;m an AI research engineer on Red Hat&apos;s AI Innovation
              team, based in Boston, MA. My work focuses on making large
              language models faster and more efficient — from KV cache
              quantization and inference-time scaling to reinforcement learning
              and synthetic data generation.
            </p>
            <p>
              I spend most of my time at the intersection of research and
              engineering: building tools and libraries that turn optimization
              techniques into practical, deployable improvements. Whether
              it&apos;s experimenting with attention block optimization or
              building infrastructure for synthetic data pipelines, I care about
              work that moves from paper to production.
            </p>
            <p>
              I&apos;m an active contributor to open-source AI projects and a
              believer in open development as the best way to push the field
              forward. I studied at Auburn University and collaborate with a
              great team of researchers at Red Hat pushing the boundaries of
              what open-source AI can do.
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
