import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getAllSlugs } from "@/data/blog";

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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

  const contentHtml = await marked(post.content);

  return (
    <main className="min-h-screen">
      <header className="py-16 px-8">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>
        <time className="block text-sm text-gray-400 dark:text-gray-500 font-mono mt-4">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
          {post.title}
        </h1>
        <div className="flex gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-8 pb-24">
        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
