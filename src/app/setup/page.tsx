import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
      <div className="group border border-line rounded-lg p-4 hover:border-line-strong hover:bg-surface transition-all duration-200">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-subtle">
            <PostIcon />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/blog/${post.slug}`}
                className="font-medium text-fg hover:text-fg transition-colors"
              >
                {post.title}
              </Link>
              <span className="text-xs font-mono text-subtle bg-surface px-1.5 py-0.5 rounded">
                my post
              </span>
            </div>
            {item.note && (
              <p className="mt-2 text-sm text-muted leading-relaxed border-l-2 border-line pl-3 italic">
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
      <div className="group border border-line rounded-lg p-4 hover:border-line-strong hover:bg-surface transition-all duration-200">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-subtle">
            <VideoIcon />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-fg hover:text-fg transition-colors"
              >
                {item.title}
                <ExternalIcon />
              </a>
              {item.channel && (
                <span className="text-xs text-subtle font-mono">
                  {item.channel}
                </span>
              )}
            </div>
            {item.note && (
              <p className="mt-2 text-sm text-muted leading-relaxed border-l-2 border-line pl-3 italic">
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
    <div className="group border border-line rounded-lg p-4 hover:border-line-strong hover:bg-surface transition-all duration-200">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-subtle">
          <ArticleIcon />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg hover:text-fg transition-colors"
            >
              {item.title}
              <ExternalIcon />
            </a>
            {(item.source || item.author) && (
              <span className="text-xs text-subtle font-mono">
                {item.author ? `${item.author}` : ""}
                {item.author && item.source ? " · " : ""}
                {item.source ? item.source : ""}
              </span>
            )}
          </div>
          {item.note && (
            <p className="mt-2 text-sm text-muted leading-relaxed border-l-2 border-line pl-3 italic">
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
    <>
      <PageHeader
        title="Setup"
        description="My DX setup: the tools I use and the thinking behind them. Articles, videos, and my own notes."
      >
        {/* Category jump links: one swipeable row on phones */}
        <nav
          aria-label="Jump to section"
          className="scroll-row -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 rounded-full border border-line px-3.5 py-1.5 font-mono text-sm text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
            >
              {cat.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-3xl space-y-16 px-5 pb-24 sm:space-y-20 sm:px-8">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-8">
            <div className="mb-2 flex items-baseline gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
              <span className="font-mono text-xs text-subtle">
                {category.items.length} item{category.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            {category.description && (
              <p className="mb-6 max-w-xl text-muted">{category.description}</p>
            )}
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <SetupItemCard key={itemIndex} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
