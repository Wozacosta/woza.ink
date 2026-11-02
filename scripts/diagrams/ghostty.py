"""Diagram for the Ghostty post. Run: python3 scripts/diagrams/ghostty.py"""
from diagram_lib import *

# ── 1. libghostty ───────────────────────────────────────────────
s = Svg("libghostty-stack", 400, 288, "Ghostty, cmux and any other app can sit on libghostty. libghostty-vt, which parses terminal sequences and keeps terminal state with no dependencies, is taking shape. Input handling, GPU rendering and GTK and Swift widgets are planned")
for i, (name, dashed) in enumerate((("Ghostty", False), ("cmux", False), ("Your app", True))):
    x = 20 + i * 124
    s.box(x, 16, 112, 42, name, anchor="middle", dashed=dashed)
    s.arrow([(x + 56, 58), (x + 56, 88)])
s.add('<rect x="20" y="90" width="360" height="168" rx="8" class="d-box"/>')
s.text(34, 114, "libghostty", "d-t")
s.box(34, 124, 332, 54, "libghostty-vt", "Terminal sequences and state, no dependencies", accent="green")
for i, name in enumerate(("Input", "GPU rendering", "Widgets")):
    s.box(34 + i * 113, 188, 106, 42, name, anchor="middle", dashed=True)
s.text(34, 248, "Dashed: planned", "d-s")
s.render()
