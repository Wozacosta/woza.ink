import { describe, it, expect } from "vitest";
import {
  atUriToPostUrl,
  isBlueskyPostUrl,
  postUrlToAtUri,
  splitFacets,
  visibleReplies,
  type BlueskyFacet,
  type BlueskyPost,
} from "./bluesky";

const LINK = "app.bsky.richtext.facet#link";
const THREAD_POST = "app.bsky.feed.defs#threadViewPost";

function link(byteStart: number, byteEnd: number, uri: string): BlueskyFacet {
  return { index: { byteStart, byteEnd }, features: [{ $type: LINK, uri }] };
}

function post(uri: string): BlueskyPost {
  return {
    uri,
    author: { did: "did:plc:reader", handle: "reader.test" },
    record: { text: "hello", createdAt: "2026-11-01T12:00:00.000Z" },
  };
}

describe("post URLs", () => {
  const url = "https://bsky.app/profile/woza.ink/post/3mzbxrgltfk22";

  it("converts a post URL to its AT-URI", () => {
    expect(postUrlToAtUri(url)).toBe("at://woza.ink/app.bsky.feed.post/3mzbxrgltfk22");
  });

  it("rejects anything else", () => {
    expect(isBlueskyPostUrl(url)).toBe(true);
    expect(isBlueskyPostUrl("https://example.com/profile/woza.ink/post/abc")).toBe(false);
    expect(postUrlToAtUri("https://bsky.app/profile/woza.ink")).toBeNull();
  });

  it("builds a link back to a reply", () => {
    expect(atUriToPostUrl("at://did:plc:a/app.bsky.feed.post/xyz", "reader.test")).toBe(
      "https://bsky.app/profile/reader.test/post/xyz",
    );
  });
});

describe("splitFacets", () => {
  it("returns plain text when there are no facets", () => {
    expect(splitFacets("hello")).toEqual([{ text: "hello" }]);
  });

  it("indexes by UTF-8 bytes", () => {
    const text = "🙂 see example.com now";
    const start = new TextEncoder().encode("🙂 see ").length;
    const end = start + "example.com".length;

    expect(splitFacets(text, [link(start, end, "https://example.com")])).toEqual([
      { text: "🙂 see " },
      { text: "example.com", href: "https://example.com" },
      { text: " now" },
    ]);
  });

  it("never links an unsafe URL", () => {
    for (const uri of ["javascript:alert(1)", "data:text/html,x", "not a url"]) {
      expect(splitFacets("click me", [link(0, 5, uri)])).toEqual([{ text: "click me" }]);
    }
  });

  it("skips overlapping and out-of-range facets", () => {
    const facets = [link(0, 5, "https://a.test"), link(2, 4, "https://b.test"), link(4, 99, "https://c.test")];

    expect(splitFacets("hello you", facets)).toEqual([
      { text: "hello", href: "https://a.test" },
      { text: " you" },
    ]);
  });
});

describe("visibleReplies", () => {
  it("keeps nested replies", () => {
    const nodes = [
      { $type: THREAD_POST, post: post("a"), replies: [{ $type: THREAD_POST, post: post("b") }] },
    ];

    expect(visibleReplies(nodes)).toEqual([
      { post: post("a"), replies: [{ post: post("b"), replies: [] }] },
    ]);
  });

  it("drops blocked and deleted replies", () => {
    const nodes = [
      { $type: "app.bsky.feed.defs#blockedPost" },
      { $type: "app.bsky.feed.defs#notFoundPost" },
    ];

    expect(visibleReplies(nodes)).toEqual([]);
  });

  it("drops replies hidden on Bluesky, with their children", () => {
    const nodes = [
      { $type: THREAD_POST, post: post("a"), replies: [{ $type: THREAD_POST, post: post("b") }] },
      { $type: THREAD_POST, post: post("c") },
    ];

    expect(visibleReplies(nodes, ["a"])).toEqual([{ post: post("c"), replies: [] }]);
  });
});
