"use client";

import { useEffect, useState } from "react";
import { atUriToPostUrl, fetchReplies, splitFacets, type BlueskyReply } from "@/lib/bluesky";
import { formatDate } from "@/lib/format";

type Comments =
  | { status: "loading" }
  | { status: "failed" }
  | { status: "loaded"; replies: BlueskyReply[] };

function Reply({ reply }: { reply: BlueskyReply }) {
  const { author, record, uri } = reply.post;

  return (
    <li>
      <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
        <a
          href={`https://bsky.app/profile/${encodeURIComponent(author.handle)}`}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
          className="font-semibold text-fg transition-colors hover:text-muted"
        >
          {author.displayName || author.handle}
        </a>
        <a
          href={atUriToPostUrl(uri, author.handle)}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
          className="font-mono text-xs text-subtle transition-colors hover:text-fg"
        >
          {formatDate(record.createdAt)}
        </a>
      </p>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted">
        {splitFacets(record.text, record.facets).map(({ text, href }, index) =>
          href ? (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow ugc"
              className="underline transition-colors hover:text-fg"
            >
              {text}
            </a>
          ) : (
            text
          ),
        )}
      </p>
      {reply.replies.length > 0 && (
        <ReplyList replies={reply.replies} className="mt-4 border-l border-line pl-4" />
      )}
    </li>
  );
}

function ReplyList({ replies, className }: { replies: BlueskyReply[]; className: string }) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {replies.map((reply) => (
        <Reply key={reply.post.uri} reply={reply} />
      ))}
    </ul>
  );
}

/** Replies to a post's Bluesky thread, fetched in the browser so new ones show without a rebuild */
export function BlueskyComments({ postUrl }: { postUrl: string }) {
  const [comments, setComments] = useState<Comments>({ status: "loading" });

  useEffect(() => {
    let current = true;
    fetchReplies(postUrl)
      .then((replies) => current && setComments({ status: "loaded", replies }))
      .catch(() => current && setComments({ status: "failed" }));
    return () => {
      current = false;
    };
  }, [postUrl]);

  return (
    <section aria-labelledby="comments-heading" className="mt-8 rounded-xl border border-line p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="comments-heading" className="font-mono text-xs uppercase tracking-widest text-subtle">
          Comments
        </h2>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-fg transition-colors hover:text-muted"
        >
          Reply on Bluesky ↗
        </a>
      </div>
      {comments.status === "loading" && <p className="mt-4 text-sm text-subtle">Loading replies…</p>}
      {comments.status === "failed" && (
        <p className="mt-4 text-sm text-subtle">Couldn&apos;t load replies. They&apos;re still on Bluesky.</p>
      )}
      {comments.status === "loaded" && comments.replies.length === 0 && (
        <p className="mt-4 text-sm text-subtle">No replies yet.</p>
      )}
      {comments.status === "loaded" && comments.replies.length > 0 && (
        <ReplyList replies={comments.replies} className="mt-4" />
      )}
    </section>
  );
}
