import Link from "next/link";
import { getAllPosts, getReadTime } from "@/data/blog";
import { TagBadge } from "@/components/TagBadge";

export default function BlogPage() {
  const posts = getAllPosts();

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
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Thoughts, ideas, and things I&apos;m learning
        </p>
        {posts.length > 0 && (
          <p className="text-sm text-gray-400 dark:text-gray-500 font-mono mt-3">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        )}
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            No posts yet...
          </p>
        ) : (
          <div className="space-y-2">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group animate-fade-slide-up rounded-xl p-6 -mx-6
                  border border-transparent
                  hover:bg-gray-50 dark:hover:bg-gray-900/50
                  hover:border-gray-200 dark:hover:border-gray-700/60
                  transition-all duration-300"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3">
                    <time className="text-xs text-gray-400 dark:text-gray-500 font-mono tracking-wide uppercase">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {getReadTime(post.content)} min read
                    </span>
                  </div>
                  <h2
                    className={`font-semibold mt-2 dark:text-gray-100 transition-colors
                      relative inline-block
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:w-0 after:h-[2px] after:bg-ink dark:after:bg-cream
                      after:transition-[width] after:duration-300
                      group-hover:after:w-full
                      ${index === 0 ? "text-3xl" : "text-2xl"}`}
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                    <span
                      className="text-xs font-mono text-gray-400 dark:text-gray-500
                        opacity-0 group-hover:opacity-100
                        -translate-x-2 group-hover:translate-x-0
                        transition-all duration-300"
                    >
                      Read more →
                    </span>
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
