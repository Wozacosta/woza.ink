"""Diagram for the Matrix post. Run: python3 scripts/diagrams/matrix.py"""
from diagram_lib import *

# ── 1. A room across three homeservers (interactive: src/data/diagrams/matrix-federation.ts) ──
s = Svg("matrix-federation", 400, 372, "Alice sends a message to her homeserver, example.com. It goes to the other homeservers in the room, other.org and third.net, and each keeps its own copy. other.org delivers it to Bob, and a bridge connects the room to networks like Slack, IRC and Telegram")


def person(x, label, node):
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="{x}" y="12" width="165" height="30" rx="8" class="d-box"/>')
    s.text(x + 82.5, 31, label, "d-s d-m", "middle")
    s.add("</g>")


person(20, "@alice:example.com", "alice")
person(215, "@bob:other.org", "bob")
s.arrow([(102, 42), (102, 74)], edge="alice-example")
s.arrow([(298, 76), (298, 44)], edge="other-bob")
s.box(20, 76, 165, 54, "example.com", "Its copy of the room", accent="blue", node="example")
s.box(215, 76, 165, 54, "other.org", "Its copy of the room", accent="green", node="other")
s.box(117, 184, 165, 54, "third.net", "Its copy of the room", accent="violet", node="third")
s.arrow([(185, 97), (213, 97)], edge="example-other")
s.arrow([(215, 109), (187, 109)], edge="other-example")
s.arrow([(112, 130), (152, 182)], edge="example-third")
s.arrow([(164, 184), (124, 132)], edge="third-example")
s.arrow([(276, 130), (236, 182)], edge="other-third")
s.arrow([(248, 184), (288, 132)], edge="third-other")
s.arrow([(200, 238), (200, 284)], "bridge", 210, 266, edge="third-bridged")
s.box(117, 286, 165, 40, "Slack, IRC, Telegram", anchor="middle", dashed=True, node="bridged")
s.rule(342)
s.text(20, 362, "A message goes to every server in the room. Each one keeps a copy.", "d-s")
s.render()

# ── 2. The address ──────────────────────────────────────────────
s = Svg("matrix-id", 400, 196, "A Matrix ID compared with an email address. In alice@example.com and @alice:example.com, alice is the user and example.com is the server that holds the account")
s.text(20, 22, "You can already read this address", "d-t")
CH = 10.8
mono = 'class="d-m" style="font-size:18px"'


def address(y, label, parts, x0=96):
    s.text(20, y + 4, label, "d-s")
    spans = "".join(f'<tspan {cls}>{text}</tspan>' for text, cls in parts)
    s.add(f'<text x="{x0}" y="{y + 6}" {mono}>{spans}</text>')


plain = 'style="fill:var(--subtle,#6b665f)"'
user, host = 'class="d-blue d-ct"', 'class="d-green d-ct"'
address(64, "Email", [("alice", user), ("@", plain), ("example.com", host)])
address(116, "Matrix", [("@", plain), ("alice", user), (":", plain), ("example.com", host)])
x = 96 + CH
s.add(f'<path d="M{x},128 v5 H{x + 5 * CH} v-5" class="d-line d-faint"/>')
s.text(x + 2.5 * CH, 150, "the user", "d-s d-blue d-ct", "middle")
x2 = x + 6 * CH
s.add(f'<path d="M{x2},128 v5 H{x2 + 11 * CH} v-5" class="d-line d-faint"/>')
s.text(x2, 150, "the server with the account", "d-s d-green d-ct")
s.text(20, 182, "Different servers can talk, the way two mail hosts can.", "d-s")
s.render()

# ── 3. Pick a stack (interactive: src/data/diagrams/matrix-stack.ts) ──
s = Svg("matrix-stack", 400, 318, "A walled app bundles the client, the server and the network, and one company picks all three. With Matrix you choose each layer: a client such as Element, FluffyChat, Cinny, Nheko or SchildiChat, a homeserver such as matrix.org or your own Synapse or Conduit, and optional bridges to Slack, IRC, Telegram or SMS")
s.text(20, 22, "One bundle, or three choices", "d-t")
s.text(20, 46, "A walled app", "d-s")
s.box(20, 54, 360, 44, "App, server and network: one company picks", dashed=True, node="walled")
s.text(20, 122, "Matrix", "d-s")
s.box(20, 130, 360, 54, "Client", "Element, FluffyChat, Cinny, Nheko, SchildiChat", accent="violet", node="client")
s.arrow([(200, 184), (200, 208)], edge="client-homeserver")
s.box(20, 210, 360, 54, "Homeserver", "matrix.org, or your own Synapse or Conduit", accent="blue", node="homeserver")
s.arrow([(200, 264), (200, 278)], edge="homeserver-bridges")
s.box(20, 280, 360, 30, "Bridges, optional: Slack, IRC, Telegram, SMS", dashed=True, node="bridges")
s.render()

# ── 4. What a homeserver can read (interactive: src/data/diagrams/matrix-metadata.ts) ──
s = Svg("matrix-metadata", 400, 300, "One encrypted Matrix message as a homeserver sees it. The content is ciphertext. The sender, the room and the time are all visible, and those are enough to show who is talking to whom and when")
s.text(20, 22, "One message, as a homeserver sees it", "d-t")
s.text(20, 38, "With E2EE on", "d-s")
fields = [
    ("sender", "Who sent it", "@alice:example.com", "rose", "Readable"),
    ("room", "Which room", "Who else is in it, too", "rose", "Readable"),
    ("time", "When", "Every message, timestamped", "rose", "Readable"),
    ("content", "The message", "Ciphertext", "green", "Sealed"),
]
for i, (node, title, sub, acc, verdict) in enumerate(fields):
    y = 54 + i * 58
    s.box(20, y, 360, 50, title, sub, accent=acc, node=node)
    s.text(366, y + 30, verdict, f"d-s d-{acc} d-ct", "end")
s.render()
