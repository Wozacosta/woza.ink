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
