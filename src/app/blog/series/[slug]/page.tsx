import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSeries, getPostsInSeries } from "@/data/blog";
import { getSeries } from "@/data/series";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";

// Only series with at least one post have a page
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSeries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) return {};
  return {
    title: `${series.title} — woza.ink`,
    description: series.description,
    alternates: { canonical: `/blog/series/${slug}` },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  const posts = getPostsInSeries(slug);

  return (
    <>
      <PageHeader
        title={series.title}
        description={series.description}
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
