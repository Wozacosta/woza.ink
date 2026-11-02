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
