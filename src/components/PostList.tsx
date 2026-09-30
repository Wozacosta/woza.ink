import Link from "next/link";
import { type BlogPost, getReadTime } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/TagBadge";

/** Only the first few cards animate in; the rest are simply there */
const ANIMATED_CARDS = 6;

export function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-2">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className={`group rounded-xl border border-transparent p-5 transition-colors duration-300
            -mx-5 hover:border-line hover:bg-surface sm:-mx-6 sm:p-6
            ${index < ANIMATED_CARDS ? "animate-fade-slide-up" : ""}`}
          style={index < ANIMATED_CARDS ? { animationDelay: `${index * 60}ms` } : undefined}
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="flex items-center gap-3 font-mono text-xs text-subtle">
              <time dateTime={post.date} className="uppercase tracking-wide">
                {formatDate(post.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{getReadTime(post.content)} min read</span>
            </div>
            <h2
              className={`relative mt-2 inline font-semibold text-fg
                bg-gradient-to-r from-current to-current bg-[length:0%_2px] bg-left-bottom bg-no-repeat
                transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]
                ${index === 0 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
            >
              {post.title}
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{post.description}</p>
          </Link>
          {/* Tags link to their own pages, so they sit outside the card link */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} link />
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="hidden shrink-0 font-mono text-xs text-subtle opacity-0 transition-all duration-300
                -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
            >
              Read more →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
