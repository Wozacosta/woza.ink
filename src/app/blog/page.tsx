import Link from "next/link";
import { getAllPosts, getAllSeries, getAllTags } from "@/data/blog";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { TagBadge } from "@/components/TagBadge";
import { AUTHOR, NOTEBOOK_TITLE } from "@/lib/site";

export const metadata = {
  title: `${NOTEBOOK_TITLE} — woza.ink`,
  description:
    "Notes on crypto protocols, AI-assisted coding, developer tools and the things I build, written by AI from my research. My own takes are marked.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const series = getAllSeries();

  return (
    <>
      <PageHeader
        title={NOTEBOOK_TITLE}
        description="Notes on crypto protocols, AI-assisted coding and the tools I use."
        meta={`${posts.length} post${posts.length !== 1 ? "s" : ""}`}
      >
        <section
          id="how-its-written"
          aria-label="How this is written"
          className="mt-6 scroll-mt-24 rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted"
        >
          <p>
            <span className="font-medium text-fg">How this is written.</span> AI writes most of
            what&apos;s here, from my notes, questions and research. I pick the topics and steer
            it, but the wording is the AI&apos;s, including where it says &ldquo;I&rdquo;. My own
            words are marked as takes:
          </p>
          <aside className="take !mb-1 !mt-3 !py-3 text-sm">
            <p className="take-label">{AUTHOR.name}&apos;s take</p>
            <p>Words in a box like this are mine, not the AI&apos;s.</p>
          </aside>
        </section>
        {tags.length > 0 && (
          // One swipeable row on phones, wrapped from sm up
          <nav
            aria-label="Tags"
            className="scroll-row -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {tags.map((tag) => (
              <span key={tag.slug} className="shrink-0">
                <TagBadge tag={tag.label} count={tag.count} link />
              </span>
            ))}
          </nav>
        )}
      </PageHeader>

      {series.length > 0 && (
        <section aria-labelledby="series" className="mx-auto max-w-3xl px-5 pb-10 sm:px-8">
          <h2 id="series" className="font-mono text-xs uppercase tracking-widest text-subtle">
            Series
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {series.map(({ slug, title, description, count, wipCount }) => (
              <li key={slug}>
                <Link
                  href={`/blog/series/${slug}`}
                  className="block h-full rounded-xl border border-line p-4 transition-colors hover:border-line-strong hover:bg-surface"
                >
                  <span className="font-semibold text-fg">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{description}</span>
                  <span className="mt-2 block font-mono text-xs text-subtle">
                    {count} post{count !== 1 ? "s" : ""}
                    {wipCount > 0 && `, ${wipCount} in progress`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {posts.length === 0 ? (
          <p className="py-12 text-center text-muted">No posts yet...</p>
        ) : (
          <PostList posts={posts} />
        )}
      </section>
    </>
  );
}
