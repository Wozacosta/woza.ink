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
