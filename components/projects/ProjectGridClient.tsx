"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProjectGridClient({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {children}
    </ScrollReveal>
  );
}
