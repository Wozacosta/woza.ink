import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "what-is-rss",
  notes: [
    {
      heading: "what-does-rss-actually-stand-for",
      type: "context",
      content:
        "RSS has a tangled origin story. Netscape created the first version (RSS 0.9) in 1999 for My Netscape. Dave Winer, a pioneer of blogging and web syndication, developed a parallel branch that became RSS 0.91 and eventually RSS 2.0 (published August 2002). Meanwhile, a separate working group produced RSS 1.0 — co-authored by a 14-year-old Aaron Swartz, who would go on to co-found Reddit and become one of the internet's most influential activists.",
      attribution: "RSS Advisory Board",
      url: "https://www.rssboard.org/rss-history",
    },
    {
      heading: "what-does-rss-actually-stand-for",
      type: "note",
      content:
        "The \"enclosure\" element that enabled podcasting was added by Dave Winer in RSS 0.92. On January 11, 2001, he demonstrated it by enclosing a Grateful Dead song in his Scripting News weblog. This single XML tag later became the backbone of the entire podcasting ecosystem.",
      attribution: "Dave Winer",
      url: "https://en.wikipedia.org/wiki/Dave_Winer",
    },
    {
      heading: "why-rss-matters-in-human-terms",
      type: "quote",
      content:
        "\"Curation is freedom from the algorithm and the incentives of those who own and build them.\" The IndieWeb movement advocates for personal websites, human-written content, and a return to the time before algorithmic feeds — using RSS, webrings, and webmentions as the building blocks of a user-controlled web.",
      attribution: "Asad Rahman",
      url: "https://indieweb.org/why",
    },
    {
      heading: "a-punchy-hook-because-this-is-the-internet",
      type: "context",
      content:
        "Google Reader, arguably the most popular RSS reader ever built, was shut down on July 1, 2013. Many declared RSS dead that day. But as of 2025-2026, RSS is experiencing a quiet revival driven by growing dissatisfaction with algorithmic feeds. Users report that algorithm-driven interfaces make it harder to reach information that truly matters, while RSS readers display only chosen sources in chronological order.",
      url: "https://arekore.app/en/articles/rss-readers",
    },
    {
      heading: "pick-a-reader-options-for-different-vibes",
      type: "source",
      content:
        "According to BuiltWith, millions of websites still expose RSS feeds. The format remains the backbone of podcast distribution (every podcast app uses RSS under the hood), and platforms like Reddit, YouTube, and GitHub all offer RSS endpoints — even if they don't advertise them prominently.",
      url: "https://trends.builtwith.com/feeds/RSS",
    },
    {
      heading: "rss-and-privacy",
      type: "note",
      content:
        "RSS is inherently privacy-friendly by design: your reader makes an HTTP request for an XML file, and the server has no idea who you are beyond an IP address. Compare this with social media feeds, where every scroll, click, hover, and pause is tracked to build an advertising profile. Self-hosted readers like Miniflux take this further — your subscription list never leaves your own server.",
    },
    {
      heading: "final-thoughts-a-tiny-rant-challenge",
      type: "quote",
      content:
        "The IndieWeb is \"about personal websites, human-written content, and a fallback to a time before algorithms — a place to share your lives without feeding the pockets of big corporations.\" RSS is the protocol that makes this possible: an open standard that no single company controls.",
      attribution: "IndieWeb community",
      url: "https://indieweb.org/why",
    },
  ],
};
