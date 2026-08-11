"use client";

import {
  type ThemeMode,
  useTimeTheme,
} from "@/app/providers/TimeThemeProvider";

const options: { value: ThemeMode; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "dawn", label: "Dawn" },
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Night" },
];

export function ThemeToggle() {
  const { mode, setMode } = useTimeTheme();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-[var(--text-secondary)]">Theme</span>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as ThemeMode)}
        className="rounded-md border border-[var(--text-secondary)]/20 bg-[var(--bg-secondary)] px-2 py-1 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        aria-label="Select theme"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
