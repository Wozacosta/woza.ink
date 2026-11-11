import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { formatDate } from "@/lib/format";
import { DAYS, getStats, weekChange, type ProjectStats, type Row } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Stats — woza.ink",
  robots: { index: false, follow: false },
};

export const revalidate = 1800;

const fmt = new Intl.NumberFormat("en");

function Sparkline({ daily, days }: { daily: number[]; days: string[] }) {
  const w = 150;
  const h = 32;
  const max = Math.max(...daily, 1);
  const step = w / (daily.length - 1);
  const y = (v: number) => h - 2 - (v / max) * (h - 4);
  const points = daily.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible text-fg">
      <line x1={0} x2={w} y1={h - 2} y2={h - 2} className="stroke-line" strokeWidth={1} />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {daily.map((v, i) => (
        <rect key={days[i]} x={i * step - step / 2} y={0} width={step} height={h} fill="transparent">
          <title>{`${formatDate(days[i])}: ${fmt.format(v)} visitors`}</title>
        </rect>
      ))}
    </svg>
  );
}

function TopList({ title, rows }: { title: string; rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wide text-subtle">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm">
        {rows.map((r) => (
          <li key={r.label} className="flex justify-between gap-4">
            <span className="truncate text-muted">{r.label}</span>
            <span className="font-mono tabular-nums text-fg">{fmt.format(r.visitors)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectRow({ p }: { p: ProjectStats }) {
  const change = weekChange(p.daily);
  return (
    <li className="py-5">
      <details className="group">
        <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 sm:grid-cols-[1fr_6rem_6rem_7rem_150px]">
          <div className="min-w-0">
            <span className="font-semibold text-fg group-open:underline">{p.name}</span>
            {p.url && (
              <span className="ml-2 truncate font-mono text-xs text-subtle">
                {p.url.replace("https://", "")}
              </span>
            )}
          </div>
          <div className="text-right font-mono tabular-nums">
            <span className="text-fg">{fmt.format(p.visitors)}</span>
            <span className="block text-xs text-subtle sm:hidden">visitors</span>
          </div>
          <div className="hidden text-right font-mono tabular-nums text-muted sm:block">
            {fmt.format(p.pageviews)}
          </div>
          <div className="hidden text-right font-mono text-sm tabular-nums text-muted sm:block">
            {change === null ? "—" : `${change > 0 ? "↑" : change < 0 ? "↓" : ""}${Math.abs(change)}%`}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Sparkline daily={p.daily} days={p.days} />
          </div>
        </summary>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <TopList title="Top pages" rows={p.topPages} />
          <TopList title="Top referrers" rows={p.topReferrers} />
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline underline-offset-4 hover:text-fg"
            >
              Open {p.url.replace("https://", "")} ↗
            </a>
          )}
        </div>
      </details>
    </li>
  );
}

export default async function StatsPage() {
  const stats = await getStats().catch((err: Error) => err);

  if (!stats || stats instanceof Error) {
    return (
      <PageHeader
        title="Stats"
        description={
          stats
            ? `Couldn't load analytics: ${stats.message}`
            : "Set VERCEL_STATS_TOKEN and VERCEL_TEAM_ID to load analytics."
        }
      />
    );
  }

  const active = stats.tracked.filter((p) => p.visitors > 0);
  const quiet = stats.tracked.filter((p) => p.visitors === 0);
  const visitors = active.reduce((n, p) => n + p.visitors, 0);
  const pageviews = active.reduce((n, p) => n + p.pageviews, 0);

  return (
    <>
      <PageHeader
        title="Stats"
        width="max-w-6xl"
        description={`${fmt.format(visitors)} visitors and ${fmt.format(pageviews)} page views across ${active.length} projects in the last ${DAYS} days.`}
        meta={`${formatDate(stats.since)} – ${formatDate(stats.until)} · Vercel Web Analytics`}
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="hidden grid-cols-[1fr_6rem_6rem_7rem_150px] gap-x-6 border-b border-line pb-2 font-mono text-xs uppercase tracking-wide text-subtle sm:grid">
          <span>Project</span>
          <span className="text-right">Visitors</span>
          <span className="text-right">Views</span>
          <span className="text-right">7d vs prior</span>
          <span>Daily visitors</span>
        </div>
        <ul className="divide-y divide-line border-b border-line">
          {active.map((p) => (
            <ProjectRow key={p.id} p={p} />
          ))}
        </ul>

        {quiet.length > 0 && (
          <p className="mt-10 text-sm text-muted">
            <span className="font-mono text-xs uppercase tracking-wide text-subtle">
              No visitors yet ·{" "}
            </span>
            {quiet.map((p) => p.name).join(", ")}
          </p>
        )}
        {stats.untracked.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-xs uppercase tracking-wide text-subtle">
              Web Analytics off ·{" "}
            </span>
            {stats.untracked.join(", ")}
          </p>
        )}
      </section>
    </>
  );
}
