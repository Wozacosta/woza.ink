import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getAllSlugs, getAdjacentPosts, getReadTime } from "@/data/blog";
import { addHeadingIds } from "@/lib/headings";
import { injectSidenoteMarkers, orderByPosition } from "@/lib/sidenotes";
import { renderMarkdown, stripLeadingH1 } from "@/lib/render";
import { formatDate } from "@/lib/format";
import { AUTHOR, SITE_TITLE, SITE_URL } from "@/lib/site";
import { TagBadge } from "@/components/TagBadge";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { Sidenotes } from "@/components/Sidenotes";
import { Endnotes } from "@/components/Endnotes";
import { JsonLd } from "@/components/JsonLd";
import { InteractiveDiagrams } from "@/components/InteractiveDiagrams";
import { getSidenotes } from "@/data/sidenotes";

// Only pre-rendered slugs are valid; unknown slugs 404 without touching the filesystem
export const dynamicParams = false;

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
    alternates: {
      canonical: `/blog/${slug}`,
      types: { "text/markdown": `/blog/${slug}.md` },
    },
    openGraph: {
      siteName: SITE_TITLE,
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      url: `/blog/${slug}`,
    },
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

  const { html: withIds, headings } = addHeadingIds(
    stripLeadingH1(await renderMarkdown(post.content)),
  );
  const { prev, next } = getAdjacentPosts(slug);
  const readTime = getReadTime(post.content);
  const articleSidenotes = getSidenotes(slug);
  const orderedNotes = orderByPosition(withIds, articleSidenotes?.notes ?? []);
  const contentHtml = injectSidenoteMarkers(withIds, orderedNotes);
  const notes = orderedNotes.map((note) => ({
    ...note,
    html: marked.parseInline(note.content, { async: false }),
  }));
  const url = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url,
          mainEntityOfPage: url,
          image: `${url}/opengraph-image`,
          keywords: post.tags.join(", "),
          wordCount: post.content.trim().split(/\s+/).length,
          author: { "@type": "Person", name: AUTHOR.name, url: `${SITE_URL}/about` },
          publisher: { "@type": "Organization", name: SITE_TITLE, url: SITE_URL },
        }}
      />
      <ReadingProgress />

      <div className="article-layout">
        {/* ── Left: Table of Contents (lg and up) ── */}
        <aside className="hidden pt-16 lg:block">
          <div className="scrollbar-thin sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <TableOfContents headings={headings} />
          </div>
        </aside>

        {/* ── Center: Article ── */}
        <article className="min-w-0">
          <header className="pb-8 pt-8 sm:pb-12 sm:pt-16">
            <Link
              href="/blog"
              className="inline-block font-mono text-xs uppercase tracking-widest text-subtle transition-colors hover:text-fg"
            >
              ← Blog
            </Link>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-subtle">
              <time dateTime={post.date} className="uppercase tracking-wide">
                {formatDate(post.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readTime} min read</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} link />
              ))}
            </div>
            {post.description && (
              <p className="mt-6 max-w-2xl border-t border-line pt-6 text-lg leading-relaxed text-muted">
                {post.description}
              </p>
            )}

            {/* Phones and tablets: collapsible contents */}
            {headings.length > 2 && (
              <details className="group mt-6 rounded-lg border border-line lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-widest text-subtle [&::-webkit-details-marker]:hidden">
                  On this page
                  <span aria-hidden="true" className="transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <ol className="space-y-1 border-t border-line px-4 py-3 text-[15px]">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a href={`#${h.id}`} className="block py-1.5 text-muted hover:text-fg">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
          </header>

          <div
            className="prose prose-base max-w-none prose-drop-cap sm:prose-lg
              prose-headings:scroll-mt-6 prose-headings:font-bold prose-headings:tracking-tight"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <InteractiveDiagrams />

          <Endnotes notes={notes} />

          <div className="flex justify-end pb-4">
            <a
              href="#main"
              className="font-mono text-xs text-subtle transition-colors hover:text-fg"
            >
              ↑ back to top
            </a>
          </div>

          {(prev || next) && (
            <nav
              aria-label="More posts"
              className="mt-8 grid grid-cols-1 gap-6 border-t border-line pb-20 pt-8 sm:grid-cols-2 sm:gap-8"
            >
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group">
                  <span className="font-mono text-xs uppercase tracking-widest text-subtle">
                    ← Newer
                  </span>
                  <p className="mt-1 line-clamp-2 font-semibold text-fg transition-colors group-hover:text-muted">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group sm:text-right">
                  <span className="font-mono text-xs uppercase tracking-widest text-subtle">
                    Older →
                  </span>
                  <p className="mt-1 line-clamp-2 font-semibold text-fg transition-colors group-hover:text-muted">
                    {next.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </article>

        {/* ── Right: Sidenotes (absolutely positioned to match marker Y) ── */}
        <aside className="relative hidden pt-16 xl:block" data-sidenotes>
          <Sidenotes notes={notes} />
        </aside>
      </div>
    </>
  );
}
