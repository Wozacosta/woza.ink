"""Diagram for the personal RSS setup post. Run: python3 scripts/diagrams/personal_rss.py"""
from diagram_lib import *

# ── 1. The setup (interactive: src/data/diagrams/rss-setup.ts) ──
s = Svg("rss-setup", 400, 336, "Four folders, Tech, Thinking, News and Releases, feed into NetNewsWire, which syncs between Mac and iOS through iCloud. The subscription list exports as an OPML file that can be imported into Miniflux or any other serious reader. Social posts, YouTube and newsletters stay out of the reader")
s.text(20, 22, "Four folders, and the exit is a file", "d-t")
s.text(20, 38, "Each folder gets its own kind of attention", "d-s")
folders = [
    ("tech", "Tech", "High volume, skim", "blue"),
    ("thinking", "Thinking", "Read properly", "violet"),
    ("news", "News", "Kept small", "amber"),
    ("releases", "Releases", "Pure signal", "green"),
]
for i, (node, name, how, acc) in enumerate(folders):
    y = 56 + i * 54
    s.box(20, y, 150, 46, name, how, accent=acc, node=node)
    s.arrow([(170, y + 23), (193, y + 23), (193, 110), (214, 110)], edge=f"{node}-reader")
s.box(216, 84, 164, 52, "NetNewsWire", "Mac and iOS, iCloud sync", accent="green", node="reader")
s.box(216, 176, 164, 52, "OPML file", "Your subscription list", accent="amber", node="opml")
s.box(216, 268, 164, 52, "Miniflux", "Or any serious reader", accent="blue", node="miniflux")
s.arrow([(298, 136), (298, 174)], "export", 306, 160, edge="reader-opml")
s.arrow([(298, 228), (298, 266)], "import", 306, 252, edge="opml-miniflux")
s.text(20, 296, "Stays out of the reader:", "d-s")
s.text(20, 311, "social posts, YouTube,", "d-s")
s.text(20, 326, "newsletters", "d-s")
s.render()
