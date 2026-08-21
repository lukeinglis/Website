"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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

const galleryPhotos = [
  { src: "/images/gallery/photo-4.jpg", alt: "At the coast" },
  { src: "/images/gallery/photo-2.jpg", alt: "At an IBM event" },
  { src: "/images/gallery/photo-3.jpg", alt: "Our dalmatian in the snow" },
  { src: "/images/gallery/photo-1.jpg", alt: "With my partner in Chicago" },
  { src: "/images/gallery/photo-5.jpg", alt: "Family at an Orioles game" },
  { src: "/images/gallery/photo-6.jpg", alt: "On the field at Auburn" },
  { src: "/images/gallery/photo-7.jpg", alt: "Our dalmatian on a walk" },
  { src: "/images/gallery/photo-8.jpg", alt: "Our dalmatian on the couch" },
];

export function About() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

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

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[240px_1fr]">
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/headshot.png"
                alt="Luke Inglis"
                width={240}
                height={240}
                className="rounded-2xl"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
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
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
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

        <ScrollReveal delay={0.35}>
          <div className="mt-16 -mx-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-6" style={{ width: "max-content" }}>
              {galleryPhotos.map((photo) => (
                <button
                  key={photo.src}
                  className="relative h-64 w-80 flex-shrink-0 overflow-hidden rounded-xl cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => setLightbox(photo.src)}
                  type="button"
                  aria-label="Expand photo"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="320px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded photo"
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer transition-opacity hover:opacity-70"
            onClick={closeLightbox}
            type="button"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={lightbox}
              alt=""
              width={1200}
              height={900}
              style={{ objectFit: "contain", maxHeight: "90vh", width: "auto" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
