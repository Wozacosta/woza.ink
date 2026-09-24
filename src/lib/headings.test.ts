import { describe, it, expect } from "vitest";
import { addHeadingIds } from "./headings";

describe("addHeadingIds", () => {
  it("adds ids and collects h2/h3 only", () => {
    const { html, headings } = addHeadingIds(
      "<h1>Title</h1><h2>Intro</h2><h3>Sub <code>x</code></h3><h4>Deep</h4>",
    );
    expect(html).toContain('<h2 id="intro">Intro</h2>');
    expect(html).toContain('<h4 id="deep">Deep</h4>');
    expect(headings).toEqual([
      { id: "intro", text: "Intro", level: 2 },
      { id: "sub-x", text: "Sub x", level: 3 },
    ]);
  });

  it("decodes entities in TOC text", () => {
    const { headings } = addHeadingIds("<h2>Signal &amp; Telegram: what&#39;s next</h2>");
    expect(headings[0]).toEqual({
      id: "signal-telegram-whats-next",
      text: "Signal & Telegram: what's next",
      level: 2,
    });
  });

  it("dedupes repeated headings", () => {
    const { html, headings } = addHeadingIds("<h2>Setup</h2><h2>Setup</h2><h3>Setup</h3>");
    expect(headings.map((h) => h.id)).toEqual(["setup", "setup-1", "setup-2"]);
    expect(html).toContain('<h3 id="setup-2">');
  });

  it("ignores headings that only exist inside code blocks", () => {
    const { headings } = addHeadingIds(
      "<pre><code>## not a heading</code></pre><h2>Real</h2>",
    );
    expect(headings.map((h) => h.id)).toEqual(["real"]);
  });
});
