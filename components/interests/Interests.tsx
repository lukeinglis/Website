"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const teams = [
  { name: "Auburn Tigers", league: "College Football", accent: "#DD550C" },
  { name: "Baltimore Orioles", league: "MLB", accent: "#DF4601" },
  { name: "Chelsea FC", league: "Premier League", accent: "#034694" },
  { name: "Minnesota Timberwolves", league: "NBA", accent: "#0C2340" },
];

export function Interests() {
  return (
    <section
      id="interests"
      className="px-6 py-24"
      style={{ backgroundColor: "#2E3440" }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Interests
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p
            className="mt-4 text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Sports have been part of my life since working in media relations at
            Auburn.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2} stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {teams.map((team) => (
            <div
              key={team.name}
              className="rounded-xl p-6"
              style={{
                backgroundColor: "#3B4252",
                borderLeft: `3px solid ${team.accent}`,
              }}
            >
              <p
                className="font-serif text-base font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {team.name}
              </p>
              <p
                className="mt-1 font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {team.league}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
