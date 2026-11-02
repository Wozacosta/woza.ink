"use client";

import { useState } from "react";
import { panel, Slider, Stat } from "./shared";

export type Side = "YES" | "NO";

/** A complete set redeems for $1, so the two prices sum to about $1 */
export function noPrice(yesPrice: number): number {
  return 1 - yesPrice;
}

/** Profit on a share that pays $1, as a fraction of what it cost */
export function returnIfRight(price: number): number {
  return (1 - price) / price;
}

/** The side a trader with this belief should buy, or null if they agree with the market */
export function betterSide(yesPrice: number, belief: number): Side | null {
  if (belief === yesPrice) return null;
  return belief > yesPrice ? "YES" : "NO";
}

/** What one share of `side` is worth in expectation, given the chance the trader puts on YES */
export function shareValue(side: Side, belief: number): number {
  return side === "YES" ? belief : 1 - belief;
}

export function expectedReturn(price: number, value: number): number {
  return (value - price) / price;
}

const cents = (dollars: number) => `${Math.round(dollars * 100)}¢`;
const percent = (fraction: number) => `${Math.round(fraction * 100)}%`;

export function ShareWidget() {
  const [yesCents, setYesCents] = useState(62);
  const [beliefPct, setBeliefPct] = useState(75);

  const yes = yesCents / 100;
  const belief = beliefPct / 100;
  const side = betterSide(yes, belief);
  const shown = side ?? "YES";
  const price = shown === "YES" ? yes : noPrice(yes);
  const value = shareValue(shown, belief);
  const lopsided = yes >= 0.85 || yes <= 0.15;

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-fg">Price a share</p>
      <svg viewBox="0 0 400 50" role="img" aria-label={`YES at ${yesCents} cents, NO at ${100 - yesCents} cents, your belief ${beliefPct} percent`}>
        <rect x={20} y={8} width={Math.max(0, 3.6 * yesCents - 1)} height={20} rx={3} className="d-green d-fill" opacity="0.8" />
        <rect x={20 + 3.6 * yesCents + 1} y={8} width={Math.max(0, 3.6 * (100 - yesCents) - 1)} height={20} rx={3} className="d-rose d-fill" opacity="0.8" />
        <line x1={20 + 3.6 * beliefPct} y1={2} x2={20 + 3.6 * beliefPct} y2={34} className="d-line" style={{ strokeWidth: 2 }} />
        <text x={Math.min(Math.max(20 + 3.6 * beliefPct, 44), 356)} y={46} className="d-s" textAnchor="middle">
          you: {beliefPct}%
        </text>
      </svg>
      <Slider label="YES price" value={yesCents} min={1} max={99} suffix="¢" onChange={setYesCents} />
      <Slider label="Your belief" value={beliefPct} min={1} max={99} suffix="%" onChange={setBeliefPct} />
      <div aria-live="polite" className="space-y-3">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={`${shown} costs`} value={cents(price)} />
          <Stat label="Pays" value="$1 or $0" />
          <Stat label="If right" value={`+${percent(returnIfRight(price))}`} />
          <Stat label="If wrong" value="-100%" />
        </dl>
        <p className="text-sm text-muted">
          {side ? (
            <>
              <span className="font-mono text-base font-semibold text-fg">
                Buy {side}: {cents(value - price)} of edge.
              </span>{" "}
              You pay {cents(price)} for something worth {cents(value)} to you, an expected return of {percent(expectedReturn(price, value))}.
            </>
          ) : (
            <span className="font-semibold text-fg">You agree with the market, so there&apos;s no trade.</span>
          )}{" "}
          {lopsided && "This close to 0 or 1, the side that's right earns little for what it locks up."}
        </p>
      </div>
    </div>
  );
}
