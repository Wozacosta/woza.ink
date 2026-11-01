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
