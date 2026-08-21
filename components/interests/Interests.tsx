"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const teams = [
  { name: "Auburn Tigers", league: "NCAA", accent: "#DD550C" },
  { name: "Baltimore Orioles", league: "MLB", accent: "#DF4601" },
  { name: "Chelsea FC", league: "Premier League", accent: "#034694" },
  { name: "Minnesota Timberwolves", league: "NBA", accent: "#0C2340" },
  { name: "Tampa Bay Buccaneers", league: "NFL", accent: "#D50A0A" },
];

const otherInterests = [
  { name: "Movies & TV" },
  { name: "Cooking" },
  { name: "Video Games" },
];

export function Interests() {
  return (
    <section
      id="interests"
      className="px-6 py-24"
      style={{ backgroundColor: "var(--bg-secondary)" }}
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
            Sports have been a part of my life since before I can remember.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
          {teams.map((team) => (
            <ScrollReveal key={team.name} delay={0.2}>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--bg-secondary)",
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
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <h3
            className="mt-12 font-mono text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Also into
          </h3>
        </ScrollReveal>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {otherInterests.map((interest) => (
            <ScrollReveal key={interest.name} delay={0.35}>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <p
                  className="font-serif text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {interest.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
