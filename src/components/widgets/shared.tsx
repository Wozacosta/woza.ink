"use client";

export const panel = "not-prose mt-5 space-y-3 rounded-lg border border-line bg-surface mx-5 p-4 sm:mx-0";

export const pill =
  "inline-flex h-9 items-center justify-center rounded-full border border-line-strong px-3.5 font-mono text-sm text-fg transition-colors hover:bg-bg disabled:opacity-40";

/** The Slider from DiagramWidgets, with a step and room for longer labels */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-muted">
      <span className="w-[5.5rem] shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 min-w-0 flex-1 accent-[var(--foreground)]"
      />
      <span className="w-14 shrink-0 text-right font-mono text-xs text-fg">
        {prefix}
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </label>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="font-mono text-sm text-fg">{value}</dd>
    </div>
  );
}
