const TAG_COLORS: Record<string, string> = {
  project:
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  react:
    "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  web:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  personal:
    "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  productivity:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  standards:
    "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  tutorial:
    "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  rss:
    "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  learning:
    "bg-lime-50 text-lime-700 dark:bg-lime-950 dark:text-lime-300",
  privacy:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  security:
    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "open-source":
    "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  decentralized:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  social:
    "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  protocols:
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  web3:
    "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  publishing:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  career:
    "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  motivation:
    "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

const DEFAULT_TAG =
  "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

export function TagBadge({ tag }: { tag: string }) {
  const colors = TAG_COLORS[tag.toLowerCase()] ?? DEFAULT_TAG;
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium transition-opacity ${colors}`}
    >
      #{tag}
    </span>
  );
}
