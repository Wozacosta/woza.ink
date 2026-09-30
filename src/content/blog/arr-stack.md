---
title: "The *arr Stack: How Self-Hosted Media Automation Actually Works"
date: "2026-09-30"
description: "Sonarr, Radarr, Prowlarr, Seerr and friends: what each piece does, how they talk to each other, why hardlinks matter, and where the whole thing breaks."
tags: ["self-hosting", "open-source", "tools", "protocols"]
---

# The *arr Stack: How Self-Hosted Media Automation Actually Works

The name is a pirate joke. Sonarr, Radarr, Lidarr, Prowlarr: every app in the family ends in "arr", and nobody pretends that's an accident. What started in 2011 as a single tool called NzbDrone, which watched Usenet for new episodes of your shows, has grown into a dozen cooperating services that run on home servers, NAS boxes and rented seedboxes around the world.

It's probably the most elaborate piece of self-hosted software most people ever run. You say "I want this show, in 1080p, with English subtitles," and a pipeline of small programs finds it, downloads it, renames it, files it, fetches subtitles and tells your media server it's there. Nobody touches a file.

This is how the pieces fit together. Not the install guide: the architecture.

A word on legality before we start. The apps are ordinary open-source software, and there are legitimate uses: managing a library of discs you ripped yourself, public-domain film archives, Creative Commons releases. But most people point the stack at content they don't have the rights to, and in most countries that's illegal. This post is about how the system is designed, not about where to aim it.

---

## The pipeline in one picture

Every *arr setup, however elaborate, follows the same path:

```text
you ─request─▶ Seerr
                 │ adds the title
                 ▼
Prowlarr ─────▶ Sonarr / Radarr
 indexers        │ picks a release
                 ▼
          download client
                 │ when finished
                 ▼
         import + hardlink
                 │
         ┌───────┴───────┐
         ▼               ▼
   Jellyfin/Plex      Bazarr
   media server      subtitles
```

Each box is a separate program with its own web UI, database and REST API. They talk to each other over HTTP, authenticated with API keys. That's the whole trick: no shared database, no message bus, just small services that each own one job and call each other.

| Layer | Job | Apps |
| --- | --- | --- |
| Requests | Let people ask for things | Seerr |
| Managers | Know what you want and what you have | Sonarr (TV), Radarr (films), Lidarr (music) |
| Indexers | Know where to look | Prowlarr |
| Download clients | Move the bytes | qBittorrent, Transmission, SABnzbd, NZBGet |
| Media servers | Play it | Jellyfin, Plex, Emby |
| Extras | Fill the gaps | Bazarr, Recyclarr, Unpackerr |

---

## The managers: Sonarr, Radarr, Lidarr

The managers are the core. Each one keeps two lists: what you want (your watchlist, with a quality goal for each item) and what you have (the files on disk). Everything else in the stack exists to close the gap between those two lists.

**Sonarr** handles TV. It's the original, the NzbDrone project renamed in 2014, and still the most popular, with about 16,700 GitHub stars. **Radarr** started in 2016 as a fork of Sonarr for films. **Lidarr** did the same for music in 2017. They share a codebase lineage and an umbrella organization, Servarr, which is why their interfaces and settings look almost identical.

The managers don't know anything about shows or films on their own. They lean on metadata databases: Sonarr on TheTVDB, Radarr on TMDB, Lidarr on MusicBrainz. The metadata tells Sonarr that a show has five seasons, that season 2 has 13 episodes, and that episode 7 aired on a given date. Without it, Sonarr can't know what "missing" means.

TV is the hard case, which is why Sonarr is the most complex of the three. Films are one file each. Shows have seasons, specials, double episodes, and different numbering depending on who you ask. Anime is worse: many releases use absolute episode numbers ("episode 147") while TheTVDB uses seasons. Sonarr keeps mapping tables to translate between the two.

---

## The part everyone gets wrong: they don't search

Here's the counterintuitive bit. Once you've added a show, Sonarr does not go looking for missing episodes. Not every hour, not every day.

What it does instead is watch. Every 15 minutes by default (configurable between 10 and 120), it pulls the RSS feed of every indexer you've connected, which lists everything newly uploaded. It compares each new release against its list of wanted episodes. If something matches and meets your quality rules, it grabs it.

The Servarr wiki puts it bluntly: Sonarr will only find releases that are newly uploaded to your indexers. It won't go back for the past on its own.

This design makes sense once you see the load it avoids. A library of 200 shows has thousands of episodes. Searching every indexer for every missing episode on a schedule would hammer the indexers, get you rate-limited or banned, and mostly return nothing. Watching the feed of new uploads is cheap and catches almost everything going forward.

The catch is the backlog. When you add a show, you have to tick "Start search for missing episodes" or click search yourself. Forget, and those older episodes stay missing forever. This gap is exactly why third-party "hunter" tools became popular: they trickle searches for missing items through the API at a polite rate. More on how one of them ended, below.

---

## Prowlarr: one place for indexers

The managers need indexers to watch and search. An **indexer** is a searchable catalogue of releases: a Usenet indexer (which points at posts on Usenet servers) or a torrent tracker's search. Each one has its own API, its own categories, its own login.

Early on, you configured every indexer separately in every manager. Three managers and eight indexers meant 24 configurations to keep in sync. **Jackett** fixed part of this by acting as a proxy that translated dozens of tracker sites into one standard API (Torznab), but you still had to add each Jackett feed to each manager by hand.

**Prowlarr** (2020) finished the job. You add indexers once, in Prowlarr, and it pushes them to Sonarr, Radarr and Lidarr through their APIs. It only syncs each indexer to the apps whose categories it supports, so a music-only indexer never shows up in Radarr. Change an API key in Prowlarr and every manager gets the update.

Some indexer sites sit behind Cloudflare's bot protection, which blocks plain HTTP clients. For those, Prowlarr can route requests through **FlareSolverr**, a small service that runs a headless browser to pass the challenge and hand back the page.

---

## Deciding what to grab: profiles and custom formats

A single episode might exist in thirty versions on an indexer, and release names encode what each one is:

```text
Show.Name.S02E05.1080p.WEB-DL.DDP5.1.H.264-GROUP
Show.Name.S02E05.2160p.WEB-DL.DV.HDR.DDP5.1.Atmos.H.265-GROUP
Show.Name.S02E05.720p.HDTV.x264-GROUP
```

Resolution, source (web, Blu-ray, broadcast), codec, HDR format, audio format, and the release group that made it. The managers parse all of this, and two layers of rules decide which version wins.

**Quality profiles** set the floor and the goal. "Accept anything from 720p to 1080p, and stop upgrading once I have 1080p Web-DL." If the first release to appear is 720p, the manager grabs it. When a better one shows up later, it grabs that too and replaces the file. That's an upgrade, and it happens automatically until the cutoff is reached.

**Custom formats** add scoring on top. Each one is a set of conditions matched against the release name ("contains DV or HDR10", "audio is Atmos", "release group is on this list") with a score. A release's total score decides between versions of the same quality, and a negative score can ban something outright. Radarr had them first (and reworked them in v3); Sonarr added them in v4.

Writing good custom formats is fiddly, so almost nobody does it from scratch. The **TRaSH Guides** are a community-maintained set of recommended profiles, custom formats and scores. **Recyclarr** is a command-line tool that syncs them into your Sonarr and Radarr instances from a YAML file, so when the guides update, your setup follows.

---

## The handoff: download clients and imports

The managers don't download anything. When they pick a release, they send it to a **download client**: qBittorrent, Transmission or Deluge for torrents, SABnzbd or NZBGet for Usenet. The release is tagged with a category (`tv-sonarr`, `radarr`) so each manager knows which downloads belong to it.

Then the manager waits, polling the client's API. When a download finishes, **Completed Download Handling** kicks in: the manager checks the files, renames them to your naming scheme (`Show Name - S02E05 - Episode Title [WEBDL-1080p].mkv`), puts them in the right season folder, and tells the media server to rescan.

If the download is a pile of RAR archives, which is common on Usenet and some trackers, **Unpackerr** watches for it and extracts it before the import.

---

## Hardlinks: the detail that makes or breaks it

With torrents there's a conflict. The download client wants to keep seeding the file from the download folder, often for weeks. The manager wants the file in your library with a clean name. Copying it wastes double the disk space. Moving it breaks seeding.

The answer is a **hardlink**: a second directory entry pointing at the same data on disk. The file appears in both `/data/torrents/tv/...` under its release name and in `/data/media/tv/Show Name/Season 02/` under its clean name, but it exists once. Delete the torrent after seeding and the library copy is untouched. Space used: one file.

Hardlinks only work within a single filesystem. That's why the TRaSH Guides insist on one root folder, typically:

```text
/data
├── torrents/   tv/  movies/  music/
├── usenet/     tv/  movies/  music/
└── media/      tv/  movies/  music/
```

...mounted into every container as the same `/data` path. Get this right and imports are instant: a hardlink for torrents, an atomic move for Usenet. Get it wrong, say by mounting `/downloads` and `/tv` as separate volumes in Docker, and every import turns into a full copy. It's slow, it doubles disk usage, and nothing warns you. The Servarr wiki notes that many common import issues come down to bad Docker paths and permissions. This is the single most common mistake in the whole stack.

---

## The edges: Seerr, Bazarr and the media server

**Seerr** is the front door for everyone who isn't you. Family and friends browse a catalogue that looks like a streaming service, click "Request," and Seerr adds the title to Sonarr or Radarr with the right profile. It used to be two projects: Overseerr for Plex, and Jellyseerr, its fork for Jellyfin and Emby. In February 2026 they merged into Seerr, one codebase supporting all three servers, and the Overseerr repository was archived.

**Bazarr** handles subtitles. It reads your Sonarr and Radarr libraries, searches subtitle providers in the languages you choose, and downloads them next to each file. When a release is upgraded, Bazarr fetches subtitles that match the new version's timing.

The **media server** is the part your family sees. **Plex** is the polished commercial option. In April 2025 it put remote streaming of your own media behind a paywall (a Plex Pass for the server owner, or a $1.99/month Remote Watch Pass per viewer) and more than doubled the lifetime pass, from $120 to $249.99. **Jellyfin** is the free, open-source alternative, with no account required and no paywalled features. At 57,000 GitHub stars it's the most popular project anywhere in this ecosystem, and the Plex changes pushed a lot of people toward it. **Emby** sits in between: Jellyfin forked from it in 2018 when Emby went closed source.

---

## Where it breaks

**Metadata is a single point of failure.** Every manager depends on an outside database to know what exists. When that goes, the app goes with it. **Readarr**, the ebook and audiobook manager, was retired in June 2025: its metadata source had become unusable, and the team didn't have time to rebuild it. The repository is archived. **Lidarr** came close to the same fate the month before: a MusicBrainz schema change in May 2025 broke its metadata server, and volunteers had to rebuild it while searches failed. The *arr apps are only as healthy as their least-maintained dependency.

**Add-ons hold the keys to everything.** Every connected app needs the others' API keys, and an *arr API key is full admin access. In February 2026 a security review of **Huntarr**, one of those popular backlog-hunting add-ons, found 21 issues. The worst was an unauthenticated endpoint that returned the settings of every connected app in cleartext, including all their API keys. The developer deleted the repositories and went offline, and users were told to take it down and rotate every key. The lesson generalizes: each tool you plug in is trusted with the whole stack.

**None of it should face the internet.** These web UIs were built for a home network. If you need remote access, put them behind a VPN like Tailscale or WireGuard, or a reverse proxy with real authentication, not an open port.

---

## Why it's worth understanding

Strip away what it's used for and the *arr stack is a neat piece of systems design.

It's **declarative**. You don't tell it to download episode 5. You declare what you want ("this show, 1080p, these formats preferred") and a reconciliation loop works to make reality match, continuously, including upgrading files you already have. That's the same idea as a Kubernetes controller or Terraform, applied to a media library.

It's **composed of small services** with narrow jobs, talking over plain HTTP APIs. You can swap qBittorrent for Transmission or Plex for Jellyfin without touching anything else. When Overseerr and Jellyseerr merged, nothing downstream had to change.

And it's **event-driven where it counts**. Watching RSS feeds instead of polling for every missing item is what lets it scale to huge libraries without melting the indexers it depends on.

Fifteen years after NzbDrone, the pattern holds: state what you want, let small programs work out how to get there, and keep one clean folder structure underneath. It's a good model for more than media.

---

## Further reading

- [Servarr Wiki](https://wiki.servarr.com/): official docs for Sonarr, Radarr, Lidarr and Prowlarr. Start with Sonarr's FAQ on how it finds episodes
- [TRaSH Guides](https://trash-guides.info/): folder structure, hardlinks, quality profiles and custom formats
- [Recyclarr](https://recyclarr.dev/): sync TRaSH Guides into Sonarr and Radarr
- [Seerr release announcement](https://docs.seerr.dev/blog/seerr-release/): why Overseerr and Jellyseerr merged
- [Huntarr security review](https://github.com/rfsbraz/huntarr-security-review/blob/main/Huntarr.io_SECURITY_REVIEW.md): the full list of findings
- [BitTorrent: The Protocol That Refuses to Die](/blog/torrent-architecture): how the transfer layer underneath actually works
