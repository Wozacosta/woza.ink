import Link from "next/link";
import { getAllPosts } from "@/data/blog";

export default function BlogPage() {
  const posts = getAllPosts();

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
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Thoughts, ideas, and things I'm learning
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            No posts yet...
          </p>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <time className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-2xl font-semibold mt-2 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
