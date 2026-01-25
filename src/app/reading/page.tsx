import Link from "next/link";
import { getAllReadingItems } from "@/data/reading";

export default function ReadingPage() {
  const items = getAllReadingItems();

  return (
    <main className="min-h-screen">
      <header className="py-16 px-8">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
        >
          &larr; Back
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Reading
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Articles, essays, and things I've been reading
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            Nothing here yet...
          </p>
        ) : (
          <div className="space-y-10">
            {items.map((item) => (
              <article key={item.slug} className="group">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-baseline gap-2 text-sm text-gray-400 dark:text-gray-500 font-mono">
                    <time dateTime={item.readDate}>
                      {new Date(item.readDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-semibold mt-2 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="italic">{item.source}</span>
                    {item.author && <span> · {item.author}</span>}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
