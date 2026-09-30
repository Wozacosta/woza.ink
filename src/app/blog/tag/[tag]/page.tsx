import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/data/blog";
import { PageHeader } from "@/components/PageHeader";
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
    <>
      <PageHeader
        title={`#${tag.label}`}
        meta={
          <>
            <Link href="/blog" className="underline decoration-dotted underline-offset-4 hover:text-fg">
              All posts
            </Link>
            {" · "}
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </>
        }
      />

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <PostList posts={posts} />
      </section>
    </>
  );
}
