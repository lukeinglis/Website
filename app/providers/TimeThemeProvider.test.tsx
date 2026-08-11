import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TimeThemeProvider, useTimeTheme } from "./TimeThemeProvider";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockReturnValue({ matches: false }),
});

function TestConsumer() {
  const { phase, mode } = useTimeTheme();
  return (
    <div>
      <span data-testid="phase">{phase}</span>
      <span data-testid="mode">{mode}</span>
    </div>
  );
}

describe("TimeThemeProvider", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.cssText = "";
  });

  it("provides auto mode by default", () => {
    render(
      <TimeThemeProvider>
        <TestConsumer />
      </TimeThemeProvider>,
    );
    expect(screen.getByTestId("mode").textContent).toBe("auto");
  });

  it("sets data-theme attribute on html element", async () => {
    render(
      <TimeThemeProvider>
        <TestConsumer />
      </TimeThemeProvider>,
    );
    await act(() => Promise.resolve());
    expect(document.documentElement.dataset.theme).toBeTruthy();
  });

  it("sets CSS custom properties on html element", async () => {
    render(
      <TimeThemeProvider>
        <TestConsumer />
      </TimeThemeProvider>,
    );
    await act(() => Promise.resolve());
    expect(
      document.documentElement.style.getPropertyValue("--bg-primary"),
    ).toBeTruthy();
  });

  it("throws when useTimeTheme is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useTimeTheme must be used within TimeThemeProvider",
    );
    consoleSpy.mockRestore();
  });

  it("restores mode from localStorage via lazy init", () => {
    localStorageMock.setItem("theme-mode", "evening");
    render(
      <TimeThemeProvider>
        <TestConsumer />
      </TimeThemeProvider>,
    );
    expect(screen.getByTestId("mode").textContent).toBe("evening");
  });

  it("includes aria-live announcement region", () => {
    render(
      <TimeThemeProvider>
        <TestConsumer />
      </TimeThemeProvider>,
    );
    expect(document.querySelector('[aria-live="polite"]')).toBeTruthy();
  });
});
