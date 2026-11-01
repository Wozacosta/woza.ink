import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlueskyComments } from "./BlueskyComments";

const POST_URL = "https://bsky.app/profile/woza.ink/post/abc";
const THREAD_POST = "app.bsky.feed.defs#threadViewPost";

function reply(text: string, facets: unknown[] = []) {
  return {
    $type: THREAD_POST,
    post: {
      uri: `at://did:plc:reader/app.bsky.feed.post/${text.length}`,
      author: { did: "did:plc:reader", handle: "reader.test", displayName: 'Rea"der' },
      record: { text, createdAt: "2026-11-01T12:00:00.000Z", facets },
    },
  };
}

function mockThread(replies: unknown[], threadgate?: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ thread: { $type: THREAD_POST, replies }, threadgate }),
    }),
  );
}

describe("BlueskyComments", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("links to the thread and asks for the post's replies", async () => {
    mockThread([]);
    render(<BlueskyComments postUrl={POST_URL} />);

    expect(screen.getByRole("link", { name: /Reply on Bluesky/ })).toHaveProperty("href", POST_URL);
    expect(await screen.findByText("No replies yet.")).toBeTruthy();
    expect(vi.mocked(fetch).mock.calls[0][0]).toContain(
      encodeURIComponent("at://woza.ink/app.bsky.feed.post/abc"),
    );
  });

  it("renders reply content as text, never as HTML", async () => {
    const payload = '<img src=x onerror="alert(1)">';
    mockThread([reply(payload)]);
    const { container } = render(<BlueskyComments postUrl={POST_URL} />);

    expect(await screen.findByText(payload)).toBeTruthy();
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText('Rea"der')).toBeTruthy();
  });

  it("doesn't link a javascript: URL", async () => {
    mockThread([
      reply("click me", [
        {
          index: { byteStart: 0, byteEnd: 8 },
          features: [{ $type: "app.bsky.richtext.facet#link", uri: "javascript:alert(1)" }],
        },
      ]),
    ]);
    const { container } = render(<BlueskyComments postUrl={POST_URL} />);

    await screen.findByText("click me");
    expect(container.querySelector('a[href^="javascript"]')).toBeNull();
  });

  it("leaves out replies hidden on Bluesky", async () => {
    const hidden = reply("hide this one");
    mockThread([hidden, reply("keep")], { record: { hiddenReplies: [hidden.post.uri] } });
    render(<BlueskyComments postUrl={POST_URL} />);

    expect(await screen.findByText("keep")).toBeTruthy();
    expect(screen.queryByText("hide this one")).toBeNull();
  });

  it("points back to Bluesky when loading fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<BlueskyComments postUrl={POST_URL} />);

    expect(await screen.findByText(/Couldn't load replies/)).toBeTruthy();
  });
});
