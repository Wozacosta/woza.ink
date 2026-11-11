/**
 * Traffic for every Vercel project on the account, from the Web Analytics API.
 * Needs VERCEL_STATS_TOKEN (a Vercel access token) and VERCEL_TEAM_ID.
 */

const API = "https://api.vercel.com";
const REVALIDATE = 1800;
export const DAYS = 30;

export interface Row {
  label: string;
  visitors: number;
}

export interface ProjectStats {
  id: string;
  name: string;
  url?: string;
  visitors: number;
  pageviews: number;
  /** Visitors per day, oldest first, DAYS long */
  daily: number[];
  /** Day each `daily` entry covers, as YYYY-MM-DD */
  days: string[];
  topPages: Row[];
  topReferrers: Row[];
}

export interface Stats {
  tracked: ProjectStats[];
  /** Projects with Web Analytics switched off */
  untracked: { name: string; url?: string }[];
  since: string;
  until: string;
}

interface VercelProject {
  id: string;
  name: string;
  webAnalytics?: { enabledAt?: number; disabledAt?: number };
  targets?: { production?: { alias?: string[] } };
}

interface VisitRow {
  visitors: number;
  pageviews: number;
  timestamp?: string;
  [dimension: string]: string | number | undefined;
}

/** Last 7 days against the 7 before, as a whole percentage */
export function weekChange(daily: number[]): number | null {
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const last = sum(daily.slice(-7));
  const prev = sum(daily.slice(-14, -7));
  return prev ? Math.round(((last - prev) / prev) * 100) : null;
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

/** The days [since, until) covers, oldest first */
export function dayRange(until: Date, days = DAYS): string[] {
  const end = Date.UTC(until.getUTCFullYear(), until.getUTCMonth(), until.getUTCDate());
  return Array.from({ length: days }, (_, i) => isoDay(new Date(end - (days - 1 - i) * 86_400_000)));
}

/** Spread API rows over every day in the range, filling gaps with zero */
export function fillDays(rows: VisitRow[], days: string[]): number[] {
  const byDay = new Map(rows.map((r) => [r.timestamp?.slice(0, 10), r.visitors]));
  return days.map((d) => byDay.get(d) ?? 0);
}

/** The public domain for a project: a custom one if it has it */
export function productionUrl(project: VercelProject): string | undefined {
  const aliases = project.targets?.production?.alias ?? [];
  const host = aliases.find((a) => !a.endsWith(".vercel.app")) ?? aliases[0];
  return host ? `https://${host}` : undefined;
}

export const tracksAnalytics = (p: VercelProject) =>
  Boolean(p.webAnalytics?.enabledAt && !p.webAnalytics.disabledAt);

async function api<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(path, API);
  url.searchParams.set("teamId", process.env.VERCEL_TEAM_ID ?? "");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_STATS_TOKEN}` },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

const visits = (projectId: string, since: string, until: string, extra: Record<string, string>) =>
  api<{ data: VisitRow[] }>("/v1/query/web-analytics/visits/aggregate", {
    projectId,
    since,
    until,
    ...extra,
  }).then((r) => r.data);

const top = (rows: VisitRow[], key: string): Row[] =>
  rows
    .filter((r) => r[key] !== "Others")
    .map((r) => ({ label: String(r[key] || "Direct"), visitors: r.visitors }));

async function projectStats(p: VercelProject, days: string[], since: string, until: string) {
  const daily = await visits(p.id, since, until, { by: "day" });
  const visitors = daily.reduce((n, r) => n + r.visitors, 0);
  const pageviews = daily.reduce((n, r) => n + r.pageviews, 0);
  const [pages, referrers] = visitors
    ? await Promise.all([
        visits(p.id, since, until, { by: "requestPath", limit: "5" }),
        visits(p.id, since, until, { by: "referrerHostname", limit: "5" }),
      ])
    : [[], []];
  return {
    id: p.id,
    name: p.name,
    url: productionUrl(p),
    visitors,
    pageviews,
    daily: fillDays(daily, days),
    days,
    topPages: top(pages, "requestPath"),
    topReferrers: top(referrers, "referrerHostname"),
  } satisfies ProjectStats;
}

export async function getStats(now = new Date()): Promise<Stats | null> {
  if (!process.env.VERCEL_STATS_TOKEN || !process.env.VERCEL_TEAM_ID) return null;

  const days = dayRange(now);
  const since = days[0];
  const until = isoDay(new Date(Date.parse(days[days.length - 1]) + 86_400_000));

  const { projects } = await api<{ projects: VercelProject[] }>("/v9/projects", { limit: "100" });
  const tracked = await Promise.all(
    projects.filter(tracksAnalytics).map((p) => projectStats(p, days, since, until)),
  );

  return {
    tracked: tracked.sort((a, b) => b.visitors - a.visitors || a.name.localeCompare(b.name)),
    untracked: projects
      .filter((p) => !tracksAnalytics(p))
      .map((p) => ({ name: p.name, url: productionUrl(p) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    since,
    until: days[days.length - 1],
  };
}
