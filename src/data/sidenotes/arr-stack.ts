import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "arr-stack",
  notes: [
    {
      marker: "the NzbDrone project renamed in 2014",
      type: "context",
      content:
        "The rename was announced on 21 October 2014 after the community sent in more than 800 suggestions. Torrent support had been added, so the team wanted a name without **nzb** in it, and one that was easier to say than \"en-zee-bee-drone\".",
      url: "https://forums.sonarr.tv/t/the-application-formerly-known-as-nzbdrone-sonarr/2471",
    },
    {
      marker: "Every 15 minutes by default",
      type: "source",
      content:
        "The default lives in Sonarr's config service: `RssSyncInterval` falls back to 15. Setting it to 0 turns off RSS sync entirely, which stops all automatic grabbing.",
      url: "https://wiki.servarr.com/sonarr/settings",
    },
    {
      marker: "The Servarr wiki puts it bluntly",
      type: "quote",
      content:
        "\"Sonarr does *not* regularly search for episode files that are missing or have not met their quality goals.\"",
      attribution: "Servarr Wiki, Sonarr FAQ",
      url: "https://wiki.servarr.com/sonarr/faq",
    },
    {
      marker: "one standard API (Torznab)",
      type: "context",
      content:
        "Torznab is modelled on Newznab, the API Usenet indexers already spoke. Making torrent search look like Usenet search is what let the managers treat both the same way.",
    },
    {
      marker: "**Recyclarr** is a command-line tool",
      type: "note",
      content:
        "Recyclarr only supports Sonarr v4 and later, since custom formats didn't exist in Sonarr before that. It can manage several Sonarr and Radarr instances from one YAML file.",
      url: "https://recyclarr.dev/",
    },
    {
      marker: "In February 2026 they merged into Seerr",
      type: "source",
      content:
        "Overseerr's final commit landed on 15 February 2026 and the repository is now read-only. The Jellyseerr repository was renamed rather than archived, so its old address points at Seerr. Existing installs migrate automatically.",
      url: "https://docs.seerr.dev/blog/seerr-release/",
    },
    {
      marker: "more than doubled the lifetime pass, from $120 to $249.99",
      type: "source",
      content:
        "It was Plex Pass's first price increase in over 10 years: monthly went from $4.99 to $6.99 and yearly from $39.99 to $69.99. Remote Watch Pass launched on 29 April 2025.",
      url: "https://www.plex.tv/blog/important-2025-plex-updates/",
    },
    {
      marker: "the ebook and audiobook manager, was retired in June 2025",
      type: "context",
      content:
        "A community effort to move Readarr onto Open Library data stalled. Third-party metadata mirrors exist, but the Servarr team doesn't support them, and the project stays open to anyone willing to take it over.",
      url: "https://wiki.servarr.com/readarr/status",
    },
    {
      marker: "found 21 issues",
      type: "source",
      content:
        "The review rated 7 findings critical, 6 high, 5 medium and 2 as open-source best-practice issues. Affected users were told to take Huntarr offline and rotate the API keys of every connected app.",
      url: "https://github.com/rfsbraz/huntarr-security-review/blob/main/Huntarr.io_SECURITY_REVIEW.md",
    },
    {
      marker: "the same idea as a Kubernetes controller",
      type: "note",
      content:
        "A controller compares desired state with observed state and acts on the difference, over and over. It doesn't care how the gap appeared, which is why a deleted file or a missed release gets fixed the same way as a new request.",
    },
  ],
};
