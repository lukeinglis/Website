"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProjectGridClient({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children);
  const featured = childArray[0];
  const rest = childArray.slice(1);

  return (
    <div className="mt-10 space-y-6">
      {featured && <ScrollReveal>{featured}</ScrollReveal>}
      {rest.length > 0 && (
        <ScrollReveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest}
        </ScrollReveal>
      )}
    </div>
  );
}
