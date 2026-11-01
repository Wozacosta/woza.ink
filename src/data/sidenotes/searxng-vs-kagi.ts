import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "searxng-vs-kagi",
  notes: [
    {
      marker: "Google and Startpage are both off by default now",
      type: "source",
      content:
        "From SearXNG's settings.yml on November 1, 2026. Google has been disabled since July 5 and Startpage since September 10. You can still turn either back on in your own settings.",
      url: "https://github.com/searxng/searxng/blob/master/searx/settings.yml",
    },
    {
      marker: "Google's ad-syndication deal",
      type: "note",
      content:
        "That's Kagi describing a competitor, in a post where it explains why it can't take the same deal: results have to stay in Google's presentation and come with ads.",
      url: "https://blog.kagi.com/waiting-dawn-search",
    },
    {
      marker: "with two exclamation marks",
      type: "counter",
      content:
        "A `!!` bang sends your browser straight to that site, so it isn't private. The docs say so: \"SearXNG cannot protect your privacy with this.\" A single `!` picks an engine and stays inside SearXNG.",
      url: "https://docs.searxng.org/user/search-syntax.html",
    },
    {
      marker: "run the container",
      type: "note",
      content:
        "Use the official docs for this. The searxng-docker repo linked from the video is now marked as superseded, with new installs pointed at the docs.",
      url: "https://github.com/searxng/searxng-docker",
    },
    {
      marker: "workaround through Google's custom search widget",
      type: "note",
      content:
        "It generates a token from a public custom search ID belonging to blackle.com, and the code calls it a Custom Search Engine. Users reported failures and poor results within weeks. Kagi notes that Google's programmable search has a reduced scope, built for search boxes on websites.",
      url: "https://github.com/searxng/searxng/issues/6524",
    },
    {
      marker: "pretending to be a Nokia phone",
      type: "context",
      content:
        "The fix was one commit, \"[fix] google: use Nokia UA\". The next day an issue reported Google blocking that user agent too, and a reply said it still worked if the connection also impersonated Chrome, because Google was now inspecting TLS.",
      url: "https://github.com/searxng/searxng/issues/6570",
    },
    {
      marker: "put a proof-of-work wall",
      type: "note",
      content:
        "Startpage added Anubis, the tool many sites adopted to slow down AI crawlers. SearXNG wrote a solver, but the difficulty was high enough that a maintainer said it shouldn't \"be on for everyone anymore by default.\"",
    },
    {
      marker: "Off by default for at least three years",
      type: "source",
      content:
        "It's disabled in the oldest version of the settings file I checked, from August 2023. I didn't trace it further back.",
    },
    {
      marker: "75,692 members and about 878,600 queries a day",
      type: "context",
      content:
        "Plus 10,193 families and 397 teams, on November 1, 2026.",
    },
    {
      marker: "moving to close the back door",
      type: "context",
      content:
        "Kagi's line is that Google built its index \"before robots.txt was a widespread norm\" and now enforces those rules on others. It would rather pay: \"We would happily pay market rates for clean, contractual access.\"",
      url: "https://blog.kagi.com/waiting-dawn-search",
    },
    {
      marker: "the server can verify that a client has paid",
      type: "counter",
      content:
        "It unlinks a search from your account. It doesn't hide the query from Kagi, which still has to answer it, and your IP is a separate problem. That's why Kagi pairs it with Tor.",
    },
    {
      marker: "some customers have left over it",
      type: "quote",
      content:
        "\"Yandex represents about 2% of our total costs and is only one of dozens of sources we use. [...] The world doesn't need another politicized search engine.\"",
      attribution: "Kagi's CEO, quoted July 2025",
      url: "https://ounapuu.ee/posts/2025/07/17/kagi/",
    },
    {
      marker: "CJ just vibe coded one",
      type: "note",
      content:
        "The video says the existing server had about 400 stars in February. It has over 1,300 now.",
    },
    {
      marker: "Google has appealed",
      type: "source",
      content:
        "The final judgment came in December 2025 and the appeal in January 2026. I'm relying on secondary coverage for those dates. A district court order can be narrowed on appeal, so treat the terms above as provisional.",
    },
    {
      marker: "leaving it room to replead part of them",
      type: "counter",
      content:
        "The court gave Google 21 days to refile the part covering copyrighted content. The docket shows a later motion to dismiss an amended complaint, so the case is still alive. I couldn't confirm how that motion ended.",
      url: "https://www.courtlistener.com/docket/72059948/google-llc-v-serpapi-llc/",
    },
  ],
};
