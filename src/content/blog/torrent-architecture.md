---
title: "BitTorrent: The Protocol That Refuses to Die"
date: "2026-03-22"
description: "How BitTorrent actually works — peers, pieces, choking, DHT, magnet links — and why a 23-year-old protocol is still the best way to move large files across the internet."
tags: ["web", "protocols", "decentralized", "open-source"]
---

# BitTorrent: The Protocol That Refuses to Die

Every few years someone declares BitTorrent dead. Streaming killed it. Cloud storage killed it. The lawsuits killed it. And yet: 170 million monthly active users. Every major Linux distribution ships official torrent files. Blizzard used peer-to-peer distribution for World of Warcraft patches. The protocol Bram Cohen sketched out in 2001 is still, in 2026, the most efficient way to move a large file from one place to many.

This is how it works. Not the hand-wavy version — the actual architecture.

---

## The core idea

HTTP puts all upload cost on the server. One machine, serving one file, to thousands of clients. The more popular the file, the more bandwidth the server bleeds. BitTorrent inverts this: the more people downloading, the faster it gets.

The trick is simple. A file gets split into pieces — typically 256KB to 4MB each. Every downloader who has a piece can upload it to others. You don't wait for the whole file before you start helping. The moment you have a single piece, you're part of the supply chain.

This is peer-to-peer in the purest sense. No central server holds the file. The swarm is the server.

---

## The vocabulary

**Peers** are everyone participating in a transfer. **Seeders** have the complete file and only upload. **Leechers** are still downloading — they have some pieces but not all. A **swarm** is the full set of peers sharing a particular torrent.

**Trackers** are coordination servers. They don't host files. They just maintain a list of which peers are in a given swarm. Your client contacts the tracker, gets a list of peers, and connects to them directly. The tracker never sees the file content.

**DHT** (Distributed Hash Table) removes even the tracker. Peers themselves form a distributed lookup network — based on Kademlia — where you can find other peers for a given infohash without any central server. This is what makes "trackerless" torrents work.

**Magnet links** are the logical endpoint of this evolution. A magnet link is just a URI containing the infohash — the SHA1 hash of the torrent's metadata. Your client takes that hash, queries the DHT, finds peers, downloads the metadata from them, and starts the transfer. No .torrent file needed. No tracker needed. Just a 40-character hash.

---

## The protocol under the hood

BitTorrent's genius isn't just "split file, share pieces." It's the incentive design. Bram Cohen's 2003 paper, "Incentives Build Robustness in BitTorrent," laid out the game theory that makes the whole thing work.

### Piece selection: rarest first

When your client needs to decide which piece to download next, it picks the rarest one — the piece fewest peers in the swarm currently have. This is counterintuitive. You might think downloading common pieces first would be safer. But rarest-first ensures that rare pieces get replicated quickly, preventing bottlenecks where everyone has the same 90% and nobody has the last 10%.

A 2006 INRIA paper confirmed this: rarest first and the choke algorithm alone are sufficient to achieve near-optimal piece diversity and download performance. The simplicity is the point.

One exception: when you first join a swarm with zero pieces, rarest-first is too slow (rare pieces have few sources). So new peers use **random first piece** selection to get their first few pieces quickly. Once you have something to trade, you switch to rarest-first.

### Choking and tit-for-tat

Here's the game theory. BitTorrent uses a **tit-for-tat** reciprocity model. Each peer maintains a set of connections and decides who to upload to based on who uploads to them.

The mechanism is called **choking**. At any given time, your client "chokes" most peers — meaning it refuses to upload to them. It "unchokes" a small number (typically 4) based on who's giving you the best download rates. Every 10 seconds, it recalculates.

This creates a natural incentive: if you want fast downloads, you need to upload. Free-riders who only leech get choked by everyone and end up with terrible speeds. It's the prisoner's dilemma, solved through repeated interaction.

There's also **optimistic unchoking**: every 30 seconds, your client randomly unchokes one peer regardless of their contribution. This serves two purposes — it gives new peers a chance to bootstrap (they have nothing to trade yet), and it lets you discover faster peers you haven't tried.

```
Every 10s: unchoke top 4 peers by upload-to-me rate
Every 30s: optimistically unchoke 1 random peer
Everyone else: choked (no upload from you)
```

### The handshake and wire protocol

Two BitTorrent peers connect over TCP. The handshake includes the protocol identifier, the infohash (so both sides confirm they're talking about the same torrent), and each peer's 20-byte ID.

After the handshake, communication happens through a simple message protocol:

- `bitfield` — "here are the pieces I have"
- `have` — "I just got piece #N"
- `interested` / `not interested` — "I want something you have" / "I don't"
- `choke` / `unchoke` — "I'm not uploading to you" / "I will now"
- `request` — "send me block X of piece Y"
- `piece` — the actual data

It's remarkably minimal. The entire wire protocol fits in a few pages of spec.

---

## The evolution

### Phase 1: .torrent files and trackers (2001-2005)

The original model. You'd find a .torrent file on a website, open it in your client, and your client would contact the tracker listed in the file to find peers. The tracker was a single point of failure — take it down, and the swarm can't find new peers.

This era gave birth to the iconic torrent sites. It also gave copyright holders a clear target: the trackers.

### Phase 2: DHT and trackerless torrents (2005-2008)

BEP 5 introduced the Mainline DHT in 2005. Based on the Kademlia distributed hash table, it let peers find each other without a centralized tracker. Millions of BitTorrent clients now form one of the largest DHTs ever deployed — measurements showed 16 to 28 million concurrent nodes by 2013.

The tracker became optional. Even if every tracker went down, existing swarms could survive through DHT.

### Phase 3: Magnet links (2008-2012)

BEP 9 enabled peers to exchange torrent metadata over the wire protocol itself. Combined with DHT, this meant you could start a download from nothing but a 40-character hash encoded in a magnet URI. No .torrent file, no tracker, no website hosting metadata. Just a link.

Magnet links made BitTorrent nearly impossible to shut down at the infrastructure level. The Pirate Bay famously switched to magnet-only in 2012, dropping .torrent file hosting entirely.

### Phase 4: BEP extensions and modern clients (2012-present)

The protocol kept evolving through the BEP (BitTorrent Enhancement Proposal) process:

- **BEP 29** — uTorrent transport protocol (uTP), a UDP-based transport that plays nicer with home routers and ISP throttling
- **BEP 10** — extension protocol, allowing clients to negotiate capabilities
- **BEP 27** — private torrents, disabling DHT and peer exchange for controlled swarms
- **BitTorrent v2** (BEP 52) — SHA-256 hashes, per-file Merkle trees, better deduplication

---

## Where torrents live today

The piracy narrative dominated BitTorrent's public perception for 15 years. That story obscured the legitimate infrastructure built on top of the protocol.

**Linux distributions.** Ubuntu, Fedora, Arch, Debian — they all offer official torrent downloads. For a new release that millions of people want simultaneously, BitTorrent is the obvious distribution mechanism. It offloads mirror bandwidth to the community.

**Game distribution.** Blizzard's downloader used peer-to-peer. So did early Steam updates. When you're pushing a 50GB patch to millions of players at once, CDNs are expensive. Peer-to-peer is not.

**Scientific datasets.** Academic institutions distribute large datasets via torrent. The Internet Archive hosts thousands of torrents. When a file is measured in terabytes and the audience is global, HTTP doesn't scale economically.

**WebTorrent.** Created by Feross Aboukhadijeh, WebTorrent implements BitTorrent over WebRTC, making it work natively in browsers. No plugins, no extensions. A website can serve video via torrent connections between viewers. Brave browser ships with WebTorrent built in.

**IPFS lineage.** IPFS borrowed heavily from BitTorrent — content-addressing, Merkle trees, distributed hash tables, swarming. The key evolution: IPFS addresses individual blocks by content hash rather than grouping everything under one infohash, enabling deduplication across datasets. BitTorrent is the ancestor; IPFS is the mutation that tried to build a permanent web.

---

## Why it still matters

BitTorrent solved a hard problem elegantly: distribute a large file to many recipients without bankrupting the source. The solution was not better servers. It was turning every consumer into a producer.

Twenty-three years later, nothing has replaced it for this specific job. CDNs are fast but expensive. Cloud storage is convenient but centralized. HTTP downloads create a linear relationship between popularity and cost. BitTorrent creates an inverse one.

The protocol also demonstrated something about system design that holds up: you don't need altruism for cooperation. You need aligned incentives. Tit-for-tat, rarest-first, and optimistic unchoking are not complicated algorithms. They're simple rules that produce emergent cooperation in a network of self-interested participants. Bram Cohen didn't build a charity. He built a market.

That design philosophy — make selfishness productive — influenced everything from blockchain consensus mechanisms to federated protocol design. It's the reason BitTorrent works without moderators, without terms of service, without anyone in charge. The protocol is the governance.

BitTorrent accounts for roughly 3% of global internet traffic today, down from 35% at its peak. But that 3% moves data that nothing else handles as well. The protocol didn't die. It just became infrastructure — invisible, reliable, and still the fastest way to get a 4GB ISO from zero to done.

---

## Further reading

- [BEP index](https://www.bittorrent.org/beps/bep_0000.html) — the full list of BitTorrent Enhancement Proposals
- [Incentives Build Robustness in BitTorrent](https://bittorrent.org/bittorrentecon.pdf) — Bram Cohen's 2003 paper, short and readable
- [Rarest First and Choke Algorithms Are Enough](https://arxiv.org/abs/cs/0609026) — the 2006 INRIA paper validating the core algorithms
- [WebTorrent](https://webtorrent.io/) — BitTorrent over WebRTC for browsers
- [Mainline DHT (BEP 5)](https://www.bittorrent.org/beps/bep_0005.html) — the distributed hash table spec
- [IPFS comparisons](https://docs.ipfs.tech/concepts/comparisons/) — how IPFS relates to and differs from BitTorrent
