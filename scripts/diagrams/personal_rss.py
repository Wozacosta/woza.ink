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

# ── 2. Volume against attention ─────────────────────────────────
s = Svg("rss-attention", 400, 314, "A sketch placing the four folders on two axes. Tech is high volume and skimmed. Thinking is low volume and read properly. News is kept small. Releases are short signals")
s.text(20, 22, "Each folder gets a different kind of reading", "d-t")
s.text(20, 38, "A sketch, not a measurement", "d-s")
x0, y0, x1, y1 = 40, 56, 380, 280
s.add(f'<path d="M{x0},{y0} V{y1} H{x1}" class="d-line d-faint"/>')
s.text(x1, y1 + 18, "more items a day", "d-s", "end")
s.text(x0, y1 + 18, "fewer", "d-s")
s.add(f'<text x="28" y="{y0 + 112}" class="d-s" text-anchor="middle" transform="rotate(-90 28 {y0 + 112})">how closely I read</text>')
s.box(56, 68, 140, 54, "Thinking", "Read properly", accent="violet")
s.box(226, 208, 140, 54, "Tech", "Skim aggressively", accent="blue")
s.box(56, 148, 110, 54, "News", "Kept small", accent="amber")
s.box(52, 216, 150, 48, "Releases", "Pure signal", accent="green")
s.render()

# ── 3. The unread count ─────────────────────────────────────────
s = Svg("rss-unread", 400, 268, "A sketch of the unread count over days. It climbs toward 300, drops to zero when everything is marked read, and climbs again. A dashed line shows it rising without limit if it becomes a to-do list")
s.text(20, 22, "Unread is a tide, not a to-do list", "d-t")
s.text(20, 38, "A sketch of the count over a few weeks", "d-s")
base, top = 220, 88
s.add(f'<line x1="40" y1="{base}" x2="380" y2="{base}" class="d-line d-faint"/>')
s.add(f'<line x1="40" y1="{top}" x2="380" y2="{top}" class="d-line d-faint" stroke-dasharray="3 3"/>')
s.text(36, top + 4, "300", "d-s", "end")
s.text(36, base + 4, "0", "d-s", "end")
pts = [(40, base), (120, top), (120, base), (200, top), (200, base), (280, top), (280, base), (330, base - 83)]
s.add('<path d="M' + " L".join(f"{x},{y}" for x, y in pts) + '" class="d-line d-green d-stroke" style="stroke-width:2"/>')
s.add(f'<path d="M280,{top} L372,56" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(292, 70, "never marked read", "d-s d-rose d-ct", "end")
s.text(120, base + 18, "mark all read", "d-s", "middle")
s.text(200, base + 18, "mark all read", "d-s", "middle")
s.text(280, base + 18, "mark all read", "d-s", "middle")
s.text(20, 258, "Each drop costs nothing: the good ones come back another way.", "d-s")
s.render()
