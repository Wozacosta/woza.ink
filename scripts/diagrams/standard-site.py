"""Diagram for the Standard.site post. Run: python3 scripts/diagrams/standard-site.py"""
from diagram_lib import *

# ── 1. Two-way verification ─────────────────────────────────────
s = Svg("standard-site-verify", 400, 318, "Your domain and your repo point at each other. The domain's well-known file and link tags name the AT-URI of each record. The records in your repo carry the site URL and path. A reader only trusts a record when both directions match")
s.box(20, 16, 360, 62, "Your domain", ".well-known file and a <link> tag on each post", accent="blue")
s.box(20, 196, 360, 62, "Your repo on a PDS", "One publication record, one document per post", accent="green")
s.arrow([(70, 78), (70, 194)], "names the record", 80, 141)
s.arrow([(330, 196), (330, 80)], "names the URL", 320, 141, lanchor="end")
s.add('<line x1="20" y1="274" x2="380" y2="274" class="d-line d-faint"/>')
s.text(20, 298, "A record only counts when both directions match.", "d-t")
s.render()
