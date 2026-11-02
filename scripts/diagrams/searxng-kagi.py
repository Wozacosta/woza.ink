"""Diagram for the SearXNG vs Kagi post. Run: python3 scripts/diagrams/searxng-kagi.py"""
from diagram_lib import *

# ── 1. Where each one gets its results ──────────────────────────
s = Svg("searxng-kagi-sources", 400, 400, "SearXNG and Kagi draw on the same indexes by different routes. Google: SearXNG uses a custom search workaround, Kagi buys results from third-party providers. Bing: off by default in SearXNG, third-party providers for Kagi. Brave: SearXNG reads its result pages, Kagi has a direct license. Mojeek: off by default in SearXNG because of a CAPTCHA, a direct license for Kagi. Only Kagi has an index of its own, for small-web pages and news")
s.text(20, 22, "Same indexes, different routes", "d-t")
s.text(20, 38, "Who built the results, and how each one gets them", "d-s")
rows = [
    ("Google", "Custom search workaround", "Bought from third-party providers"),
    ("Bing", "Off by default", "Bought from third-party providers"),
    ("Brave", "Reads its result pages", "Direct license"),
    ("Mojeek", "Off by default, CAPTCHA", "Direct license"),
    ("Own index", "None", "Small web and news only"),
]
top, height, gap = 56, 60, 8
for i, (name, searxng, kagi) in enumerate(rows):
    y = top + i * (height + gap)
    s.add(f'<rect x="20" y="{y}" width="360" height="{height}" rx="8" class="d-box"/>')
    s.text(34, y + 34, name, "d-t")
    s.text(124, y + 25, f"SearXNG: {searxng}", "d-s d-blue d-ct")
    s.text(124, y + 43, f"Kagi: {kagi}", "d-s d-violet d-ct")
s.render()

# ── 2. One query (interactive: src/data/diagrams/searxng-query.ts) ──
s = Svg("searxng-query", 400, 402, "A query goes from your browser to SearXNG, which removes cookies and uses a random browser profile. It asks several engines at once: DuckDuckGo, Brave, the Google workaround and smaller sources. Their answers are merged and ranked by agreement and your hostname rules into one list")
s.text(20, 22, "One query, several engines, one list", "d-t")
s.text(20, 38, "On a fresh install", "d-s")
s.box(20, 54, 360, 48, "Your browser", "localhost:8080/?q=%s", accent="blue", node="browser")
s.box(20, 120, 360, 48, "SearXNG", "No cookies, a random browser profile per request", accent="violet", node="searxng")
s.arrow([(200, 102), (200, 118)], edge="browser-searxng")
engines = [
    ("ddg", "DuckDuckGo", "Result pages", 20, 96),
    ("brave", "Brave", "Result pages", 122, 82),
    ("google", "Google", "Workaround", 210, 82),
    ("others", "Others", "Small sources", 298, 82),
]
for node, name, how, x, w in engines:
    s.box(x, 198, w, 48, name, how, anchor="middle", node=node)
    s.arrow([(x + w / 2, 168), (x + w / 2, 196)], edge=f"searxng-{node}")
    s.arrow([(x + w / 2, 246), (x + w / 2, 274)], edge=f"{node}-merge")
s.box(20, 276, 360, 48, "Merge and rank", "Engine agreement, plus your hostname rules", accent="amber", node="merge")
s.box(20, 342, 360, 48, "Your results", "One list, highest score first", accent="green", node="results")
s.arrow([(200, 324), (200, 340)], edge="merge-results")
s.render()

# ── 3. The score, to scale ──────────────────────────────────────
s = Svg("searxng-score", 400, 246, "Three results drawn as bars to scale, with one segment per engine. First place on one engine scores 1. First place on two engines scores 2 divided by 1 twice, which is 4. Fifth place on three engines scores 3 divided by 5 three times, which is 1.8")
s.text(20, 22, "How agreement adds up", "d-t")
s.text(20, 38, "To scale. Each engine adds: engines that found it / position", "d-s")
scale = 90
rows = [
    ("First on one engine", 1, 1, "1/1 = 1", "rose"),
    ("First on two engines", 2, 2, "2/1 + 2/1 = 4", "green"),
    ("Fifth on three engines", 3, 0.6, "3/5 + 3/5 + 3/5 = 1.8", "amber"),
]
for i, (label, engines_found, each, sum_text, acc) in enumerate(rows):
    y = 68 + i * 60
    s.text(20, y, label, "d-t")
    s.text(380, y, sum_text, "d-s d-m", "end")
    for j in range(engines_found):
        s.add(f'<rect x="{20 + j * each * scale:.0f}" y="{y + 8}" width="{each * scale - 2:.0f}" height="24" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
s.render()

# ── 4. 2026, to scale (interactive: src/data/diagrams/searxng-breakage.ts) ──
s = Svg("searxng-breakage", 400, 424, "A 2026 timeline to scale, one row per event. In February the video shows Google and Startpage working. In July the main Google engine is switched off for a workaround. In August it gets a fix by posing as a Nokia phone. In September Startpage adds a proof-of-work wall. In October home connections get 403s. In November a fresh install has neither on by default")
s.text(20, 22, "Nine months of one arms race", "d-t")
s.text(20, 38, "Spaced to scale by month", "d-s")
m = 36
top = 58
events = [
    (0, "Feb", "feb", "The video: Google, Startpage work", "green"),
    (5, "Jul", "jul", "Google switched off, workaround in", "rose"),
    (6, "Aug", "aug", "Old engine fixed, as a Nokia phone", "amber"),
    (7, "Sep", "sep", "Startpage adds a proof-of-work wall", "rose"),
    (8, "Oct", "oct", "Home connections get 403s", "rose"),
    (9, "Nov", "nov", "A fresh install has neither on", "amber"),
]
s.add(f'<line x1="68" y1="{top + 15}" x2="68" y2="{top + 9 * m + 15}" class="d-line d-faint"/>')
for month, label, node, title, acc in events:
    y = top + month * m
    s.text(20, y + 20, label, "d-s")
    s.add(f'<circle cx="68" cy="{y + 15}" r="5" class="d-{acc} d-fill"/>')
    s.box(84, y, 296, 30, title, node=node)
s.render()

# ── 5. What Kagi takes out (interactive: src/data/diagrams/kagi-filters.ts) ──
s = Svg("kagi-filters", 400, 324, "A funnel with Kagi's stages. A dozen or so sources go in. Pages full of ads and trackers are pushed down. SlopStop downranks domains flagged as mostly AI-generated. Your own blocks, promotions and Lenses apply, and one list of results comes out. Widths are a sketch")
s.text(20, 22, "Each step takes something out", "d-t")
s.text(20, 38, "A sketch. Widths aren't measured.", "d-s")
stages = [
    ("sources", "A dozen or so sources", 360, "blue"),
    ("ads", "Ad and tracker penalty", 310, "amber"),
    ("slop", "SlopStop flags", 260, "rose"),
    ("you", "Your blocks and Lenses", 210, "violet"),
    ("results", "Your results", 160, "green"),
]
for i, (node, title, w, acc) in enumerate(stages):
    y = 54 + i * 54
    x = 200 - w / 2
    s.box(x, y, w, 40, title, anchor="middle", node=node)
    s.add(f'<circle cx="{x + 16}" cy="{y + 20}" r="4" class="d-{acc} d-fill"/>')
    if i < len(stages) - 1:
        s.arrow([(200, y + 40), (200, y + 52)], edge=f"{node}-{stages[i + 1][0]}")
s.render()

# ── 6. Privacy Pass (interactive: src/data/diagrams/kagi-privacy-pass.ts) ──
s = Svg("kagi-privacy-pass", 400, 322, "Privacy Pass in two phases. First your browser proves it is a member, with its session cookie, and generates tokens with Kagi. Later it sends a query with one token. Kagi can tell the token is valid, but can't link it back to the first phase")
s.text(20, 22, "Prove you paid, then search as nobody", "d-t")
s.text(20, 46, "Now and then: generate tokens", "d-s")
s.box(20, 54, 130, 54, "Your browser", "Extension or Orion", accent="blue", node="client")
s.box(250, 54, 130, 54, "Kagi", "Sees your account", accent="violet", node="kagi")
s.arrow([(150, 72), (248, 72)], "session cookie", 200, 66, "middle", edge="client-kagi")
s.arrow([(250, 92), (152, 92)], "tokens", 200, 104, "middle", edge="kagi-client")
s.add('<line x1="20" y1="136" x2="380" y2="136" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(200, 154, "Kagi can't connect these two phases", "d-s d-rose d-ct", "middle")
s.text(20, 182, "Each search: spend one token", "d-s")
s.box(20, 190, 130, 54, "Your browser", "No session cookie", accent="blue", node="search")
s.box(250, 190, 130, 54, "Kagi", "Sees a valid token", accent="green", node="kagi2")
s.arrow([(150, 208), (248, 208)], "query + token", 200, 202, "middle", edge="search-kagi2")
s.arrow([(250, 228), (152, 228)], "results", 200, 240, "middle", edge="kagi2-search")
s.rule(262)
s.text(20, 286, "Each token works once, then a fresh one is used.", "d-t")
s.text(20, 304, "It unlinks the account. Kagi still reads the query.", "d-s")
s.render()

# ── 7. An agent's bill, to scale ────────────────────────────────
s = Svg("searxng-agent-cost", 400, 244, "Monthly cost at a made-up rate of 1,000 searches a day. Kagi's API at 12 dollars per 1,000 comes to 360 dollars a month, against 10 dollars for a person's unlimited plan and nothing per query for SearXNG, which pays with IP blocks instead")
s.text(20, 22, "An agent that searches 1,000 times a day", "d-t")
s.text(20, 38, "An example rate, over 30 days. Bars to scale.", "d-s")
rows = [
    ("Kagi API", "$12 per 1,000", "$360", 360, "violet"),
    ("Kagi plan, for a person", "Not for agents", "$10", 10, "blue"),
    ("SearXNG", "Pays in blocked IPs", "$0", 0, "green"),
]
for i, (label, note, cost, usd, acc) in enumerate(rows):
    y = 68 + i * 58
    s.text(20, y, label, "d-t")
    s.text(380, y, cost, f"d-t d-{acc} d-ct", "end")
    s.text(20, y + 16, note, "d-s")
    s.add(f'<rect x="20" y="{y + 22}" width="{max(usd, 0.8):.1f}" height="14" rx="1" class="d-{acc} d-fill" opacity="0.85"/>')
s.render()

# ── 8. Two doors ────────────────────────────────────────────────
s = Svg("searxng-doors", 400, 276, "Two ways into Google's results. If the remedies hold, a Qualified Competitor gets a front door through search syndication, which is where Kagi would need to qualify. Everyone else stays at the back door: third-party scrapers and SearXNG, while Google narrows it")
s.box(20, 16, 360, 48, "Google's results", accent="blue")
s.arrow([(105, 112), (105, 66)], "syndication", 113, 92, dashed=True)
s.arrow([(295, 112), (295, 66)], "scraping", 303, 92)
s.text(105, 128, "Front door, if it opens", "d-s d-green d-ct", "middle")
s.text(295, 128, "Back door, narrowing", "d-s d-rose d-ct", "middle")
s.box(20, 140, 170, 54, "Qualified Competitors", "Kagi, if it qualifies", accent="green")
s.box(210, 140, 170, 54, "Third-party providers", "Kagi, for now", accent="amber")
s.box(210, 206, 170, 54, "Your container", "SearXNG, always", accent="rose")
s.render()
