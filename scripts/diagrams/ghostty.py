"""Diagram for the Ghostty post. Run: python3 scripts/diagrams/ghostty.py"""
from diagram_lib import *

# ── 1. libghostty (interactive: src/data/diagrams/libghostty-stack.ts) ──
s = Svg("libghostty-stack", 400, 278, "Ghostty, cmux and any other app can sit on libghostty. libghostty-vt, which parses terminal sequences and keeps terminal state with no dependencies, is taking shape. Input handling, GPU rendering and GTK and Swift widgets are planned")
s.add('<rect x="20" y="88" width="360" height="178" rx="8" class="d-box"/>')
for i, (node, name, dashed) in enumerate((("ghostty", "Ghostty", False), ("cmux", "cmux", False), ("app", "Your app", True))):
    x = 20 + i * 124
    s.box(x, 16, 112, 42, name, anchor="middle", dashed=dashed, node=node)
    s.arrow([(x + 56, 58), (x + 56, 110)], edge=f"{node}-vt")
s.box(34, 112, 332, 54, "libghostty-vt", "Terminal sequences and state, no dependencies", accent="green", node="vt")
for i, (node, name) in enumerate((("input", "Input"), ("gpu", "GPU rendering"), ("widgets", "Widgets"))):
    s.box(34 + i * 113, 176, 106, 42, name, anchor="middle", dashed=True, node=node)
s.text(34, 248, "libghostty", "d-t")
s.text(366, 248, "Dashed: planned", "d-s", "end")
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

# ── 4. One core, two GUIs ───────────────────────────────────────
s = Svg("ghostty-shared-core", 400, 196, "A bar to scale. Over 90 percent of the code is the shared Zig core. The rest is the platform GUIs: Swift and AppKit on macOS, and Zig calling GTK4 on Linux")
s.text(20, 22, "One core, two thin GUIs", "d-t")
s.text(20, 38, "Share of the code, to scale", "d-s")
s.add('<rect x="20" y="54" width="322" height="46" rx="4" class="d-green d-fill" opacity="0.85"/>')
s.add('<rect x="344" y="54" width="36" height="46" rx="4" class="d-amber d-fill" opacity="0.85"/>')
s.text(20, 120, "Over 90%: shared Zig core", "d-t")
s.text(20, 136, "Parsing, state, rendering", "d-s")
s.text(380, 120, "The rest", "d-t", "end")
s.text(380, 136, "Platform GUIs", "d-s", "end")
s.rule(150)
s.text(20, 174, "macOS: Swift and AppKit", "d-s")
s.text(380, 174, "Linux: Zig calling GTK4", "d-s", "end")
s.render()

# ── 5. From closed to non-profit, to scale ──────────────────────
s = Svg("ghostty-timeline", 400, 206, "A to-scale timeline from 2022 to March 2026. Closed development and a private beta run from 2022 to December 2024. Then the 1.0 release under MIT in December 2024, the non-profit in December 2025, and 45,000 stars in March 2026")
s.text(20, 22, "From closed beta to non-profit", "d-t")
s.text(20, 38, "Years to scale", "d-s")
x_of = lambda year: round(20 + (year - 2022) * 360 / 4.4, 1)
closed_end, end = x_of(2024.99), x_of(2026.4)
s.add(f'<rect x="{x_of(2022.24)}" y="84" width="{closed_end - x_of(2022.24) - 2}" height="24" rx="3" class="d-rose d-fill" opacity="0.25"/>')
s.text(x_of(2022.24) + 10, 100, "Closed source, private beta", "d-s")
s.add(f'<rect x="{closed_end}" y="84" width="{end - closed_end}" height="24" rx="3" class="d-green d-fill" opacity="0.3"/>')
s.text(closed_end + 10, 100, "MIT", "d-s")
for year in (2023, 2024, 2025):
    x = x_of(year)
    s.add(f'<line x1="{x}" y1="108" x2="{x}" y2="114" class="d-line d-faint"/>')
    s.text(x, 128, str(year), "d-s", "middle")
marks = [(2022.24, "First commit", "Mar 2022", "start", 2), (2024.99, "1.0", "Dec 2024", "end", 0), (2025.92, "Non-profit", "Dec 2025", "end", 2), (2026.22, "45,000 stars", "Mar 2026", "end", 0)]
for year, name, when, anchor, row in marks:
    x = x_of(year)
    if row == 0:
        s.add(f'<line x1="{x}" y1="84" x2="{x}" y2="74" class="d-line d-faint"/>')
        s.text(x + 4 if anchor == "end" else x, 60, name, "d-t", anchor)
        s.text(x + 4 if anchor == "end" else x, 72, when, "d-s", anchor)
    else:
        s.add(f'<line x1="{x}" y1="108" x2="{x}" y2="146" class="d-line d-faint"/>')
        s.text(x + 4 if anchor == "end" else x - 2, 164, name, "d-t", anchor)
        s.text(x + 4 if anchor == "end" else x - 2, 180, when, "d-s", anchor)
s.render()
