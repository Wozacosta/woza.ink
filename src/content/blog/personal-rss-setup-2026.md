---
title: "My RSS Setup in 2026"
date: "2026-03-14"
description: "The reader, the feeds, and the workflow I actually use. Opinionated and practical."
tags: ["rss", "productivity", "tools", "setup"]
---

# My RSS Setup in 2026

I wrote about [what RSS is and why it matters](/blog/what-is-rss). This is the follow-up: what I actually use, what I subscribe to, and how I've structured it so I read things rather than accumulate them.

---

## The reader: NetNewsWire

[NetNewsWire](https://netnewswire.com/) on macOS and iOS. Free, open source, native. It's fast in a way that Electron-based readers aren't. Syncs via iCloud so my read state carries across devices without a separate account.

There are more powerful readers — [Inoreader](https://www.inoreader.com/) has better filtering and automation, [Miniflux](https://miniflux.app/) is the right choice if you want to self-host and own the backend. I've used both. For my workflow, NetNewsWire is enough and the friction is lower.

If you're on Android or want a web interface, NetNewsWire doesn't work. [Feedly](https://feedly.com/) is the easiest starting point in that case.

---

## How I've organized feeds

I use folders, but not many. The goal is to keep things simple enough that I actually open the reader rather than avoiding it because the unread count is overwhelming.

**Tech** — engineering blogs, developer tools, language/framework release notes. High volume. I skim this aggressively.

**Thinking** — longer essays, independent writers, people who publish infrequently but carefully. Lower volume. I read these properly.

**News** — a couple of outlets, topic-filtered. I deliberately keep this small. RSS is great for news but the rabbit hole is real.

**Releases** — GitHub release feeds for tools I use actively. These are pure signal: something I use shipped a new version.

That's it. Four folders. Everything else I've tried — more granular categorization, smart folders, rules — added overhead without improving what I actually read.

---

## Feeds worth subscribing to

Some I've found reliably worth reading:

**Engineering and tools:**
- [Dan Luu](https://danluu.com/atom.xml) — careful empirical takes on software engineering; low frequency, always worth it
- [Julia Evans](https://jvns.ca/atom.xml) — explains technical concepts in ways that actually land; consistently good
- [Simon Willison's Weblog](https://simonwillison.net/atom/everything/) — high volume, broad AI/web/tools coverage; good for staying oriented
- [Changelog](https://changelog.com/feed) — engineering podcast feed; I listen to maybe 20% of episodes but the titles are a useful signal

**Independent writing:**
- [Maggie Appleton](https://maggieappleton.com/rss.xml) — design, technology, and how they shape thinking; essays worth taking seriously
- [Robin Rendle](https://www.robinrendle.com/feed.xml) — web design, typography, craft; short and precise

**Releases:**
- GitHub release feeds: `https://github.com/{owner}/{repo}/releases.atom` — just swap in any repo you care about. I have these for neovim, Ghostty, and a few other tools.

---

## What I don't use RSS for

**Twitter/X threads and social posts.** The format doesn't translate. RSS gives you chronological full-text; most social content is designed around reactions and threading. I don't try to bridge these.

**YouTube.** YouTube has RSS feeds (`https://www.youtube.com/feeds/videos.xml?channel_id={id}`) and they work, but I've found that the discovery mechanism for video is different. I watch YouTube in YouTube; I read RSS in my reader.

**Newsletters.** Some newsletters have RSS feeds; many don't. For the ones that don't, I use a separate email address. I try not to mix inbox and reader — different reading modes, different attention levels.

---

## The discipline part

The hardest part of RSS isn't setup. It's not letting the unread count become a to-do list.

A few things that help:

**Mark all as read without guilt.** If I haven't opened my reader in a few days and there are 300 unread items, I mark all read and start fresh. The articles aren't going anywhere; the good ones surface again through other means. Feeling behind is worse than missing something.

**Prune regularly.** Every few months I go through subscriptions and delete anything I've been consistently skipping. The signal-to-noise ratio of a feed degrades over time as publications change focus or increase volume. Unsubscribe early.

**Read, then close.** I try not to have the reader open as a background tab I check compulsively. I open it, read for 15-20 minutes, close it. RSS works best as a scheduled reading session, not a notification system.

---

## OPML

All of this is exportable as [OPML](https://opml.org/) — a standard format for subscription lists. Every serious reader supports it. Export from NetNewsWire, import to Miniflux, nothing is lost.

This is the portability promise of RSS that social platforms can't match. My subscription list isn't locked to a platform. It's a file.

---

## Further reading

- [What is RSS?](/blog/what-is-rss) — the explainer if you're new to RSS
- [NetNewsWire](https://netnewswire.com/) — free, open source, Mac and iOS
- [Miniflux](https://miniflux.app/) — if you want to self-host
- [Inoreader](https://www.inoreader.com/) — if you want filtering and automation
