"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const timeline = [
  {
    label: "Auburn University",
    detail: "Sports Information / Media Relations",
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
  "Post-Training Techniques",
  "Model Customization",
  "Continual Learning",
  "Enterprise AI",
  "Cost-Effective AI Systems",
];

export function About() {
  return (
    <section
      id="about"
      className="px-6 py-24"
      style={{ backgroundColor: "#2E3440" }}
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
                Most TPMs live in the gap between engineering and business. I
                live in a different gap: between what researchers prove is
                possible and what products actually ship.
              </p>
              <p>
                At Red Hat, I work with the AI Innovation Team to bring
                techniques like inference-time scaling and model customization
                into products that enterprises rely on.
              </p>
              <p>
                I also build things. This site, the projects below, the tools I
                use to test ideas &mdash; if I can&apos;t prototype it, I
                don&apos;t fully understand it yet.
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
                            style={{ backgroundColor: "#4C566A" }}
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
                      style={{ color: "#D8DEE9" }}
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
