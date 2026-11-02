"""Diagram for the Matrix post. Run: python3 scripts/diagrams/matrix.py"""
from diagram_lib import *

# ── 1. A room across three homeservers ──────────────────────────
s = Svg("matrix-federation", 400, 356, "Two people on different homeservers share a room. Their servers talk to each other and to a third, and each keeps its own copy of the room. A bridge connects the room to networks like Slack, IRC and Telegram")
s.text(102, 22, "@alice:example.com", "d-s d-m", "middle")
s.text(298, 22, "@bob:other.org", "d-s d-m", "middle")
s.arrow([(102, 30), (102, 62)])
s.arrow([(298, 30), (298, 62)])
s.box(20, 64, 165, 54, "example.com", "Its copy of the room", accent="blue")
s.box(215, 64, 165, 54, "other.org", "Its copy of the room", accent="green")
s.box(117, 172, 165, 54, "third.net", "Its copy of the room", accent="violet")
s.arrow([(185, 91), (213, 91)])
s.arrow([(215, 91), (187, 91)])
s.arrow([(120, 118), (160, 170)])
s.arrow([(160, 170), (120, 120)])
s.arrow([(280, 118), (240, 170)])
s.arrow([(240, 170), (280, 120)])
s.arrow([(200, 226), (200, 272)], "bridge", 210, 254)
s.box(117, 274, 165, 40, "Slack, IRC, Telegram", anchor="middle", dashed=True)
s.rule(330)
s.text(20, 350, "A message goes to every server in the room. Each one keeps a copy.", "d-s")
s.render()
