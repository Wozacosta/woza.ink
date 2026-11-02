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
