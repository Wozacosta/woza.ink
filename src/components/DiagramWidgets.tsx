"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { DiceWidget } from "./widgets/DiceWidget";
import { LiquidationWidget } from "./widgets/LiquidationWidget";
import { ShareWidget } from "./widgets/ShareWidget";

export function fittsBits(distance: number, width: number): number {
  return Math.log2(distance / width + 1);
}

/** Hick's cost of reaching one of `options` through `steps` equal choices */
export function hickCost(options: number, steps: number): number {
  return steps * Math.log2(options ** (1 / steps) + 1);
}

const panel = "not-prose mt-5 space-y-3 rounded-lg border border-line bg-surface mx-5 p-4 sm:mx-0";

function Slider({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-muted">
      <span className="w-16 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 min-w-0 flex-1 accent-[var(--foreground)]"
      />
      <span className="w-12 shrink-0 text-right font-mono text-xs text-fg">
        {value}
        {suffix}
      </span>
    </label>
  );
}

function FittsWidget() {
  const [distance, setDistance] = useState(300);
  const [width, setWidth] = useState(20);
  const start = 20;
  const left = start + distance - width / 2;
  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-fg">Try your own</p>
      <svg viewBox="0 0 400 60" role="img" aria-label={`Target ${width} wide, ${distance} away`}>
        <circle cx={start} cy="30" r="4" className="d-blue d-fill" />
        <rect x={left} y="10" width={width} height="40" rx="4" className="d-green d-fill" opacity="0.85" />
        {left > start + 10 && <line x1={start + 8} y1="30" x2={left - 3} y2="30" className="d-line" />}
      </svg>
      <Slider label="Distance" value={distance} min={40} max={320} onChange={setDistance} />
      <Slider label="Width" value={width} min={10} max={100} onChange={setWidth} />
      <p aria-live="polite" className="text-sm text-muted">
        <span className="font-mono text-base font-semibold text-fg">{fittsBits(distance, width).toFixed(1)} bits.</span>{" "}
        Only the ratio matters: half the distance does what double the width does.
      </p>
    </div>
  );
}

function HickWidget() {
  const [options, setOptions] = useState(16);
  const costs = [1, 2, 3].map((steps) => ({ steps, cost: hickCost(options, steps) }));
  const most = Math.max(...costs.map((c) => c.cost));
  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-fg">One big choice, or several small ones?</p>
      <Slider label="Options" value={options} min={2} max={64} onChange={setOptions} />
      <ul aria-live="polite" className="space-y-2">
        {costs.map(({ steps, cost }) => (
          <li key={steps} className="text-sm text-muted">
            <div className="flex justify-between gap-3">
              <span>
                {steps === 1 ? "One step" : `${steps} steps`} of {(options ** (1 / steps)).toFixed(1).replace(/\.0$/, "")}
              </span>
              <span className="font-mono text-xs text-fg">{cost.toFixed(1)}</span>
            </div>
            <div className="mt-1 h-2 rounded-sm bg-line-strong" style={{ width: `${(cost / most) * 100}%` }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DELAYS = [100, 400, 1000, 2000];

function DelayWidget() {
  const [waiting, setWaiting] = useState<number | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const press = (ms: number) => {
    setDone(null);
    setWaiting(ms);
    timer.current = setTimeout(() => {
      setWaiting(null);
      setDone(ms);
    }, ms);
  };

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-fg">Feel the difference</p>
      <div className="flex flex-wrap gap-2">
        {DELAYS.map((ms) => (
          <button
            key={ms}
            type="button"
            onClick={() => press(ms)}
            disabled={waiting !== null}
            className="inline-flex h-9 items-center justify-center rounded-full border border-line-strong px-3.5 font-mono text-sm text-fg transition-colors hover:bg-bg disabled:opacity-40"
          >
            {ms < 1000 ? `${ms} ms` : `${ms / 1000} s`}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="min-h-6 text-sm text-muted">
        {waiting !== null ? "Waiting…" : done !== null ? <span className="font-semibold text-fg">Done.</span> : "Press one and watch this line."}
      </p>
    </div>
  );
}

/** Diagram name (public/diagrams/<name>.svg) → hands-on widget mounted under the static SVG */
export const diagramWidgets: Record<string, ComponentType> = {
  "ux-fitts": FittsWidget,
  "ux-hick": HickWidget,
  "ux-response": DelayWidget,
  "perps-margin": LiquidationWidget,
  "pm-shares": ShareWidget,
  "dice-noise": DiceWidget,
};
