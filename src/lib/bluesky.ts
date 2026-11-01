/** Just enough of Bluesky's thread types to render replies. Everything here is untrusted input. */
export type BlueskyFacet = {
  index: { byteStart: number; byteEnd: number };
  features: { $type: string; uri?: string; did?: string; tag?: string }[];
};

export type BlueskyPost = {
  uri: string;
  author: { did: string; handle: string; displayName?: string };
  record: { text: string; createdAt: string; facets?: BlueskyFacet[] };
};

export type BlueskyReply = { post: BlueskyPost; replies: BlueskyReply[] };

export type TextSegment = { text: string; href?: string };

type ThreadNode = {
  $type: string;
  post?: BlueskyPost;
  replies?: ThreadNode[];
};

type ThreadResponse = {
  thread: ThreadNode;
  threadgate?: { record?: { hiddenReplies?: string[] } };
};

const API = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread";
const POST_URL = /^https:\/\/bsky\.app\/profile\/([^/]+)\/post\/([^/?#]+)$/;
const THREAD_POST = "app.bsky.feed.defs#threadViewPost";
const REPLY_DEPTH = 4;

export function isBlueskyPostUrl(url: string): boolean {
  return POST_URL.test(url);
}

export function postUrlToAtUri(url: string): string | null {
  const match = url.match(POST_URL);
  return match && `at://${match[1]}/app.bsky.feed.post/${match[2]}`;
}

export function atUriToPostUrl(uri: string, handle: string): string {
  const rkey = uri.split("/").pop() ?? "";
  return `https://bsky.app/profile/${encodeURIComponent(handle)}/post/${encodeURIComponent(rkey)}`;
}

/** Only web links survive: a reply can put any string in a link, including javascript: URLs */
function safeHref(uri: string | undefined): string | undefined {
  if (!uri) return undefined;
  try {
    const { protocol } = new URL(uri);
    return protocol === "https:" || protocol === "http:" ? uri : undefined;
  } catch {
    return undefined;
  }
}

function facetHref({ features }: BlueskyFacet): string | undefined {
  const [feature] = features;
  switch (feature?.$type) {
    case "app.bsky.richtext.facet#link":
      return safeHref(feature.uri);
    case "app.bsky.richtext.facet#mention":
      return feature.did && `https://bsky.app/profile/${encodeURIComponent(feature.did)}`;
    case "app.bsky.richtext.facet#tag":
      return feature.tag && `https://bsky.app/hashtag/${encodeURIComponent(feature.tag)}`;
    default:
      return undefined;
  }
}

/** Facets index UTF-8 bytes, not string positions, so emoji don't shift the links */
export function splitFacets(text: string, facets: BlueskyFacet[] = []): TextSegment[] {
  const bytes = new TextEncoder().encode(text);
  const decode = (start: number, end?: number) => new TextDecoder().decode(bytes.slice(start, end));
  const sorted = [...facets].sort((a, b) => a.index.byteStart - b.index.byteStart);

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const facet of sorted) {
    const { byteStart, byteEnd } = facet.index;
    const href = facetHref(facet);
    if (!href || byteStart < cursor || byteEnd <= byteStart || byteEnd > bytes.length) continue;
    if (byteStart > cursor) segments.push({ text: decode(cursor, byteStart) });
    segments.push({ text: decode(byteStart, byteEnd), href });
    cursor = byteEnd;
  }
  if (cursor < bytes.length) segments.push({ text: decode(cursor) });
  return segments;
}

/** Drops blocked and deleted replies, and any you hid on Bluesky, along with their children */
export function visibleReplies(nodes: ThreadNode[] = [], hidden: string[] = []): BlueskyReply[] {
  return nodes.flatMap((node) =>
    node.$type === THREAD_POST && node.post && !hidden.includes(node.post.uri)
      ? [{ post: node.post, replies: visibleReplies(node.replies, hidden) }]
      : [],
  );
}

export async function fetchReplies(postUrl: string): Promise<BlueskyReply[]> {
  const uri = postUrlToAtUri(postUrl);
  if (!uri) throw new Error(`Not a Bluesky post URL: ${postUrl}`);

  const params = new URLSearchParams({ uri, depth: String(REPLY_DEPTH), parentHeight: "0" });
  const response = await fetch(`${API}?${params}`);
  if (!response.ok) throw new Error(`Bluesky returned ${response.status}`);

  const { thread, threadgate } = (await response.json()) as ThreadResponse;
  return visibleReplies(thread.replies, threadgate?.record?.hiddenReplies);
}
