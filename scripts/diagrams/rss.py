"""Diagram for the RSS post. Run: python3 scripts/diagrams/rss.py"""
from diagram_lib import *

# ── 1. Platform feed vs RSS (interactive: src/data/diagrams/rss-flow.ts) ──
s = Svg("rss-flow", 400, 256, "On a platform, a ranking algorithm sits between the publisher and you and picks what you see. With RSS the site updates an XML file, your reader checks it, and you get every post in order")
s.text(20, 22, "A platform feed", "d-t")
s.box(20, 34, 92, 40, "Publisher", anchor="middle", node="source")
s.box(150, 34, 100, 40, "Ranking", anchor="middle", accent=None, node="ranking")
s.box(288, 34, 92, 40, "You", anchor="middle", node="viewer")
s.arrow([(112, 54), (148, 54)], edge="source-ranking")
s.arrow([(250, 54), (286, 54)], edge="ranking-viewer")
s.text(200, 92, "something else picks what you see", "d-s d-rose d-ct", "middle")
s.rule(112)
s.text(20, 138, "RSS", "d-t")
s.box(20, 150, 72, 40, "Publisher", anchor="middle", node="publisher")
s.box(116, 150, 72, 40, "feed.xml", anchor="middle", node="feed")
s.box(212, 150, 72, 40, "Reader", anchor="middle", node="reader")
s.box(308, 150, 72, 40, "You", anchor="middle", node="you")
s.arrow([(92, 170), (114, 170)], edge="publisher-feed")
s.arrow([(212, 170), (190, 170)], "checks", 200, 142, "middle", dashed=True, edge="reader-feed")
s.arrow([(284, 170), (306, 170)], edge="reader-you")
s.text(200, 208, "every post, in order, unchanged", "d-s d-green d-ct", "middle")
s.rule(222)
s.text(20, 246, "The arrow that matters points the other way: you fetch it.", "d-s")
s.render()

# ── 2. One item in a feed (interactive: src/data/diagrams/rss-anatomy.ts) ──
s = Svg("rss-anatomy", 400, 282, "One item from an RSS feed, annotated. title is the headline, link is where to read it, pubDate keeps items in order, description holds the full text or an excerpt, and enclosure attaches a file, which is what makes a podcast")
s.text(20, 22, "One item in the file", "d-t")
s.text(20, 38, "An example, trimmed", "d-s")
parts = [
    ("title", "<title>A new post</title>", "The headline"),
    ("link", "<link>https://…/new-post</link>", "Where to read it"),
    ("pubdate", "<pubDate>Sun, 25 Jan…</pubDate>", "Keeps things in order"),
    ("description", "<description>…</description>", "Full text or excerpt"),
    ("enclosure", '<enclosure url="ep1.mp3" … />', "Makes it a podcast"),
]
s.text(20, 62, "<item>", "d-s d-m")
for i, (node, code, note) in enumerate(parts):
    y = 70 + i * 36
    s.add(f'<g data-node="{node}"><rect x="30" y="{y}" width="224" height="30" rx="6" class="d-box"/>')
    s.text(40, y + 19, code, "d-s d-m")
    s.add("</g>")
    s.text(264, y + 19, note, "d-s")
s.text(20, 268, "</item>", "d-s d-m")
s.render()

# ── 3. Who knows what you read (interactive: src/data/diagrams/rss-readers.ts) ──
s = Svg("rss-readers", 400, 264, "Readers sorted by who knows your subscriptions. A local app such as NetNewsWire keeps them on your own devices. A self-hosted reader such as Miniflux or Tiny Tiny RSS keeps them on your server. A cloud reader such as Feedly or Inoreader holds them on its own servers")
s.text(20, 22, "Who knows what you subscribe to", "d-t")
rows = [
    ("Only you: a local app", "green", [("netnewswire", "NetNewsWire")]),
    ("Your server: self-hosted", "blue", [("miniflux", "Miniflux"), ("ttrss", "Tiny Tiny RSS")]),
    ("The company: a cloud reader", "amber", [("feedly", "Feedly"), ("inoreader", "Inoreader")]),
]
for i, (label, acc, readers) in enumerate(rows):
    y = 50 + i * 70
    s.text(20, y, label, f"d-s d-{acc} d-ct")
    for j, (node, title) in enumerate(readers):
        s.box(20 + j * 184, y + 8, 176, 46, title, accent=acc, node=node)
s.render()

# ── 4. A feed is an input ───────────────────────────────────────
s = Svg("rss-automation", 400, 204, "Two automations. A blog feed goes through a rule that matches the word tutorial and lands in Notion. A release feed goes through IFTTT or Make and lands in a Slack channel")
s.text(20, 22, "A feed is an input to anything", "d-t")
lanes = [
    ("Blog feed", "New posts", "Rule", 'Says "tutorial"', "Notion", "Saved to read"),
    ("Release feed", "Release notes", "IFTTT, Make", "On each item", "Slack", "A team channel"),
]
for i, (a, asub, b, bsub, c, csub) in enumerate(lanes):
    y = 44 + i * 76
    s.box(20, y, 112, 60, a, asub)
    s.box(144, y, 112, 60, b, bsub, accent="violet")
    s.box(268, y, 112, 60, c, csub, accent="green")
    s.arrow([(132, y + 30), (142, y + 30)])
    s.arrow([(256, y + 30), (266, y + 30)])
s.render()
