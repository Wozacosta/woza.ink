"""Diagram for the RSS post. Run: python3 scripts/diagrams/rss.py"""
from diagram_lib import *

# ── 1. Platform feed vs RSS ─────────────────────────────────────
s = Svg("rss-flow", 400, 256, "On a platform, a ranking algorithm sits between the publisher and you and picks what you see. With RSS the site updates an XML file, your reader checks it, and you get every post in order")
s.text(20, 22, "A platform feed", "d-t")
s.box(20, 34, 92, 40, "Publisher", anchor="middle")
s.box(150, 34, 100, 40, "Ranking", anchor="middle", accent=None)
s.box(288, 34, 92, 40, "You", anchor="middle")
s.arrow([(112, 54), (148, 54)])
s.arrow([(250, 54), (286, 54)])
s.text(200, 92, "something else picks what you see", "d-s d-rose d-ct", "middle")
s.rule(112)
s.text(20, 138, "RSS", "d-t")
s.box(20, 150, 92, 40, "Publisher", anchor="middle")
s.box(150, 150, 100, 40, "feed.xml", anchor="middle")
s.box(288, 150, 92, 40, "Your reader", anchor="middle")
s.arrow([(112, 170), (148, 170)])
s.arrow([(286, 170), (252, 170)], dashed=True)
s.text(269, 142, "checks", "d-s", "middle")
s.text(200, 208, "every post, in order, unchanged", "d-s d-green d-ct", "middle")
s.rule(222)
s.text(20, 246, "The arrow that matters points the other way: you fetch it.", "d-s")
s.render()
