"""Diagram for the decentralized social post. Run: python3 scripts/diagrams/decentralized_social.py"""
from diagram_lib import *

# ── 1. ActivityPub vs AT Protocol ───────────────────────────────
s = Svg("social-protocols", 400, 380, "ActivityPub is a federation of servers: your account and posts live on one instance, which talks to the others. AT Protocol is layered: your data lives in a Personal Data Server, a relay aggregates it, apps read from the relay and write to your server, and labeling services handle moderation")
s.text(20, 22, "ActivityPub: a federation of servers", "d-t")
s.text(20, 38, "Your account and posts live on one instance", "d-s")
for i, name in enumerate(("Mastodon", "Pixelfed", "PeerTube")):
    x = 20 + i * 130
    s.box(x, 52, 100, 44, name, anchor="middle")
    if i < 2:
        s.arrow([(x + 100, 74), (x + 128, 74)])
        s.arrow([(x + 130, 74), (x + 102, 74)])
s.rule(116)
s.text(20, 142, "AT Protocol: layers", "d-t")
s.text(20, 158, "Your data lives apart from the apps you use", "d-s")
s.add('<path d="M330,204 V186 H70 V202" class="d-line" stroke-dasharray="4 3" marker-end="url(#ah-social-protocols)"/>')
s.text(200, 180, "apps write to your PDS", "d-s", "middle")
s.box(20, 204, 100, 54, "PDS", "Your data", accent="green")
s.box(150, 204, 100, 54, "Relay", "Aggregates", accent="blue")
s.box(280, 204, 100, 54, "App", "Reads relay", accent="violet")
s.arrow([(120, 231), (148, 231)])
s.arrow([(250, 231), (278, 231)])
s.box(280, 292, 100, 44, "Labelers", anchor="middle", dashed=True)
s.arrow([(330, 292), (330, 260)], "moderation", 320, 280, lanchor="end")
s.text(20, 308, "Move your PDS and your", "d-s")
s.text(20, 324, "followers and posts come along.", "d-s")
s.render()

# ── 2. Lens: one graph, one steward ─────────────────────────────
s = Svg("social-lens", 400, 374, "Six apps share one Lens network holding your account and followers. Mask Network stewards the protocol, builds Firefly and has acquired Orb. Hey, Palus, Soclly and Cantuum sit on the same network")
s.box(20, 16, 235, 54, "Mask Network", "Steward of Lens since January 2026", accent="rose")
s.arrow([(75, 70), (75, 102)], "acquired", 83, 91)
s.arrow([(200, 70), (200, 102)], "builds", 208, 91)
s.arrow([(255, 43), (262, 43), (262, 190)], "stewards", 270, 91)
s.box(20, 104, 110, 54, "Orb", "Mobile app", accent="rose")
s.box(145, 104, 110, 54, "Firefly", "Aggregator", accent="rose")
s.box(270, 104, 110, 54, "Hey", "Payments", accent="blue")
s.box(20, 192, 360, 54, "Lens network", "Your account and followers, in every app here", accent="green")
for x in (75, 200, 325):
    s.arrow([(x, 192), (x, 160)])
    s.arrow([(x, 246), (x, 278)])
s.box(20, 280, 110, 54, "Palus", "Open source", accent="blue")
s.box(145, 280, 110, 54, "Soclly", "Publishing", accent="blue")
s.box(270, 280, 110, 54, "Cantuum", "Music player", accent="blue")
s.text(20, 360, "A shared audience, with two front doors under one owner.", "d-s")
s.render()

# ── 3. Nostr: keys and relays ───────────────────────────────────
s = Svg("social-nostr", 400, 312, "A sketch with three relays. Your keypair signs an event and you publish it to relays you choose. Clients read from whichever relays they like. If one relay is blocked, the event still reaches clients through the others")
s.box(20, 16, 360, 54, "Your keypair", "Your identity, portable to any client", accent="green")
s.arrow([(75, 70), (75, 116)], "signed", 83, 97)
s.arrow([(200, 70), (200, 116)], faint=True, dashed=True)
s.arrow([(325, 70), (325, 116)], "signed", 333, 97)
s.box(20, 118, 110, 44, "Relay A", anchor="middle")
s.box(145, 118, 110, 44, "Relay B", anchor="middle", dashed=True)
s.box(270, 118, 110, 44, "Relay C", anchor="middle")
s.text(200, 178, "blocked", "d-s d-rose d-ct", "middle")
s.arrow([(55, 162), (55, 212)])
s.arrow([(112, 162), (168, 212)])
s.arrow([(288, 162), (232, 212)])
s.arrow([(345, 162), (345, 212)])
s.box(20, 214, 110, 44, "Primal", anchor="middle")
s.box(145, 214, 110, 44, "Snort", anchor="middle")
s.box(270, 214, 110, 44, "Damus", anchor="middle")
s.rule(274)
s.text(20, 298, "Every client still got the event.", "d-t")
s.render()

# ── 4. Where your account lives ─────────────────────────────────
s = Svg("social-ownership", 400, 372, "Where your account lives on each network. On the fediverse it is one instance, and on Bluesky one PDS. Farcaster splits identity on Optimism from posts on Snapchain. Lens keeps your account and followers on its own chain. Nostr splits a key you hold from the relays you pick")
s.text(20, 22, "Where your account lives", "d-t")
s.text(20, 38, "One box holds it all. Two boxes split identity from posts.", "d-s")
rows = [
    ("Fediverse", "ActivityPub", [("One instance", "Account and posts together", "blue")]),
    ("Bluesky", "AT Protocol", [("Your PDS", "Identity, followers and posts", "blue")]),
    ("Farcaster", "Wallet key", [("Optimism", "Identity", "amber"), ("Snapchain", "Posts", "amber")]),
    ("Lens", "Wallet", [("Lens chain", "Account and followers", "amber")]),
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
