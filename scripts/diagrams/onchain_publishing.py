"""Diagrams for the onchain publishing post. Run: python3 scripts/diagrams/onchain_publishing.py"""
from diagram_lib import *

# ── 1. The landscape, by where the writing lives ────────────────
s = Svg("publishing-landscape", 400, 428, "The platforms grouped by where the writing is stored. Company servers: Medium, Substack, Paragraph and Minds. Arweave: Paragraph if you opt in, and Mirror, now dead. IPFS and storage built on it: Lens, t2.world, stalled, and Subsocial. Their own chain or consensus layer: Hive, Steemit, taken over, DeSo and Farcaster. Bitcoin: Sigle. AT Protocol, which isn't onchain: Leaflet and pckt.blog")
s.text(20, 22, "Where the writing actually lives", "d-t")
s.text(20, 38, "Grouped by storage. The dot shows how each one is doing.", "d-s")
rows = [
    ("Company servers", [("Medium", "green"), ("Substack", "green"), ("Paragraph", "green"), ("Minds", "green")]),
    ("Arweave", [("Paragraph, opt-in", "green"), ("Mirror", "rose")]),
    ("IPFS and storage built on it", [("Lens", "green"), ("t2.world", "amber"), ("Subsocial", "green")]),
    ("Its own chain or consensus layer", [("Hive", "green"), ("Steemit", "amber"), ("DeSo", "green"), ("Farcaster", "green")]),
    ("Bitcoin", [("Sigle", "green")]),
    ("AT Protocol, not onchain", [("Leaflet", "green"), ("pckt.blog", "green")]),
]
y = 64
for label, chips in rows:
    s.text(20, y, label, "d-s")
    x = 20
    for title, acc in chips:
        w = round(len(title) * 7.2 + 34 + sum(title.count(c) for c in "MmWw") * 3)
        s.box(x, y + 8, w, 32, title, accent=acc)
        x += w + 5
    y += 56
for x, label, acc in ((26, "Live", "green"), (84, "Stalled or taken over", "amber"), (232, "Dead", "rose")):
    s.add(f'<circle cx="{x}" cy="{y - 2}" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 10, y + 2, label, "d-s")
s.render()

# ── 2. What survives when an app dies ───────────────────────────
s = Svg("publishing-portability", 400, 282, "On Medium the app, your followers and your posts are one thing, so they go together. On Lens, apps sit on a shared layer: followers onchain and posts on Grove. One app closing leaves that layer in place for the next app")
s.text(20, 22, "What's left when the app closes", "d-t")
s.text(20, 52, "Medium", "d-s")
s.add('<rect x="20" y="60" width="170" height="164" rx="8" class="d-ext"/>')
for i, title in enumerate(("The app", "Your followers", "Your posts")):
    s.box(34, 72 + i * 48, 142, 40, title, anchor="middle")
s.text(20, 246, "One company holds all three.", "d-s")
s.text(20, 262, "When it goes, they go.", "d-s d-rose d-ct")
s.text(210, 52, "An app on Lens", "d-s")
s.box(210, 60, 80, 40, "App A", dashed=True, anchor="middle")
s.box(300, 60, 80, 40, "App B", accent="green", anchor="middle")
s.add('<line x1="250" y1="100" x2="250" y2="136" class="d-line d-faint" stroke-dasharray="4 3"/>')
s.arrow([(340, 100), (340, 134)])
s.text(258, 121, "closes", "d-s d-rose d-ct")
s.add('<rect x="210" y="136" width="170" height="88" rx="8" class="d-box"/>')
s.add('<circle cx="224" cy="154" r="4" class="d-green d-fill"/>')
s.text(236, 158, "Shared layer", "d-t")
s.text(224, 180, "Followers: onchain", "d-s")
s.text(224, 198, "Posts: Grove", "d-s")
s.text(210, 246, "No app holds them.", "d-s")
s.text(210, 262, "The next app finds them there.", "d-s d-green d-ct")
s.render()

# ── 3. ENS gateways (interactive: src/data/diagrams/ens-gateway.ts) ──
s = Svg("ens-gateway", 400, 400, "You deploy a static site to IPFS and point your ENS name at its content hash. A reader in a normal browser visits yourname.eth.limo: the gateway reads the ENS record, fetches the files and serves them. Brave and Opera resolve the name without a gateway")
s.box(20, 16, 360, 54, "Your static site", "markdown, built to plain files", accent="violet", node="publisher")
s.box(20, 128, 165, 54, "ENS name", "holds the content hash", accent="blue", node="ens")
s.box(215, 128, 165, 54, "IPFS", "or Arweave, Swarm", accent="green", node="storage")
s.box(20, 240, 220, 54, "eth.limo gateway", "turns a name into a web page", accent="amber", node="gateway")
s.box(256, 240, 124, 54, "Brave, Opera", "no gateway", dashed=True, node="brave")
s.box(20, 346, 360, 42, "A reader's browser", accent="rose", node="reader")
s.arrow([(102, 70), (102, 126)], "point it at the hash", 110, 102, edge="publisher-ens")
s.arrow([(298, 70), (298, 126)], "deploy and pin", 306, 102, edge="publisher-storage")
s.arrow([(185, 155), (213, 155)], edge="ens-storage")
s.arrow([(102, 240), (102, 184)], "reads the record", 110, 216, edge="gateway-ens")
s.arrow([(228, 240), (228, 184)], "fetches", 236, 216, edge="gateway-storage")
s.arrow([(330, 240), (330, 184)], "natively", 338, 216, dashed=True, edge="brave-storage")
s.arrow([(102, 346), (102, 296)], "yourname.eth.limo", 110, 325, edge="reader-gateway")
s.arrow([(330, 346), (330, 296)], "yourname.eth", 322, 325, "end", dashed=True, edge="reader-brave")
s.render()

# ── 4. Paragraph's two layers (interactive: src/data/diagrams/publishing-paragraph-layers.ts) ──
s = Svg("publishing-paragraph-layers", 400, 300, "Paragraph has two layers. The web2 layer is always on: email delivery, SEO and analytics. The web3 layer is opt-in: an Arweave copy, NFT collects, NFT memberships and token-gated posts. Without Arweave, a post lives on Paragraph's servers")
s.text(20, 22, "Two layers, and only one is opt-in", "d-t")
s.text(20, 38, "Reading needs no wallet, because the top layer does the work", "d-s")
s.text(20, 60, "Web2 layer: always on", "d-s d-green d-ct")
for i, (node, title) in enumerate((("email", "Email"), ("seo", "SEO"), ("analytics", "Analytics"))):
    s.box(20 + i * 124, 68, 112, 44, title, accent="green", node=node)
s.text(20, 136, "Web3 layer: opt-in", "d-s d-violet d-ct")
opt = (("arweave", "Arweave copy"), ("collects", "NFT collects"), ("memberships", "NFT memberships"), ("gating", "Token-gated posts"))
for i, (node, title) in enumerate(opt):
    s.box(20 + (i % 2) * 186, 144 + (i // 2) * 52, 174, 44, title, accent="violet", node=node)
s.rule(256)
s.text(20, 280, "Skip Arweave and the post lives on Paragraph's servers.", "d-s")
s.render()

# ── 5. What happened to a Mirror post ───────────────────────────
s = Svg("publishing-mirror-fate", 400, 212, "Before and after. On Mirror a post had a page on mirror.xyz and a permanent copy on Arweave. By November 2025 the posts and subscribers had migrated to Paragraph, and the Arweave copy was unchanged")
s.text(20, 22, "One post, before and after", "d-t")
s.text(20, 56, "On Mirror", "d-s")
s.text(230, 56, "By November 2025", "d-s")
s.box(20, 66, 150, 54, "mirror.xyz", "Page and subscribers", accent="rose")
s.box(230, 66, 150, 54, "Paragraph", "Post and subscribers", accent="green")
s.arrow([(170, 93), (228, 93)], "migrated", 199, 86, "middle")
s.box(20, 136, 150, 54, "Arweave", "Permanent copy", accent="green")
s.box(230, 136, 150, 54, "Arweave", "The same copy", accent="green")
s.arrow([(170, 163), (228, 163)], "untouched", 199, 156, "middle")
s.render()

# ── 6. Farcaster's numbers, to scale ────────────────────────────
s = Svg("publishing-farcaster-decline", 400, 262, "Three Farcaster numbers drawn against their own peaks. Daily active users fell from about 100,000 to about 60,000. New registrations fell from 15,000 to about 650 a day. Monthly revenue fell from 1.91 million dollars to about 10,000 dollars, a bar too thin to see well")
s.text(20, 22, "Peak against latest, to scale", "d-t")
s.text(20, 38, "The outline is the peak. The fill is what's left.", "d-s")
rows = [
    ("Daily active users", "~100K to ~60K", 0.6),
    ("New registrations a day", "15,000 to ~650", 650 / 15000),
    ("Monthly revenue", "$1.91M to ~$10K", 10 / 1910),
]
for i, (label, nums, share) in enumerate(rows):
    y = 70 + i * 64
    s.text(20, y, label, "d-t")
    s.text(380, y, nums, "d-s d-m", "end")
    s.add(f'<rect x="20" y="{y + 10}" width="360" height="26" rx="3" class="d-box"/>')
    s.add(f'<rect x="20" y="{y + 10}" width="{360 * share:.1f}" height="26" rx="1" class="d-rose d-fill" opacity="0.85"/>')
s.render()

# ── 7. Steem to Hive (interactive: src/data/diagrams/publishing-steem-fork.ts) ──
s = Svg("publishing-steem-fork", 400, 340, "Steemit launched in 2016. In 2020 Justin Sun bought Steemit Inc. and used exchange-held user funds to seize the top 20 witnesses. The chain split: Steem stayed under his control and the community forked to Hive")
s.box(20, 16, 360, 54, "Steemit", "2016: crypto for creating and curating", accent="green", node="steemit")
s.arrow([(200, 70), (200, 100)], edge="steemit-sun")
s.box(20, 102, 360, 54, "Justin Sun buys Steemit Inc.", "2020", accent="amber", node="sun")
s.arrow([(200, 156), (200, 186)], edge="sun-witnesses")
s.box(20, 188, 360, 54, "Top 20 witnesses seized", "With exchange-held user funds", accent="rose", node="witnesses")
s.arrow([(105, 242), (105, 272)], "stays", 113, 262, edge="witnesses-steem")
s.arrow([(295, 242), (295, 272)], "forks", 303, 262, edge="witnesses-hive")
s.box(20, 274, 170, 54, "Steem", "Under Tron and Sun", accent="amber", node="steem")
s.box(210, 274, 170, 54, "Hive", "Community-governed", accent="green", node="hive")
s.render()

# ── 8. friend.tech, areas to scale ──────────────────────────────
s = Svg("publishing-friendtech", 400, 280, "friend.tech as two pairs of squares with areas to scale. Deposits went from 52 million dollars at peak to about 4.2 million, down 92 percent. Daily fees went from 2 million dollars to under 100 dollars, which is a dot in the corner of the square")
s.text(20, 22, "friend.tech, peak against late 2024", "d-t")
s.text(20, 38, "Areas to scale. The outline is the peak.", "d-s")
side = 150
for x, label, share, top, bottom in (
    (20, "Deposits", 0.08, "$52M at peak", "~$4.2M late 2024, down 92%"),
    (210, "Fees a day", 100 / 2_000_000, "$2M at peak", "Under $100 by late 2024"),
):
    s.text(x, 64, label, "d-t")
    s.add(f'<rect x="{x}" y="72" width="{side}" height="{side}" rx="2" class="d-box"/>')
    small = side * share ** 0.5
    s.add(f'<rect x="{x}" y="{72 + side - small:.2f}" width="{small:.2f}" height="{small:.2f}" class="d-rose d-fill" opacity="0.9"/>')
    s.text(x, 242, top, "d-s")
    s.text(x, 258, bottom, "d-s d-rose d-ct")
s.text(222, 182, "$100 is this speck", "d-s")
s.arrow([(226, 190), (213, 218)])
s.render()

# ── 9. Two bets on what to decentralize ─────────────────────────
s = Svg("publishing-leaflet-bet", 400, 300, "Two bets compared. Crypto-native platforms decentralize storage with Arweave or IPFS, use a wallet, and keep the words if the app dies. Leaflet on AT Protocol has no IPFS or Arweave, uses an AT handle, and keeps identity and followers if the app dies")
s.text(20, 22, "The same problem, two bets", "d-t")
s.text(20, 38, "What each one actually takes off the platform", "d-s")
s.text(20, 62, "Crypto-native", "d-t")
s.text(205, 62, "Leaflet, on AT Protocol", "d-t")
rows = [
    ("Storage", ("Arweave or IPFS", "Decentralized storage", "green"), ("No IPFS or Arweave", "Not the bet here", "rose")),
    ("Identity", ("A wallet", "A key you hold", "green"), ("Your AT handle", "Not a platform account", "green")),
    ("If the app dies", ("The words stay", "On permanent storage", "green"), ("The audience stays", "Identity and followers", "green")),
]
for i, (label, left, right) in enumerate(rows):
    y = 82 + i * 72
    s.text(20, y, label, "d-s")
    s.box(20, y + 8, 175, 52, left[0], left[1], accent=left[2])
    s.box(205, y + 8, 175, 52, right[0], right[1], accent=right[2])
s.render()

# ── 10. Three questions (interactive: src/data/diagrams/publishing-decision.ts) ──
s = Svg("publishing-decision", 400, 356, "Three questions. Who is your audience: crypto-native readers point to Paragraph, general readers to Substack or Medium. What does ownership mean: exporting a file means Substack is fine, and nobody being able to delete it means Arweave-backed publishing. If you want a portable identity, that means Lens or Farcaster")
qs = [
    (16, "q1", "Who's your audience?", "paragraph", "Paragraph", "crypto-native", "substack", "Substack or Medium", "general"),
    (130, "q2", "What does ownership mean?", "export", "Substack is fine", "exporting a file", "arweave", "Arweave-backed", "nobody can delete it"),
]
for y, q, title, a, at, al, b, bt, bl in qs:
    s.box(20, y, 360, 38, title, accent="blue", node=q)
    s.arrow([(60, y + 38), (60, y + 62)], al, 68, y + 54, edge=f"{q}-{a}")
    s.arrow([(245, y + 38), (245, y + 62)], bl, 253, y + 54, edge=f"{q}-{b}")
    s.box(20, y + 64, 175, 38, at, anchor="middle", node=a)
    s.box(205, y + 64, 175, 38, bt, anchor="middle", node=b)
s.box(20, 244, 360, 38, "Want an identity that outlives any app?", accent="blue", node="q3")
s.arrow([(60, 282), (60, 306)], "yes, a bet on portability", 68, 298, edge="q3-lens")
s.box(20, 308, 360, 38, "Lens or Farcaster", anchor="middle", node="lens")
s.render()

# ── 11. Who's left at the gateway layer ─────────────────────────
s = Svg("publishing-gateways", 400, 220, "The ENS gateways today. eth.limo is run by a small team and also powers eth.link, which Cloudflare used to run. eth.domains no longer resolves")
s.text(20, 22, "One gateway, two names", "d-t")
s.box(20, 40, 170, 54, "eth.limo", "A small team, on grants", accent="green")
s.box(210, 40, 170, 54, "eth.link", "Run with Cloudflare once", accent="green")
s.arrow([(210, 67), (192, 67)])
s.text(295, 112, "now powered by eth.limo", "d-s", "middle")
s.rule(128)
s.box(20, 144, 360, 54, "eth.domains", "The name no longer resolves", accent="rose", dashed=True)
s.render()
