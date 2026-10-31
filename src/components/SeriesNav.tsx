import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import type { Series } from "@/data/series";
import { WipBadge } from "@/components/WipBadge";

/** Every part of a series, in reading order, shown at the end of a post */
export function SeriesNav({
  series,
  parts,
  current,
}: {
  series: Series;
  parts: BlogPost[];
  current: string;
}) {
  return (
    <nav aria-label={`${series.title} series`} className="mt-8 rounded-xl border border-line p-5 sm:p-6">
      <Link
        href={`/blog/series/${series.slug}`}
        className="font-mono text-xs uppercase tracking-widest text-subtle transition-colors hover:text-fg"
      >
        Series: {series.title}
      </Link>
      <ol className="mt-4 space-y-2">
        {parts.map((part, index) => (
          <li key={part.slug} className="flex items-baseline gap-3">
            <span className="w-5 shrink-0 font-mono text-xs text-subtle">{index + 1}</span>
            {part.slug === current ? (
              <span aria-current="page" className="font-semibold text-fg">
                {part.title}
              </span>
            ) : (
              <Link href={`/blog/${part.slug}`} className="text-muted transition-colors hover:text-fg">
                {part.title}
              </Link>
            )}
            {part.wip && <WipBadge />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
