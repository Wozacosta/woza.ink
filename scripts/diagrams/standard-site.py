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

# ── 2. How a record becomes an address ──────────────────────────
s = Svg("standard-site-address", 400, 300, "An annotated document record. Its site field points at the publication record, whose url is https://rednafi.com. Its path is /go/patch-field-mask/. Joined together they give the post's real address, https://rednafi.com/go/patch-field-mask/")
s.text(20, 22, "From a record to a real address", "d-t")
s.add('<rect x="20" y="36" width="360" height="72" rx="8" class="d-box"/>')
s.text(34, 56, "Document record", "d-t")
s.text(34, 76, "site: at://did:plc:fgtm2…/site.standard.publication/…", "d-s d-m")
s.text(34, 94, "path: /go/patch-field-mask/", "d-s d-m d-green d-ct")
s.arrow([(100, 108), (100, 146)], "site points here", 108, 131)
s.add('<rect x="20" y="148" width="270" height="56" rx="8" class="d-box"/>')
s.text(34, 170, "Publication record", "d-t")
s.text(34, 190, "url: https://rednafi.com", "d-s d-m d-blue d-ct")
s.arrow([(335, 108), (335, 234)], "path", 327, 131, "end")
s.arrow([(100, 204), (100, 234)])
s.add('<rect x="20" y="236" width="360" height="52" rx="8" class="d-box"/>')
s.add('<text x="200" y="258" class="d-t" text-anchor="middle">The post\'s real address</text>')
s.add('<text x="200" y="276" class="d-s d-m" text-anchor="middle"><tspan class="d-blue d-ct">https://rednafi.com</tspan><tspan class="d-green d-ct">/go/patch-field-mask/</tspan></text>')
s.render()

# ── 3. What travels ─────────────────────────────────────────────
s = Svg("standard-site-travels", 400, 276, "A sketch of one post in two places. On the blog it has a title, text, margin sidenotes and an interactive diagram. In another app, through the record, it has only the title and plain text")


def lines(x, y, widths):
    for i, w in enumerate(widths):
        s.add(f'<rect x="{x}" y="{y + i * 12}" width="{w}" height="5" rx="2.5" style="fill:var(--line-strong,#cfc8bc)"/>')


s.text(20, 22, "The words travel, the layout doesn't", "d-t")
s.text(20, 38, "A sketch of one post in two places", "d-s")
s.text(20, 62, "On my site", "d-s")
s.add('<rect x="20" y="70" width="178" height="194" rx="8" class="d-box"/>')
s.add('<rect x="32" y="84" width="96" height="9" rx="3" class="d-blue d-fill"/>')
lines(32, 104, [100, 92, 104, 84])
s.add('<rect x="32" y="156" width="104" height="58" rx="4" class="d-violet d-fill" opacity="0.3"/>')
s.text(84, 189, "diagram", "d-s", "middle")
lines(32, 226, [100, 88, 96])
s.add('<rect x="146" y="102" width="42" height="40" rx="3" class="d-amber d-fill" opacity="0.3"/>')
s.text(167, 126, "note", "d-s", "middle")
s.arrow([(202, 150), (226, 150)], edge=None)
s.text(240, 62, "In another app", "d-s")
s.add('<rect x="228" y="70" width="152" height="194" rx="8" class="d-box"/>')
s.add('<rect x="240" y="84" width="96" height="9" rx="3" class="d-blue d-fill"/>')
lines(240, 104, [120, 112, 124, 104, 118, 96, 122, 110, 120, 88, 116, 108])
s.render()

# ── 4. Publishing a post (interactive: src/data/diagrams/standard-site-publish.ts) ──
s = Svg("standard-site-publish", 400, 346, "A post starts as markdown. Running sequoia publish writes a document record to your repo and writes its atUri back into the file. You commit and deploy, Vercel builds the page, and the page renders the link tag. A validator then checks the page against the record")
s.box(20, 16, 170, 54, "Markdown post", "Frontmatter and body", accent="blue", node="post")
s.box(210, 16, 170, 54, "sequoia publish", "Run by hand", accent="violet", node="sequoia")
s.arrow([(190, 43), (208, 43)], edge="post-sequoia")
s.box(20, 102, 170, 54, "atUri in the file", "Written back by Sequoia", accent="blue", node="aturi")
s.box(210, 102, 170, 54, "Your repo", "One record per post", accent="green", node="repo")
s.arrow([(295, 70), (295, 100)], edge="sequoia-repo")
s.arrow([(232, 70), (232, 86), (105, 86), (105, 100)], edge="sequoia-aturi")
s.box(20, 188, 170, 54, "Commit, deploy", "Vercel builds the site", accent="amber", node="deploy")
s.arrow([(105, 156), (105, 186)], edge="aturi-deploy")
s.box(20, 274, 170, 54, "Post page", "Renders the <link> tag", accent="blue", node="page")
s.arrow([(105, 242), (105, 272)], edge="deploy-page")
s.box(210, 274, 170, 54, "Validator", "Page and record match", accent="green", node="validator")
s.arrow([(190, 301), (208, 301)], edge="page-validator")
s.arrow([(295, 156), (295, 272)], edge="repo-validator")
s.render()
