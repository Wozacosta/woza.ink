"use client";

import { useEffect, useState } from "react";
import { panel, pill } from "./shared";

export const FAIR_DIE: readonly number[] = Array(6).fill(1 / 6);

const SMALL_SEED = 128;
const LARGE_SEED = 256;
const AUTO_LIMIT = 100_000;
const AUTO_TICK_MS = 120;

/** A die whose six lands with probability `six`, and the other faces share the rest */
export function loadedDie(six: number): number[] {
  return [...Array(5).fill((1 - six) / 5), six];
}

export const LOADED_DIE = loadedDie(0.2);

/** Shannon entropy of one roll, in bits */
export function bitsPerRoll(die: readonly number[]): number {
  return die.reduce((sum, p) => (p > 0 ? sum - p * Math.log2(p) : sum), 0);
}

export function rollsFor(bits: number, die: readonly number[]): number {
  return Math.ceil(bits / bitsPerRoll(die));
}

/** Half-width of the band holding about 95% of a face's share after `rolls` */
export function noiseBand(rolls: number, p = 1 / 6): number {
  return 2 * Math.sqrt((p * (1 - p)) / rolls);
}

/** Rolls until a face with true share `p` sits outside a fair face's band */
export function rollsToOutgrowNoise(p: number): number {
  return Math.ceil((4 * (1 / 6) * (5 / 6)) / (p - 1 / 6) ** 2);
}

/** Add `rolls` rolls to `counts`. `random` returns a number in [0, 1), like Math.random. */
export function addRolls(counts: readonly number[], rolls: number, die: readonly number[], random: () => number): number[] {
  const next = [...counts];
  for (let i = 0; i < rolls; i++) {
    let r = random();
    let face = 0;
    while (face < die.length - 1 && r >= die[face]) r -= die[face++];
    next[face]++;
  }
  return next;
}

const EMPTY = Array<number>(6).fill(0);
const BATCHES = [1, 10, 100, 1000];

const CHART = { left: 20, right: 380, top: 8, bottom: 138 };

function Histogram({ counts, total, die }: { counts: number[]; total: number; die: readonly number[] }) {
  const shares = counts.map((c) => (total ? c / total : 0));
  const yMax = Math.max(0.3, ...shares);
  const y = (share: number) => CHART.bottom - (Math.min(share, yMax) / yMax) * (CHART.bottom - CHART.top);
  const slot = (CHART.right - CHART.left) / 6;
  const band = total ? noiseBand(total) : 0;
  const fairY = y(1 / 6);
  const bandTop = y(1 / 6 + band);
  return (
    <svg viewBox="0 0 400 160" role="img" aria-label={`Histogram of ${total} rolls: ${shares.map((s, i) => `face ${i + 1} ${(s * 100).toFixed(1)}%`).join(", ")}`}>
      {total > 0 && <rect x={CHART.left} y={bandTop} width={CHART.right - CHART.left} height={y(Math.max(0, 1 / 6 - band)) - bandTop} className="d-blue d-fill" opacity="0.14" />}
      {shares.map((share, i) => (
        <rect
          key={i}
          x={CHART.left + i * slot + 8}
          y={y(share)}
          width={slot - 16}
          height={CHART.bottom - y(share)}
          rx={2}
          className={`${die[i] > 1 / 6 + 1e-9 ? "d-rose" : "d-blue"} d-fill`}
          opacity="0.8"
        />
      ))}
      <line x1={CHART.left} y1={fairY} x2={CHART.right} y2={fairY} className="d-line" strokeDasharray="4 3" />
      <line x1={CHART.left} y1={CHART.bottom} x2={CHART.right} y2={CHART.bottom} className="d-line d-faint" />
      {shares.map((share, i) => (
        <text key={i} x={CHART.left + (i + 0.5) * slot} y={153} className="d-s" textAnchor="middle">
          {i + 1}: {total ? `${(share * 100).toFixed(share >= 0.1 ? 0 : 1)}%` : "-"}
        </text>
      ))}
    </svg>
  );
}

export function DiceWidget() {
  const [counts, setCounts] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [auto, setAuto] = useState(false);

  const die = loaded ? LOADED_DIE : FAIR_DIE;
  const total = counts.reduce((a, b) => a + b, 0);
  const running = auto && total < AUTO_LIMIT;
  const bits = total * bitsPerRoll(die);

  const roll = (rolls: number) => setCounts(addRolls(counts, rolls, die, Math.random));
  const reset = (nextLoaded = loaded) => {
    setAuto(false);
    setCounts(EMPTY);
    setLoaded(nextLoaded);
  };

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setCounts(addRolls(counts, Math.max(1, Math.floor(total / 8)), die, Math.random)), AUTO_TICK_MS);
    return () => clearTimeout(t);
  }, [running, counts, total, die]);

  const seed =
    total === 0
      ? "Roll to start."
      : bits >= LARGE_SEED
        ? "Enough for a 24-word seed, and more rolls add nothing to it."
        : bits >= SMALL_SEED
          ? `Enough for a 12-word seed. A 24-word seed takes ${rollsFor(LARGE_SEED, die)} rolls.`
          : `A 12-word seed takes ${rollsFor(SMALL_SEED, die)} rolls.`;

  return (
    <div className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-fg">Roll your own</p>
        <div className="flex gap-2" role="group" aria-label="Which die">
          {[false, true].map((option) => (
            <button key={String(option)} type="button" aria-pressed={loaded === option} onClick={() => reset(option)} className={`${pill} ${loaded === option ? "bg-bg" : "border-line text-muted"}`}>
              {option ? "Loaded six" : "Fair"}
            </button>
          ))}
        </div>
      </div>
      <Histogram counts={counts} total={total} die={die} />
      <div className="flex flex-wrap gap-2">
        {BATCHES.map((rolls) => (
          <button key={rolls} type="button" onClick={() => roll(rolls)} disabled={running} className={pill} aria-label={`Roll ${rolls.toLocaleString("en-US")}`}>
            +{rolls.toLocaleString("en-US")}
          </button>
        ))}
        <button type="button" onClick={() => setAuto(!running)} disabled={!running && total >= AUTO_LIMIT} aria-pressed={running} className={pill}>
          {running ? "Pause" : "Auto"}
        </button>
        <button type="button" onClick={() => reset()} className="ml-auto text-sm text-subtle underline decoration-dotted underline-offset-4 hover:text-fg">
          Reset
        </button>
      </div>
      <div aria-live="polite" className="space-y-2 text-sm text-muted">
        <p>
          <span className="font-mono text-base font-semibold text-fg">{total.toLocaleString("en-US")} rolls, {Math.min(bits, LARGE_SEED).toFixed(0)} bits.</span> {seed}
        </p>
        {total > 0 && (
          <p>
            The shaded band is fair-die noise at this count: ±{(noiseBand(total) * 100).toFixed(1)} points around 16.7%.
            {loaded && ` A 20% six needs about ${rollsToOutgrowNoise(LOADED_DIE[5]).toLocaleString("en-US")} rolls to clear it.`}
          </p>
        )}
      </div>
      <p className="text-xs text-subtle">Uses Math.random(), which is fine for a chart and never for a seed.</p>
    </div>
  );
}
