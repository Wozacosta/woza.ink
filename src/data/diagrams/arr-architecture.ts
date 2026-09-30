import type { InteractiveDiagramConfig } from "./types";

export const arrArchitecture: InteractiveDiagramConfig = {
  tourLabel: "Follow an episode",
  intro: "Tap a box to see what it does, or follow one episode from request to playback.",
  nodes: [
    {
      id: "seerr",
      title: "Seerr",
      description:
        "The front door. Family and friends browse a streaming-style catalogue and click Request; Seerr adds the title to Sonarr or Radarr with the right quality profile. Overseerr and Jellyseerr merged into Seerr in February 2026.",
      links: ["managers"],
    },
    {
      id: "indexers",
      title: "Indexers",
      description:
        "Searchable catalogues of releases: Usenet indexers and torrent trackers. They're outside services, each with its own API, categories and login. Their RSS feeds list everything newly uploaded.",
      links: ["prowlarr"],
    },
    {
      id: "prowlarr",
      title: "Prowlarr",
      description:
        "Add each indexer once and Prowlarr pushes it to every manager over their APIs, only where the categories fit. It can route Cloudflare-protected sites through FlareSolverr.",
      links: ["indexers", "managers"],
    },
    {
      id: "managers",
      title: "Sonarr, Radarr, Lidarr",
      description:
        "The core. Each keeps a want list with a quality goal and compares it to the files on disk. Every 15 minutes it reads the indexers' RSS feeds, scores matching releases with quality profiles and custom formats, and grabs the best one.",
      links: ["seerr", "prowlarr", "download"],
    },
    {
      id: "download",
      title: "Download client",
      description:
        "qBittorrent or Transmission for torrents, SABnzbd or NZBGet for Usenet. It only moves bytes. Each download carries a category, like tv-sonarr, so each manager knows which ones are its own.",
      links: ["managers", "import"],
    },
    {
      id: "import",
      title: "Import",
      description:
        "Completed Download Handling: the manager renames the file, files it in the right season folder and hardlinks it into /data/media, so torrents keep seeding from the original. It only stays instant if everything lives on one filesystem.",
      links: ["download", "media", "bazarr"],
    },
    {
      id: "media",
      title: "Jellyfin or Plex",
      description:
        "The part your family sees. It scans the library, fetches artwork and streams to every screen. Jellyfin is free and open source; Plex put remote streaming behind a paywall in April 2025.",
      links: ["import"],
    },
    {
      id: "bazarr",
      title: "Bazarr",
      description:
        "Reads the Sonarr and Radarr libraries and downloads subtitles in the languages you choose. When a release is upgraded, it fetches subtitles that match the new file's timing.",
      links: ["import"],
    },
  ],
  steps: [
    {
      text: "You ask for a show in Seerr.",
      nodes: ["seerr"],
      edges: [],
    },
    {
      text: "Seerr adds it to Sonarr with a quality profile. Sonarr now knows which episodes it wants.",
      nodes: ["seerr", "managers"],
      edges: ["seerr-managers"],
    },
    {
      text: "Prowlarr has already given Sonarr your indexers, so there's nothing to configure per show.",
      nodes: ["prowlarr", "managers"],
      edges: ["prowlarr-managers"],
    },
    {
      text: "A new episode is uploaded. Within 15 minutes Sonarr sees it in an indexer's RSS feed, through Prowlarr.",
      nodes: ["indexers", "prowlarr", "managers"],
      edges: ["indexers-prowlarr", "prowlarr-managers"],
    },
    {
      text: "It matches the want list and scores highest, so Sonarr sends it to the download client.",
      nodes: ["managers", "download"],
      edges: ["managers-download"],
    },
    {
      text: "Sonarr polls the client until the download finishes.",
      nodes: ["download", "managers"],
      edges: ["download-managers"],
    },
    {
      text: "The import renames the file and hardlinks it into /data/media. The torrent keeps seeding from the original.",
      nodes: ["download", "import"],
      edges: ["download-import"],
    },
    {
      text: "Jellyfin picks up the new episode and Bazarr fetches subtitles. You press play.",
      nodes: ["import", "media", "bazarr"],
      edges: ["import-media", "import-bazarr"],
    },
  ],
};
