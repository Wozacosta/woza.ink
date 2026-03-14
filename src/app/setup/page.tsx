import Link from "next/link";
import { getAllSetupCategories, SetupItem } from "@/data/setup";
import { getPostBySlug } from "@/data/blog";

export const metadata = {
  title: "Setup — woza.ink",
  description: "My DX setup: keyboards, browser, search, AI tools, and the thinking behind my choices.",
};

function ExternalIcon() {
  return (
    <svg
      className="inline-block w-3 h-3 ml-1 opacity-40 flex-shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5M9.5 2.5V7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      className="w-3 h-3 flex-shrink-0 opacity-50"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 2.5C2 1.67 2.67 1 3.5 1h5C9.33 1 10 1.67 10 2.5v7c0 .83-.67 1.5-1.5 1.5h-5C2.67 11 2 10.33 2 9.5v-7zM4.5 4l3 2-3 2V4z" />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg
      className="w-3 h-3 flex-shrink-0 opacity-50"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="9" height="9" rx="1" />
      <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round" />
    </svg>
  );
}

function PostIcon() {
  return (
    <svg
      className="w-3 h-3 flex-shrink-0 opacity-50"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 2h8M2 5h8M2 8h5" strokeLinecap="round" />
    </svg>
  );
}

function SetupItemCard({ item }: { item: SetupItem }) {
  if (item.type === "post") {
    const post = getPostBySlug(item.slug);
    if (!post) return null;
    return (
      <div className="group border border-gray-200 dark:border-gray-700/60 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-all duration-200">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-gray-400 dark:text-gray-500">
            <PostIcon />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/blog/${post.slug}`}
                className="font-medium text-ink dark:text-cream hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {post.title}
              </Link>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                my post
              </span>
            </div>
            {item.note && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-3 italic">
                {item.note}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className="group border border-gray-200 dark:border-gray-700/60 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-all duration-200">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-gray-400 dark:text-gray-500">
            <VideoIcon />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink dark:text-cream hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {item.title}
                <ExternalIcon />
              </a>
              {item.channel && (
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                  {item.channel}
                </span>
              )}
            </div>
            {item.note && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-3 italic">
                {item.note}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // article
  return (
    <div className="group border border-gray-200 dark:border-gray-700/60 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-all duration-200">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-gray-400 dark:text-gray-500">
          <ArticleIcon />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink dark:text-cream hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {item.title}
              <ExternalIcon />
            </a>
            {(item.source || item.author) && (
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                {item.author ? `${item.author}` : ""}
                {item.author && item.source ? " · " : ""}
                {item.source ? item.source : ""}
              </span>
            )}
          </div>
          {item.note && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-3 italic">
              {item.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SetupPage() {
  const categories = getAllSetupCategories();

  return (
    <main className="min-h-screen">
      <header className="py-16 px-8 max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
        >
          &larr; Back
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          My DX setup — the tools I use and the thinking behind them. Articles, videos, and my own notes.
        </p>

        {/* Category jump links */}
        <nav className="flex flex-wrap gap-3 mt-8" aria-label="Jump to section">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="text-sm font-mono text-gray-500 dark:text-gray-400
                hover:text-ink dark:hover:text-cream
                border border-gray-200 dark:border-gray-700 rounded-full
                px-3 py-1 transition-colors duration-150
                hover:border-gray-400 dark:hover:border-gray-500"
            >
              {cat.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-8 pb-24 space-y-20">
        {categories.map((category, catIndex) => (
          <section
            key={category.id}
            id={category.id}
            className="animate-fade-slide-up scroll-mt-8"
            style={{ animationDelay: `${catIndex * 60}ms` }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                {category.items.length} item{category.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            {category.description && (
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl">
                {category.description}
              </p>
            )}
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <SetupItemCard
                  key={itemIndex}
                  item={item}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
