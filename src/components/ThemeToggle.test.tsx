import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
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

// Mock matchMedia
const createMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(
      (event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === "change") listeners.push(cb);
      },
    ),
    removeEventListener: vi.fn(
      (event: string, cb: (e: MediaQueryListEvent) => void) => {
        const index = listeners.indexOf(cb);
        if (index > -1) listeners.splice(index, 1);
      },
    ),
    dispatchEvent: vi.fn(),
    _triggerChange: (newMatches: boolean) => {
      listeners.forEach((cb) =>
        cb({ matches: newMatches } as MediaQueryListEvent),
      );
    },
  }));
};

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    Object.defineProperty(document.documentElement, "classList", {
      value: {
        add: vi.fn(),
        remove: vi.fn(),
        toggle: vi.fn(),
        contains: vi.fn(),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render toggle button after mounting", async () => {
    window.matchMedia = createMatchMedia(false);
    render(<ThemeToggle />);

    // After useEffect runs, button should be visible
    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label");
  });

  it("should show 'Switch to dark mode' when in light mode", async () => {
    window.matchMedia = createMatchMedia(false);
    localStorageMock.getItem.mockReturnValue(null);

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("should show 'Switch to light mode' when in dark mode", async () => {
    window.matchMedia = createMatchMedia(true);
    localStorageMock.getItem.mockReturnValue("dark");

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("should toggle theme on click", async () => {
    window.matchMedia = createMatchMedia(false);
    localStorageMock.getItem.mockReturnValue(null);

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");

    // Click to switch to dark mode
    fireEvent.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith("woza-theme", "dark");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true,
    );
  });

  it("should respect stored theme preference over system preference", async () => {
    window.matchMedia = createMatchMedia(true); // System prefers dark
    localStorageMock.getItem.mockReturnValue("light"); // But user stored light

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    // Should show dark mode option since we're in light mode
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("should use system preference when no stored preference", async () => {
    window.matchMedia = createMatchMedia(true); // System prefers dark
    localStorageMock.getItem.mockReturnValue(null); // No stored preference

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    // Should show light mode option since system prefers dark
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("should have proper focus styles", async () => {
    window.matchMedia = createMatchMedia(false);
    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    expect(button.className).toContain("focus-visible:ring-2");
  });

  it("should render sun icon in dark mode", async () => {
    window.matchMedia = createMatchMedia(true);
    localStorageMock.getItem.mockReturnValue("dark");

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Sun icon has a circle element
    expect(svg?.querySelector("circle")).toBeInTheDocument();
  });

  it("should render moon icon in light mode", async () => {
    window.matchMedia = createMatchMedia(false);
    localStorageMock.getItem.mockReturnValue("light");

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Moon icon has a path element but no circle
    expect(svg?.querySelector("path")).toBeInTheDocument();
  });

  it("should toggle from dark to light mode", async () => {
    window.matchMedia = createMatchMedia(true);
    localStorageMock.getItem.mockReturnValue("dark");

    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    fireEvent.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "woza-theme",
      "light",
    );
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      false,
    );
  });
});
