import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "personal-rss-setup-2026",
  notes: [
    {
      marker: "[NetNewsWire](https://netnewswire.com/) on macOS and iOS. Free, open source, native.",
      type: "context",
      content:
        "NetNewsWire has a storied history. Created by Brent Simmons in 2002, it was the most popular desktop RSS reader on any platform by 2005 (per FeedBurner stats). It changed hands twice — NewsGator in 2005, Black Pixel in 2011 — before Simmons reacquired it in 2018 and re-released it as free, open-source software. NetNewsWire 7 for Mac shipped in January 2026.",
      attribution: "Brent Simmons / Ranchero Software",
      url: "https://en.wikipedia.org/wiki/NetNewsWire",
    },
    {
      marker: "Four folders. Everything else I've tried",
      type: "note",
      content:
        "The four-folder approach maps well to a known pattern in information management: separating by *urgency* and *depth*. \"Releases\" is high-urgency/low-depth (act on it now). \"Thinking\" is low-urgency/high-depth (read carefully when ready). Keeping categories to four or fewer avoids the overhead of maintaining the system itself — a common failure mode where the organization becomes more work than the reading.",
    },
    {
      marker: "more granular categorization, smart folders, rules — added overhead without improving what I actually read",
      type: "counter",
      content:
        "Some power users take the opposite approach: hundreds of feeds, aggressive filtering rules, and keyword-based \"must-read\" tags. Inoreader users, for example, often build complex rule chains (\"if title contains X and source is Y, star and push to Pocket\"). The tradeoff: more signal extraction, but the system requires maintenance and the rules themselves can become a source of information anxiety.",
      url: "https://www.feedbucket.com/2026/02/18/master-your-rss-feed-how-to-organize-subscriptions-and-eliminate-clutter/",
    },
    {
      marker: "Some I've found reliably worth reading",
      type: "note",
      content:
        "Dan Luu, Julia Evans, and Simon Willison are consistently cited as some of the best technical blogs on the internet. Luu's posts are famously data-driven and contrarian; Evans makes complex topics accessible through zines and visual explanations; Willison publishes at extraordinary volume while maintaining quality — his blog is effectively a public research log for AI tooling and open data.",
    },
    {
      marker: "The hardest part of RSS isn't setup",
      type: "context",
      content:
        "\"Mark All as Read\" is identified as both the cure and the cause of RSS burnout. It solves the immediate anxiety of a mounting unread count, but can create guilt about missed content. The solution most experienced RSS users converge on: treat your reader like a river, not a queue. You dip in, read what's there, and move on. You were never going to read all of it.",
      url: "https://zapier.com/blog/how-to-use-rss-feeds/",
    },
    {
      marker: "exportable as [OPML](https://opml.org/) — a standard format for subscription lists",
      type: "context",
      content:
        "OPML (Outline Processor Markup Language) was created by Dave Winer in 2000 — the same person behind RSS 2.0. It was originally the native file format for Radio UserLand's outliner app, but its most enduring use turned out to be RSS subscription portability. Winer has pushed for \"subscribable OPML\" — OPML files hosted at a URL that apps can follow for automatic updates, like an RSS feed of RSS feeds.",
      attribution: "Dave Winer",
      url: "https://medium.com/@davewiner/what-is-an-opml-subscription-list-ddf50332ad8d",
    },
  ],
};
