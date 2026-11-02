"""Diagram for the decentralized social post. Run: python3 scripts/diagrams/decentralized_social.py"""
from diagram_lib import *

# ── 1. ActivityPub vs AT Protocol (interactive: src/data/diagrams/social-protocols.ts) ──
s = Svg("social-protocols", 400, 380, "ActivityPub is a federation of servers: your account and posts live on one instance, which talks to the others. AT Protocol is layered: your data lives in a Personal Data Server, a relay aggregates it, apps read from the relay and write to your server, and labeling services handle moderation")
s.text(20, 22, "ActivityPub: a federation of servers", "d-t")
s.text(20, 38, "Your account and posts live on one instance", "d-s")
names = ("Mastodon", "Pixelfed", "PeerTube")
for i, name in enumerate(names):
    x = 20 + i * 130
    s.box(x, 52, 100, 44, name, anchor="middle", node=name.lower())
    if i < 2:
        a, b = name.lower(), names[i + 1].lower()
        s.arrow([(x + 100, 70), (x + 128, 70)], edge=f"{a}-{b}")
        s.arrow([(x + 130, 78), (x + 102, 78)], edge=f"{b}-{a}")
s.rule(116)
s.text(20, 142, "AT Protocol: layers", "d-t")
s.text(20, 158, "Your data lives apart from the apps you use", "d-s")
s.add('<path d="M330,204 V186 H70 V202" class="d-line" stroke-dasharray="4 3" data-edge="app-pds" marker-end="url(#ah-social-protocols)"/>')
s.text(200, 180, "apps write to your PDS", "d-s", "middle")
s.box(20, 204, 100, 54, "PDS", "Your data", accent="green", node="pds")
s.box(150, 204, 100, 54, "Relay", "Aggregates", accent="blue", node="relay")
s.box(280, 204, 100, 54, "App", "Reads relay", accent="violet", node="app")
s.arrow([(120, 231), (148, 231)], edge="pds-relay")
s.arrow([(250, 231), (278, 231)], edge="relay-app")
s.box(280, 292, 100, 44, "Labelers", anchor="middle", dashed=True, node="labelers")
s.arrow([(330, 292), (330, 260)], "moderation", 320, 280, lanchor="end", edge="labelers-app")
s.text(20, 308, "Move your PDS and your", "d-s")
s.text(20, 324, "followers and posts come along.", "d-s")
s.render()

# ── 2. Lens: one graph, one steward (interactive: src/data/diagrams/social-lens.ts) ──
s = Svg("social-lens", 400, 374, "Six apps share one Lens network holding your account and followers. Mask Network stewards the protocol, builds Firefly and has acquired Orb. Hey, Palus, Soclly and Cantuum sit on the same network")
s.box(20, 16, 235, 54, "Mask Network", "Steward of Lens since January 2026", accent="rose", node="mask")
s.arrow([(75, 70), (75, 102)], "acquired", 83, 91, edge="mask-orb")
s.arrow([(200, 70), (200, 102)], "builds", 208, 91, edge="mask-firefly")
s.arrow([(255, 43), (262, 43), (262, 190)], "stewards", 270, 91, edge="mask-network")
s.box(20, 104, 110, 54, "Orb", "Mobile app", accent="rose", node="orb")
s.box(145, 104, 110, 54, "Firefly", "Aggregator", accent="rose", node="firefly")
s.box(270, 104, 110, 54, "Hey", "Payments", accent="blue", node="hey")
s.box(20, 192, 360, 54, "Lens network", "Your account and followers, in every app here", accent="green", node="network")
for x, top, bottom in ((75, "orb", "palus"), (200, "firefly", "soclly"), (325, "hey", "cantuum")):
    s.arrow([(x, 192), (x, 160)], edge=f"network-{top}")
    s.arrow([(x, 246), (x, 278)], edge=f"network-{bottom}")
s.box(20, 280, 110, 54, "Palus", "Open source", accent="blue", node="palus")
s.box(145, 280, 110, 54, "Soclly", "Publishing", accent="blue", node="soclly")
s.box(270, 280, 110, 54, "Cantuum", "Music player", accent="blue", node="cantuum")
s.text(20, 360, "A shared audience, with two front doors under one owner.", "d-s")
s.render()

# ── 3. Nostr: keys and relays (interactive: src/data/diagrams/social-nostr.ts) ──
s = Svg("social-nostr", 400, 312, "A sketch with three relays. Your keypair signs an event and you publish it to relays you choose. Clients read from whichever relays they like. If one relay is blocked, the event still reaches clients through the others")
s.box(20, 16, 360, 54, "Your keypair", "Your identity, portable to any client", accent="green", node="key")
s.arrow([(75, 70), (75, 116)], "signed", 83, 97, edge="key-relaya")
s.arrow([(200, 70), (200, 116)], faint=True, dashed=True, edge="key-relayb")
s.arrow([(325, 70), (325, 116)], "signed", 333, 97, edge="key-relayc")
s.box(20, 118, 110, 44, "Relay A", anchor="middle", node="relaya")
s.box(145, 118, 110, 44, "Relay B", anchor="middle", dashed=True, node="relayb")
s.box(270, 118, 110, 44, "Relay C", anchor="middle", node="relayc")
s.text(200, 178, "blocked", "d-s d-rose d-ct", "middle")
s.arrow([(55, 162), (55, 212)], edge="relaya-primal")
s.arrow([(112, 162), (168, 212)], edge="relaya-snort")
s.arrow([(288, 162), (232, 212)], edge="relayc-snort")
s.arrow([(345, 162), (345, 212)], edge="relayc-damus")
s.box(20, 214, 110, 44, "Primal", anchor="middle", node="primal")
s.box(145, 214, 110, 44, "Snort", anchor="middle", node="snort")
s.box(270, 214, 110, 44, "Damus", anchor="middle", node="damus")
s.rule(274)
s.text(20, 298, "Every client still got the event.", "d-t")
s.render()

# ── 4. Where your account lives ─────────────────────────────────
s = Svg("social-ownership", 400, 372, "Where your account lives on each network. On the fediverse it is one instance, and on Bluesky one PDS. Farcaster splits identity on Optimism from posts on Snapchain. Lens keeps your account and followers on its own chain and posts on Grove. Nostr splits a key you hold from the relays you pick")
s.text(20, 22, "Where your account lives", "d-t")
s.text(20, 38, "One box holds it all. Two boxes split identity from posts.", "d-s")
rows = [
    ("Fediverse", "ActivityPub", [("One instance", "Account and posts together", "blue")]),
    ("Bluesky", "AT Protocol", [("Your PDS", "Identity, followers and posts", "blue")]),
    ("Farcaster", "Wallet key", [("Optimism", "Identity", "amber"), ("Snapchain", "Posts", "amber")]),
    ("Lens", "Wallet", [("Lens Chain", "Account, followers", "amber"), ("Grove", "Posts", "amber")]),
    ("Nostr", "Keypair", [("Your key", "Identity", "green"), ("Relays you pick", "Signed events", "blue")]),
]
for i, (name, sub, chips) in enumerate(rows):
    y = 52 + i * 56
    s.text(20, y + 21, name, "d-t")
    s.text(20, y + 37, sub, "d-s")
    if len(chips) == 1:
        title, note, acc = chips[0]
        s.box(100, y, 280, 48, title, note, accent=acc)
    else:
        for j, (title, note, acc) in enumerate(chips):
            s.box(100 + j * 144, y, 136, 48, title, note, accent=acc)
for x, acc, label in ((20, "blue", "Servers"), (100, "amber", "Chains and data networks"), (262, "green", "A key you hold")):
    s.add(f'<circle cx="{x + 4}" cy="344" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 14, 348, label, "d-s")
s.render()

# ── 5. Mastodon's two timelines ─────────────────────────────────
s = Svg("social-mastodon-timelines", 400, 288, "A sketch of two Mastodon timelines. The local timeline only has posts from your instance. The federated timeline mixes posts from any instance that your instance's users follow")


def timeline(x, title, dots):
    s.add(f'<rect x="{x}" y="50" width="170" height="172" rx="8" class="d-box"/>')
    s.text(x + 14, 72, title, "d-t")
    for i, (acc, w) in enumerate(dots):
        y = 88 + i * 26
        s.add(f'<circle cx="{x + 20}" cy="{y + 7}" r="5" class="d-{acc} d-fill"/>')
        s.add(f'<rect x="{x + 34}" y="{y + 4}" width="{w}" height="6" rx="3" style="fill:var(--line-strong,#cfc8bc)"/>')


s.text(20, 22, "Same app, two views of the network", "d-t")
s.text(20, 38, "A sketch. Each row is one post, each dot its home server.", "d-s")
timeline(20, "Local", [("blue", 110), ("blue", 86), ("blue", 118), ("blue", 74), ("blue", 100)])
timeline(210, "Federated", [("green", 104), ("blue", 118), ("amber", 80), ("violet", 112), ("green", 92)])
s.text(20, 242, "Just your instance", "d-s")
s.text(210, 242, "All your instance's users follow", "d-s")
s.add('<circle cx="24" cy="268" r="4" class="d-blue d-fill"/>')
s.text(34, 272, "Your instance", "d-s")
for x, acc in ((130, "green"), (142, "amber"), (154, "violet")):
    s.add(f'<circle cx="{x}" cy="268" r="4" class="d-{acc} d-fill"/>')
s.text(164, 272, "Other instances", "d-s")
s.render()

# ── 6. Custom feeds (interactive: src/data/diagrams/social-custom-feeds.ts) ──
s = Svg("social-custom-feeds", 400, 262, "Every post on the network can go through any feed algorithm. Bluesky's default is one, and independent developers publish others, such as the best science posts or posts from people in your city. You subscribe to the ones you want")
s.box(20, 16, 360, 48, "Every post on the network", accent="blue", node="network")
feeds = [("default", "Default", "From Bluesky", 20), ("science", "Best science", "By a developer", 144), ("city", "My city", "By a developer", 268)]
for node, title, sub, x in feeds:
    s.arrow([(x + 56, 64), (x + 56, 98)], edge=f"network-{node}")
    s.box(x, 100, 112, 54, title, sub, node=node)
    s.arrow([(x + 56, 154), (x + 56, 188)], edge=f"{node}-you")
s.box(20, 190, 360, 54, "Your home screen", "You subscribe to the feeds you want", accent="green", node="you")
s.render()

# ── 7. The Atmosphere (interactive: src/data/diagrams/social-atmosphere.ts) ──
s = Svg("social-atmosphere", 400, 342, "Bluesky, Tangled, Popfeed, Anisota, Leaflet and Graze are separate apps. They all log in with one account, which is hosted by a provider you pick and can move away from")
s.add('<rect x="20" y="16" width="360" height="164" rx="8" class="d-ext"/>')
s.text(34, 36, "Apps", "d-s")
apps = [
    ("bluesky", "Bluesky", "Microblogging"), ("tangled", "Tangled", "Code"), ("popfeed", "Popfeed", "Reviews"),
    ("anisota", "Anisota", "A slow client"), ("leaflet", "Leaflet", "Blogs"), ("graze", "Graze", "Feed builder"),
]
for i, (node, title, sub) in enumerate(apps):
    s.box(32 + (i % 3) * 114, 46 + (i // 3) * 62, 108, 54, title, sub, node=node)
s.arrow([(200, 180), (200, 216)], "log in", 208, 202, edge="apps-account")
s.box(20, 218, 360, 44, "One account", accent="green", node="account")
s.arrow([(200, 262), (200, 284)], edge="account-host")
s.box(20, 286, 360, 44, "A host you pick and can leave", accent="violet", node="host")
s.render()

# ── 8. A Mini App in the feed ───────────────────────────────────
s = Svg("social-miniapp", 400, 322, "A sketch of a Farcaster feed. Between ordinary posts sit a poll you can answer and a mint button you can press, without leaving the feed")
s.text(20, 22, "A feed you can press", "d-t")
s.text(20, 38, "A sketch. The cards run inside the feed.", "d-s")
s.add('<rect x="20" y="52" width="210" height="256" rx="14" class="d-box"/>')


def bar(x, y, w):
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="6" rx="3" style="fill:var(--line-strong,#cfc8bc)"/>')


bar(36, 72, 150); bar(36, 84, 110)
s.add('<rect x="34" y="102" width="182" height="82" rx="8" class="d-ext"/>')
bar(46, 114, 110)
s.add('<rect x="46" y="130" width="120" height="16" rx="3" class="d-violet d-fill" opacity="0.8"/>')
s.add('<rect x="46" y="152" width="70" height="16" rx="3" class="d-violet d-fill" opacity="0.45"/>')
bar(36, 198, 160)
s.add('<rect x="34" y="214" width="182" height="74" rx="8" class="d-ext"/>')
bar(46, 226, 96)
s.add('<rect x="46" y="244" width="158" height="30" rx="6" class="d-green d-fill" opacity="0.85"/>')
s.add('<text x="125" y="263" class="d-s" text-anchor="middle" style="fill:var(--background,#faf8f5)">Mint</text>')
s.arrow([(248, 142), (220, 142)])
s.text(254, 138, "A poll, answered", "d-s")
s.text(254, 153, "where it sits", "d-s")
s.arrow([(248, 258), (210, 258)])
s.text(254, 254, "A mint or a payment,", "d-s")
s.text(254, 269, "no other app opens", "d-s")
s.render()

# ── 9. One format per incumbent ─────────────────────────────────
s = Svg("social-fediverse-formats", 400, 330, "Four incumbents and their fediverse counterparts. Twitter maps to Mastodon, TikTok to Loops, Instagram to Pixelfed and YouTube to PeerTube. All four counterparts speak ActivityPub, so one account can follow across them")
s.text(20, 22, "Different formats, one protocol", "d-t")
pairs = [("Twitter/X", "Mastodon", "Short posts"), ("TikTok", "Loops", "Short video"), ("Instagram", "Pixelfed", "Photos"), ("YouTube", "PeerTube", "Long video")]
for i, (old, new, kind) in enumerate(pairs):
    y = 40 + i * 54
    s.box(20, y, 120, 46, old, anchor="middle", dashed=True)
    s.arrow([(140, y + 23), (176, y + 23)])
    s.box(178, y, 170, 46, new, kind, accent="blue")
    s.add(f'<line x1="348" y1="{y + 23}" x2="366" y2="{y + 23}" class="d-line d-faint"/>')
s.add('<line x1="366" y1="63" x2="366" y2="260" class="d-line d-faint"/>')
s.arrow([(366, 225), (366, 262)])
s.box(20, 264, 360, 54, "ActivityPub", "One account can follow across all four", accent="green")
s.render()

# ── 10. The size of it, to scale ────────────────────────────────
s = Svg("social-scale", 400, 276, "User counts from this post, to scale. Monthly: Threads at 350 million, with Mastodon at about 785,000 almost invisible beside it. Daily: Bluesky at about 3.5 million, with Lens at about 22,000 at its 2025 mainnet launch")
s.text(20, 22, "How big these networks are", "d-t")
s.text(20, 38, "To scale within each group. The two groups use different scales.", "d-s")
groups = [
    ("Monthly active users", [("Threads, on ActivityPub", "350M+", 350, 350, "violet"), ("Mastodon", "~785K", 0.785, 350, "blue")]),
    ("Daily active users", [("Bluesky", "~3.5M", 3500, 3500, "blue"), ("Lens, at its 2025 launch", "~22K", 22, 3500, "amber")]),
]
y = 64
for label, rows in groups:
    s.text(20, y, label, "d-s")
    y += 18
    for name, value, n, top, acc in rows:
        s.text(20, y, name, "d-t")
        s.text(380, y, value, "d-s d-m", "end")
        s.add(f'<rect x="20" y="{y + 6}" width="{max(360 * n / top, 0.8):.1f}" height="14" rx="1" class="d-{acc} d-fill" opacity="0.85"/>')
        y += 42
    y += 6
s.render()
