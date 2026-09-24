import { describe, it, expect } from "vitest";
import { Marked } from "marked";
import { getAllPosts } from "@/data/blog";
import { getSidenotes } from "@/data/sidenotes";
import { injectSidenoteMarkers, locateMarker, markerText } from "./sidenotes";

const render = (md: string) => new Marked().parse(md) as string;
const note = (marker: string) => ({ marker, type: "note" as const, content: "" });

describe("markerText", () => {
  it("strips inline markdown", () => {
    expect(markerText("**bold** and *em* with `code` and [link](https://x.y)")).toBe(
      "bold and em with code and link",
    );
  });
});

describe("locateMarker", () => {
  it("matches across formatting and entities", () => {
    const html = render("It's **wallet-based identity** & `/dev/random` > rest");
    expect(locateMarker(html, "It's **wallet-based identity** & `/dev/random` >")).not.toBe(-1);
  });

  it("returns -1 when the text is absent", () => {
    expect(locateMarker(render("hello world"), "goodbye")).toBe(-1);
  });

  it("places the marker after closing inline tags", () => {
    const html = render("see **bold phrase** here");
    const out = injectSidenoteMarkers(html, [note("**bold phrase**")]);
    expect(out).toContain('</strong><sup class="sn-ref" data-sn="0">');
  });

  it("never nests the marker inside a link", () => {
    const html = render("read [the whole spec](https://example.com) today");
    const out = injectSidenoteMarkers(html, [note("the whole")]);
    expect(out).toContain('spec</a><sup class="sn-ref"');
  });

  it("matches markers that span a soft line break", () => {
    const html = render("first line\nsecond line");
    expect(locateMarker(html, "line second")).not.toBe(-1);
  });
});

describe("injectSidenoteMarkers", () => {
  it("numbers markers by note order regardless of position", () => {
    const html = render("alpha beta gamma");
    const out = injectSidenoteMarkers(html, [note("gamma"), note("alpha")]);
    expect(out.indexOf('data-sn="1"')).toBeLessThan(out.indexOf('data-sn="0"'));
    expect(out).toContain('href="#sn-1"');
    expect(out).toContain('href="#sn-2"');
  });
});

describe("sidenote data", () => {
  const posts = getAllPosts();

  it.each(posts.map((p) => [p.slug, p] as const))(
    "every marker in %s appears in the article",
    (slug, post) => {
      const sidenotes = getSidenotes(slug);
      if (!sidenotes) return;
      const html = render(post.content);
      const missing = sidenotes.notes
        .map((n, i) => ({ i: i + 1, marker: n.marker }))
        .filter(({ marker }) => locateMarker(html, marker) === -1);
      expect(missing).toEqual([]);
    },
  );
});
