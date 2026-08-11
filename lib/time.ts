export type TimePhase = "dawn" | "morning" | "afternoon" | "evening" | "night";

export type Season = "spring" | "summer" | "fall" | "winter";

export function getPhaseForHour(hour: number): TimePhase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function getSeasonForDate(date: Date): Season {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "fall";
  return "winter";
}

export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

export function getGreeting(phase: TimePhase, date?: Date): string {
  const baseGreeting = (() => {
    switch (phase) {
      case "dawn":
        return "Good morning";
      case "morning":
        return "Good morning";
      case "afternoon":
        return "Good afternoon";
      case "evening":
        return "Good evening";
      case "night":
        return "Good evening";
    }
  })();

  if (!date) return baseGreeting;

  const day = getDayOfWeek(date);
  if (day === 1 && (phase === "dawn" || phase === "morning"))
    return "Happy Monday";
  if (day === 5 && (phase === "afternoon" || phase === "evening"))
    return "Happy Friday";
  return baseGreeting;
}
