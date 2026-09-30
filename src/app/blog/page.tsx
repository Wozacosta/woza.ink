import { getAllPosts, getAllTags } from "@/data/blog";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { TagBadge } from "@/components/TagBadge";

export const metadata = {
  title: "Blog — woza.ink",
  description:
    "Writing on crypto protocols, AI-assisted coding, developer tools and the things I build.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Thoughts, ideas, and things I'm learning."
        meta={`${posts.length} post${posts.length !== 1 ? "s" : ""}`}
      >
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
