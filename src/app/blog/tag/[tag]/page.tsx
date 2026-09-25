import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/data/blog";
import { PostList } from "@/components/PostList";

// Only tags used by at least one post have a page
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

function findTag(slug: string) {
  return getAllTags().find((tag) => tag.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = findTag((await params).tag);
  if (!tag) return {};
  return {
    title: `#${tag.label} — woza.ink`,
    description: `${tag.count} post${tag.count !== 1 ? "s" : ""} tagged #${tag.label} on woza.ink`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = findTag((await params).tag);
  if (!tag) notFound();

  const posts = getPostsByTag(tag.slug);

  return (
    <main className="min-h-screen">
      <header className="py-16 px-8 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
        >
          &larr; All posts
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          #{tag.label}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-mono mt-3">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        <PostList posts={posts} />
      </section>
    </main>
  );
}
