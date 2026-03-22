import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getAllSlugs, getAdjacentPosts, getReadTime } from "@/data/blog";
import { extractHeadings, addHeadingIds } from "@/lib/headings";
import { injectSidenoteMarkers } from "@/lib/sidenotes";
import { TagBadge } from "@/components/TagBadge";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { Sidenotes } from "@/components/Sidenotes";
import { getSidenotes } from "@/data/sidenotes";

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — woza.ink`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rawHtml = await marked(post.content);
  const withIds = addHeadingIds(rawHtml);
  const headings = extractHeadings(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const readTime = getReadTime(post.content);
  const articleSidenotes = getSidenotes(slug);
  const contentHtml = articleSidenotes
    ? injectSidenoteMarkers(withIds, articleSidenotes.notes)
    : withIds;

  return (
    <main className="min-h-screen">
      <ReadingProgress />

      <div className="article-layout">
        {/* ── Left: Table of Contents ── */}
        <aside className="hidden lg:block pt-16">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
            <TableOfContents headings={headings} />
          </div>
        </aside>

        {/* ── Center: Article ── */}
        <div className="min-w-0">
          <header className="py-16">
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
            >
              &larr; Back to Blog
            </Link>
            <div className="flex items-center gap-3 mt-4">
              <time className="text-xs text-gray-400 dark:text-gray-500 font-mono tracking-wide uppercase">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                {readTime} min read
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
              {post.title}
            </h1>
            <div className="flex gap-2 flex-wrap mt-4">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            {post.description && (
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-6 max-w-2xl leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-6">
                {post.description}
              </p>
            )}
          </header>

          <article className="pb-12">
            <div
              className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-drop-cap
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-ink dark:prose-a:text-cream prose-a:underline prose-a:decoration-dotted
                prose-a:decoration-gray-400 prose-a:underline-offset-2 hover:prose-a:decoration-solid
                prose-code:before:content-none prose-code:after:content-none
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded
                prose-code:px-1 prose-code:py-0.5 prose-code:text-sm
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                dark:prose-blockquote:border-gray-600 prose-blockquote:not-italic
                prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          <div className="pb-4 flex justify-end">
            <a
              href="#"
              className="text-xs font-mono text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              ↑ back to top
            </a>
          </div>

          {(prev || next) && (
            <nav className="pb-24 mt-8 flex justify-between gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group flex-1">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono uppercase tracking-widest">
                    ← Newer
                  </span>
                  <p className="mt-1 font-semibold group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group flex-1 text-right">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono uppercase tracking-widest">
                    Older →
                  </span>
                  <p className="mt-1 font-semibold group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {next.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* ── Right: Sidenotes (absolutely positioned to match marker Y) ── */}
        <aside className="hidden xl:block pt-16 relative">
          {articleSidenotes && <Sidenotes notes={articleSidenotes.notes} />}
        </aside>
      </div>
    </main>
  );
}
