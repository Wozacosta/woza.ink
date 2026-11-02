"""Diagram for the Standard.site post. Run: python3 scripts/diagrams/standard-site.py"""
from diagram_lib import *

# ── 1. Two-way verification (interactive: src/data/diagrams/standard-site-verify.ts) ──
s = Svg("standard-site-verify", 400, 402, "Your domain and your repo point at each other. The well-known file names the publication record and each post's link tag names its document record. The records carry the site URL and path. An app that finds a document record follows its site field to the publication, then checks both directions. A record only counts when both match")
s.box(20, 16, 360, 100, "Your domain", dashed=True)
s.box(32, 50, 148, 54, "Well-known file", "Names the publication", node="wellknown")
s.box(220, 50, 148, 54, "<link> tag on a post", "Names the document", node="link")
s.add('<rect x="20" y="190" width="360" height="100" rx="8" class="d-ext"/>')
s.box(32, 200, 148, 54, "Publication record", "Holds the site's URL", node="publication")
s.box(220, 200, 148, 54, "Document record", "Holds the post's path", node="document")
s.text(34, 276, "Your repo on a PDS", "d-t")
s.arrow([(70, 104), (70, 198)], "AT-URI", 62, 151, "end", edge="wellknown-publication")
s.arrow([(100, 200), (100, 106)], "URL", 108, 151, edge="publication-wellknown")
s.arrow([(300, 104), (300, 198)], "AT-URI", 308, 151, edge="link-document")
s.arrow([(270, 200), (270, 106)], "URL + path", 262, 151, "end", edge="document-link")
s.arrow([(220, 227), (182, 227)], "site", 200, 220, "middle", edge="document-publication")
s.arrow([(294, 322), (294, 256)], edge="app-document")
s.box(20, 324, 360, 40, "An app that finds a record", accent="violet", node="app")
s.text(20, 390, "A record only counts when both directions match.", "d-t")
s.render()
