import Link from "next/link";
import { getAllPosts, getAllTags } from "@/data/blog";
import { PostList } from "@/components/PostList";
import { TagBadge } from "@/components/TagBadge";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

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
        {tags.length > 0 && (
          <nav aria-label="Tags" className="flex gap-2 flex-wrap mt-6">
            {tags.map((tag) => (
              <TagBadge key={tag.slug} tag={tag.label} count={tag.count} link />
            ))}
          </nav>
        )}
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            No posts yet...
          </p>
        ) : (
          <PostList posts={posts} />
        )}
      </section>
    </main>
  );
}
