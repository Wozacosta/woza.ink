import { getAllReadingItems } from "@/data/reading";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Reading — woza.ink",
  description: "Articles, essays and papers I've read recently and found worth keeping.",
  alternates: { canonical: "/reading" },
};

export default async function ReadingPage() {
  const items = await getAllReadingItems();

  return (
    <>
      <PageHeader
        title="Reading"
        description="Articles, essays, and things I've been reading."
        meta={items.length > 0 ? `${items.length} items` : undefined}
      />

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {items.length === 0 ? (
          <p className="py-12 text-center text-muted">Nothing here yet...</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs text-subtle">
                    <time dateTime={item.readDate} className="uppercase tracking-wide">
                      {formatDate(item.readDate)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {item.source}
                      {item.author && ` · ${item.author}`}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-fg underline-offset-4 group-hover:underline sm:text-xl">
                    {item.title}
                    <span aria-hidden="true" className="ml-1 text-subtle">↗</span>
                  </h2>
                  {item.description && (
                    <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                  )}
                  {item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-surface px-2 py-0.5 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
