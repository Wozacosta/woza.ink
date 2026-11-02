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

# ── 2. The tradeoff ─────────────────────────────────────────────
s = Svg("terminal-tradeoff", 400, 320, "A triangle with fast, feature-rich and native UI at its corners. Alacritty sits at fast, with no tabs or splits. Kitty sits between fast and feature-rich, with no native UI. iTerm2 sits between feature-rich and native, and is slower on large output. Ghostty aims for the middle")
s.text(20, 22, "The tradeoff Ghostty rejects", "d-t")
s.text(20, 38, "A sketch of this comparison, not a measurement", "d-s")
top, left, right = (200, 66), (44, 288), (356, 288)
s.add(f'<polygon points="{top[0]},{top[1]} {left[0]},{left[1]} {right[0]},{right[1]}" class="d-line d-faint" stroke-linejoin="round"/>')
s.text(200, 58, "Fast", "d-t", "middle")
s.text(20, 308, "Feature-rich", "d-t")
s.text(380, 308, "Native UI", "d-t", "end")
s.add('<circle cx="200" cy="92" r="5" class="d-blue d-fill"/>')
s.text(234, 90, "Alacritty", "d-t")
s.text(234, 105, "No tabs or splits", "d-s")
s.add('<circle cx="122" cy="177" r="5" class="d-amber d-fill"/>')
s.text(110, 175, "Kitty", "d-t", "end")
s.text(110, 190, "No native UI", "d-s", "end")
s.add('<circle cx="200" cy="288" r="5" class="d-rose d-fill"/>')
s.text(200, 260, "iTerm2", "d-t", "middle")
s.text(200, 275, "Slower on large output", "d-s", "middle")
s.add('<circle cx="200" cy="192" r="8" class="d-green d-fill"/>')
s.text(200, 176, "Ghostty", "d-t d-green d-ct", "middle")
s.text(200, 216, "The bet: all three", "d-s", "middle")
s.render()

# ── 3. The numbers ──────────────────────────────────────────────
s = Svg("ghostty-speed", 400, 282, "Key-to-screen latency is about 2 milliseconds for Ghostty and about 3 for Alacritty and Kitty. Printing 100,000 lines takes Ghostty about 0.7 seconds. Being 2 times faster than Terminal.app and 4 times faster than iTerm2 and Kitty puts those at about 1.4 and 2.8 seconds")


def bars(s, rows, top, scale, unit):
    for i, (name, value) in enumerate(rows):
        y = top + i * 24
        s.text(20, y + 11, name, "d-s")
        cls = "d-green d-fill" if name == "Ghostty" else "d-box"
        s.add(f'<rect x="100" y="{y}" width="{value * scale:.0f}" height="14" rx="2" class="{cls}"/>')
        s.text(round(100 + value * scale + 8), y + 11, f"about {value:g} {unit}", "d-s")


s.text(20, 22, "Key-to-screen latency", "d-t")
s.text(20, 38, "Lower is better", "d-s")
bars(s, [("Ghostty", 2), ("Alacritty", 3), ("Kitty", 3)], 52, 50, "ms")
s.rule(130)
s.text(20, 154, "Printing 100,000 lines", "d-t")
s.text(20, 170, "Ghostty's 0.7 s times the multipliers, not a fresh test", "d-s")
bars(s, [("Ghostty", 0.7), ("Terminal.app", 1.4), ("iTerm2", 2.8), ("Kitty", 2.8)], 184, 70, "s")
s.render()
