---
title: "Standard.site: Publishing to the Atmosphere Without Leaving Your Domain"
date: "2026-11-01"
description: "A small set of AT Protocol schemas lets a self-hosted blog keep its domain and still show up across the network. How the records and the two-way check work, what you get, and what you don't."
tags: ["web", "decentralized", "publishing", "protocols"]
series: open-protocols
atUri: "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.document/3mzbwsui7vn2m"
blueskyPost: "https://bsky.app/profile/woza.ink/post/3mzbxrgltfk22"
---

# Standard.site: Publishing to the Atmosphere Without Leaving Your Domain

Every blog has the same trade-off. Publish on a platform and you get distribution but rent your audience. Publish on your own domain and you own everything, then watch nobody find it.

I hit this looking at [Leaflet](https://leaflet.pub/), a publishing app on the AT Protocol, and asking whether my posts should move there. They shouldn't. Sidenotes and diagrams wouldn't survive the trip, and copying posts to a second site is its own problem: Google [no longer recommends canonical tags](https://searchengineland.com/google-no-longer-recommends-canonical-tags-for-syndicated-content-406491) for syndicated copies, so the copy can outrank the original.

The better answer turned out to be the format Leaflet itself uses. Standard.site lets a blog stay exactly where it is and also exist on the network, with no second copy of the page to compete with.

---

## What it is

[Standard.site](https://standard.site/) is a set of Lexicons, which are the schemas that describe data on the AT Protocol. Bluesky's Lexicons describe posts and follows. These describe long-form writing.

It came from the people who needed it. [Leaflet, pckt and Offprint](https://atproto.com/blog/standard-site-bluesky-timeline) had each built similar schemas for the same job, so they agreed on one at the end of 2025. Bluesky wasn't involved: "no one at Bluesky knew it was coming."

There are four Lexicons, and two of them do most of the work:

- **`site.standard.publication`** describes the blog: its URL and name.
- **`site.standard.document`** describes one post: its title, path, date and tags.
- **`site.standard.graph.subscription`** records that someone follows a publication.
- **`site.standard.graph.recommend`** records that someone recommends a document.

The scope is deliberately narrow. The project says the Lexicons [focus on metadata](https://standard.site/), "what a publication is, what a document contains, and where it lives," and leaves content format to each platform.

---

## How the check works

These are ordinary records in your own AT Protocol repo, on your PDS, the server that holds your data. Here's a real document record from [Redowan Delowar's blog](https://rednafi.com/misc/standard-site/), trimmed:

```json
{
  "$type": "site.standard.document",
  "site": "at://did:plc:fgtm2c26vfcj74rfmeggbyqj/site.standard.publication/3mnl6f7ob462z",
  "path": "/go/patch-field-mask/",
  "title": "Partial updates with field masks",
  "tags": ["Go", "API"],
  "publishedAt": "2026-10-12T00:00:00.000Z"
}
```

`site` points at the publication record, and that record's URL plus this `path` gives the post's real address. So the original stays the original: the record doesn't replace the page, it describes it.

![The same record, joined up into a URL.](diagram:standard-site-address)

A record alone proves nothing, though, because anyone can write one claiming to be your site. So [verification](https://standard.site/docs/verification/) goes both ways:

![Your domain and your repo point at each other. The domain's well-known file and link tags name the AT-URI of each record. The records in your repo carry the site URL and path. A reader only trusts a record when both directions match.](diagram:standard-site-verify)

- **The publication.** Your domain serves its AT-URI at `/.well-known/site.standard.publication`.
- **Each document.** The post's HTML names its record in a `<link rel="site.standard.document">` tag.

An app that finds a record fetches that URL and checks that the answer matches. There's no registry and nobody to apply to. Controlling the domain and the repo is the proof.

---

## What you get

**Better links on Bluesky.** Since May 27, Bluesky gives Standard.site links an [enhanced preview](https://atproto.com/blog/standard-site-bluesky-timeline) with the publication and author, and that applies to "any site that creates a Standard.site record," not just the big apps.

**Discovery outside your own site.** Because records are public and share a format, anyone can index them. Standard.site [lists several readers and search engines](https://standard.site/docs/implementations/), including docs.surf, Read on pckt and pub search. Redowan reports that docs.surf lists their posts and a pckt search finds them.

**Portability.** The records live in your repo and aren't tied to a host. One of the project's stated principles is that users can move between hosts "without losing their content, audience, or metadata."

**Adoption outside the AT Protocol crowd.** WordPress released a plugin that writes a record for every post, and the AT Protocol blog says "thousands of sites" are publishing this way. For a schema that started as three small teams talking, that's quick.

There's also a route to comments. Documents have a `bskyPostRef` field that links a post to a Bluesky post, so replies there can be shown under the article.

---

## What you don't get

**Rich content doesn't travel.** The `textContent` field is plain text, and the `content` field is an open union that each platform fills its own way. My sidenotes and interactive diagrams stay on my site. That's fine, since the page is the point, but other apps get the words without the layout.

![What another app gets from the record.](diagram:standard-site-travels)

**It's less decentralized in practice.** The format is open, but the easiest path still runs through Bluesky: a Bluesky account for your identity, and often Bluesky's servers for your PDS. You can leave. Most people won't.

**Verification proves ownership, not quality.** It shows a record belongs to a domain, and that's all. Spam with a real domain passes.

**Public means public.** Your full text in `textContent` is readable by anyone, and indexers can keep copies after you delete a record. Sequoia, a CLI for static blogs, has a setting to leave the content out if that bothers you.

**Governance is light by design.** The stated model is "coordination through adoption, not committee." That's why it moved fast, and it also means there's no formal process if the implementers disagree.

---

## Adding it to this site

This blog is markdown files built by Next.js, which is the case [Sequoia](https://sequoia.pub/) was made for. It lists Next.js as supported, reads frontmatter, creates a document record per post and writes each record's `atUri` back into the file.

Two details differ from its default flow here. Its recommended `inject` step edits built HTML, but Vercel does the building, so the post page renders the `<link>` tag from `atUri` itself. And its draft flag needs mapping to `wip`, so unfinished posts stay off the network the same way they stay out of RSS.

The config is short:

```json
{
  "siteUrl": "https://www.woza.ink",
  "contentDir": "src/content/blog",
  "pathPrefix": "/blog",
  "publicationUri": "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.publication/3mzbwjfrek62i",
  "frontmatter": { "publishDate": "date", "draft": "wip" }
}
```

The identity was already there: `woza.ink` was my Bluesky handle, proven by a DNS record. So the rest came down to creating the publication record, writing its AT-URI to the well-known file, running `sequoia publish` with an app password, committing the new `atUri` lines and deploying. The first run created 35 records and skipped two drafts, one of which was this post.

![The whole loop, from a markdown file to a checked page.](diagram:standard-site-publish)

To check the result, I ran two posts through the [Standard.site validator](https://site-validator.fly.dev/). Both passed all 16 checks, from fetching the page to matching the well-known file. A small script then confirmed that all 35 live pages name the right record.

A few things are worth knowing if you do the same:

- **It isn't automatic.** Vercel doesn't publish records. A new post needs a Sequoia run and a commit, and an edited post needs another run to update its record.
- **Your full text goes out by default.** I left that on, because the words are already public and search needs them.
- **Bluesky posting is off.** Sequoia can announce each post on Bluesky, but I don't want publishing to post for me. So I post by hand, and a `blueskyPost` field in the frontmatter points this page's comments at that post. The records have no `bskyPostRef` yet.

The Bluesky preview works. Posting this article's link attached both records to the post, along with the publication and a reading time.

What I can't tell you yet is whether any of this brings readers. The records are brand new, so I don't know if the readers and search engines above will pick them up.
