"use client";

import React from "react";

export function ProjectGridClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
  );
}
