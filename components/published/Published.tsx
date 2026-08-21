"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import data from "@/content/published.json";

interface PublishedItem {
  title: string;
  publication: string;
  url: string;
}

function ItemList({ items }: { items: PublishedItem[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base transition-opacity hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
          >
            {item.title}
          </a>
          <span
            className="ml-2 font-mono text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.publication}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Published() {
  return (
    <section
      id="published"
      className="px-6 py-24"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Published Works
          </h2>
        </ScrollReveal>

        <div className="mt-10 space-y-10">
          <ScrollReveal delay={0.1}>
            <div>
              <h3
                className="font-mono text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                Blog
              </h3>
              <ItemList items={data.blogs} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h3
                className="font-mono text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                Papers
              </h3>
              <ItemList items={data.papers} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div>
              <h3
                className="font-mono text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                In the press
              </h3>
              <ItemList items={data.articles} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
