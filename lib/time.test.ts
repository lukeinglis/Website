import { describe, expect, it } from "vitest";
import {
  getDayOfWeek,
  getGreeting,
  getPhaseForHour,
  getSeasonForDate,
} from "./time";

describe("getPhaseForHour", () => {
  it("returns night for midnight (0)", () => {
    expect(getPhaseForHour(0)).toBe("night");
  });

  it("returns night for 4am", () => {
    expect(getPhaseForHour(4)).toBe("night");
  });

  it("returns dawn at 5am boundary", () => {
    expect(getPhaseForHour(5)).toBe("dawn");
  });

  it("returns dawn for 6am", () => {
    expect(getPhaseForHour(6)).toBe("dawn");
  });

  it("returns dawn for 7am", () => {
    expect(getPhaseForHour(7)).toBe("dawn");
  });

  it("returns morning at 8am boundary", () => {
    expect(getPhaseForHour(8)).toBe("morning");
  });

  it("returns morning for 10am", () => {
    expect(getPhaseForHour(10)).toBe("morning");
  });

  it("returns morning for 11am", () => {
    expect(getPhaseForHour(11)).toBe("morning");
  });

  it("returns afternoon at noon boundary", () => {
    expect(getPhaseForHour(12)).toBe("afternoon");
  });

  it("returns afternoon for 3pm", () => {
    expect(getPhaseForHour(15)).toBe("afternoon");
  });

  it("returns afternoon for 4pm", () => {
    expect(getPhaseForHour(16)).toBe("afternoon");
  });

  it("returns evening at 5pm boundary", () => {
    expect(getPhaseForHour(17)).toBe("evening");
  });

  it("returns evening for 7pm", () => {
    expect(getPhaseForHour(19)).toBe("evening");
  });

  it("returns evening for 8pm", () => {
    expect(getPhaseForHour(20)).toBe("evening");
  });

  it("returns night at 9pm boundary", () => {
    expect(getPhaseForHour(21)).toBe("night");
  });

  it("returns night for 11pm", () => {
    expect(getPhaseForHour(23)).toBe("night");
  });

  it("covers all 24 hours without gaps", () => {
    const validPhases = new Set([
      "dawn",
      "morning",
      "afternoon",
      "evening",
      "night",
    ]);
    for (let h = 0; h < 24; h++) {
      expect(validPhases.has(getPhaseForHour(h))).toBe(true);
    }
  });
});

describe("getSeasonForDate", () => {
  it("returns winter for January", () => {
    expect(getSeasonForDate(new Date(2025, 0, 15))).toBe("winter");
  });

  it("returns winter for February", () => {
    expect(getSeasonForDate(new Date(2025, 1, 15))).toBe("winter");
  });

  it("returns spring for March", () => {
    expect(getSeasonForDate(new Date(2025, 2, 1))).toBe("spring");
  });

  it("returns spring for May", () => {
    expect(getSeasonForDate(new Date(2025, 4, 31))).toBe("spring");
  });

  it("returns summer for June", () => {
    expect(getSeasonForDate(new Date(2025, 5, 1))).toBe("summer");
  });

  it("returns summer for August", () => {
    expect(getSeasonForDate(new Date(2025, 7, 15))).toBe("summer");
  });

  it("returns fall for September", () => {
    expect(getSeasonForDate(new Date(2025, 8, 1))).toBe("fall");
  });

  it("returns fall for November", () => {
    expect(getSeasonForDate(new Date(2025, 10, 30))).toBe("fall");
  });

  it("returns winter for December", () => {
    expect(getSeasonForDate(new Date(2025, 11, 25))).toBe("winter");
  });

  it("handles leap year February 29", () => {
    expect(getSeasonForDate(new Date(2024, 1, 29))).toBe("winter");
  });
});

describe("getDayOfWeek", () => {
  it("returns 0 for Sunday", () => {
    expect(getDayOfWeek(new Date(2025, 0, 5))).toBe(0);
  });

  it("returns 1 for Monday", () => {
    expect(getDayOfWeek(new Date(2025, 0, 6))).toBe(1);
  });

  it("returns 5 for Friday", () => {
    expect(getDayOfWeek(new Date(2025, 0, 3))).toBe(5);
  });
});

describe("getGreeting", () => {
  it("returns Good morning for dawn without date", () => {
    expect(getGreeting("dawn")).toBe("Good morning");
  });

  it("returns Good morning for morning without date", () => {
    expect(getGreeting("morning")).toBe("Good morning");
  });

  it("returns Good afternoon for afternoon without date", () => {
    expect(getGreeting("afternoon")).toBe("Good afternoon");
  });

  it("returns Good evening for evening without date", () => {
    expect(getGreeting("evening")).toBe("Good evening");
  });

  it("returns Good evening for night without date", () => {
    expect(getGreeting("night")).toBe("Good evening");
  });

  it("returns Happy Monday for dawn on Monday", () => {
    const monday = new Date(2025, 0, 6);
    expect(getGreeting("dawn", monday)).toBe("Happy Monday");
  });

  it("returns Happy Monday for morning on Monday", () => {
    const monday = new Date(2025, 0, 6);
    expect(getGreeting("morning", monday)).toBe("Happy Monday");
  });

  it("returns standard greeting for afternoon on Monday", () => {
    const monday = new Date(2025, 0, 6);
    expect(getGreeting("afternoon", monday)).toBe("Good afternoon");
  });

  it("returns Happy Friday for afternoon on Friday", () => {
    const friday = new Date(2025, 0, 3);
    expect(getGreeting("afternoon", friday)).toBe("Happy Friday");
  });

  it("returns Happy Friday for evening on Friday", () => {
    const friday = new Date(2025, 0, 3);
    expect(getGreeting("evening", friday)).toBe("Happy Friday");
  });

  it("returns standard greeting for morning on Friday", () => {
    const friday = new Date(2025, 0, 3);
    expect(getGreeting("morning", friday)).toBe("Good morning");
  });

  it("returns standard greeting for Wednesday with date", () => {
    const wednesday = new Date(2025, 0, 1);
    expect(getGreeting("morning", wednesday)).toBe("Good morning");
  });
});
