import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { addRolls, bitsPerRoll, DiceWidget, FAIR_DIE, LOADED_DIE, loadedDie, noiseBand, rollsFor, rollsToOutgrowNoise } from "./DiceWidget";

/** Small seeded generator, so these tests don't depend on Math.random */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("the post's arithmetic", () => {
  it("gets 2.585 bits from a fair roll", () => {
    expect(bitsPerRoll(FAIR_DIE)).toBeCloseTo(2.585, 3);
  });

  it("needs 50 rolls for 128 bits and 100 for 256", () => {
    expect(rollsFor(128, FAIR_DIE)).toBe(50);
    expect(256 / bitsPerRoll(FAIR_DIE)).toBeCloseTo(99.03, 2);
    expect(rollsFor(256, FAIR_DIE)).toBe(100);
  });

  it("reduces entropy with a bias instead of destroying it", () => {
    expect(bitsPerRoll(LOADED_DIE)).toBeLessThan(bitsPerRoll(FAIR_DIE));
    expect(bitsPerRoll(LOADED_DIE)).toBeGreaterThan(2.5);
    expect(bitsPerRoll(loadedDie(1))).toBe(0);
  });

  it("clears 256 bits in 120 rolls with a mediocre die", () => {
    expect(120 * bitsPerRoll(LOADED_DIE)).toBeGreaterThan(256);
  });
});

describe("noise", () => {
  it("matches the bands in the dice-noise diagram", () => {
    expect((1 / 6 + noiseBand(100)) * 100).toBeCloseTo(24.1, 1);
    expect((1 / 6 - noiseBand(1000)) * 100).toBeCloseTo(14.3, 1);
    expect((1 / 6 + noiseBand(10000)) * 100).toBeCloseTo(17.4, 1);
  });

  it("halves when the rolls go up four times", () => {
    expect(noiseBand(400)).toBeCloseTo(noiseBand(100) / 2);
  });

  it("hides a 20% six at 100 rolls and shows it after about 500", () => {
    expect(0.2 - 1 / 6).toBeLessThan(noiseBand(100));
    expect(rollsToOutgrowNoise(0.2)).toBe(500);
  });
});

describe("addRolls", () => {
  it("settles near 1 in 6 for every face", () => {
    const counts = addRolls(Array(6).fill(0), 60_000, FAIR_DIE, mulberry32(1));
    expect(counts.reduce((a, b) => a + b)).toBe(60_000);
    for (const c of counts) expect(Math.abs(c / 60_000 - 1 / 6)).toBeLessThan(noiseBand(60_000) * 2);
  });

  it("favors the six on a loaded die", () => {
    const counts = addRolls(Array(6).fill(0), 60_000, LOADED_DIE, mulberry32(2));
    expect(counts[5] / 60_000).toBeCloseTo(0.2, 1);
  });

  it("maps the ends of the generator's range onto faces 1 and 6", () => {
    expect(addRolls(Array(6).fill(0), 1, FAIR_DIE, () => 0)[0]).toBe(1);
    expect(addRolls(Array(6).fill(0), 1, FAIR_DIE, () => 0.999999)[5]).toBe(1);
  });
});

describe("DiceWidget", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("collects bits as you roll and caps them at the seed size", () => {
    render(<DiceWidget />);
    expect(screen.getByText("Roll to start.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Roll 10" }));
    expect(screen.getByText("10 rolls, 26 bits.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Roll 100" }));
    expect(screen.getByText("110 rolls, 256 bits.")).toBeInTheDocument();
    expect(screen.getByText(/more rolls add nothing/)).toBeInTheDocument();
  });

  it("starts over when the die changes", () => {
    render(<DiceWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Roll 100" }));
    fireEvent.click(screen.getByRole("button", { name: "Loaded six" }));
    expect(screen.getByText("0 rolls, 0 bits.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Roll 100" }));
    expect(screen.getByText(/needs about 500 rolls/)).toBeInTheDocument();
  });

  it("keeps rolling on auto until paused", () => {
    vi.useFakeTimers();
    render(<DiceWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Auto" }));
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(120);
      });
    }
    expect(screen.getByText(/^3 rolls/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/^3 rolls/)).toBeInTheDocument();
  });
});
