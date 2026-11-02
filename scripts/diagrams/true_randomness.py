"""Diagrams for the randomness post. Run: python3 scripts/diagrams/true_randomness.py"""
from diagram_lib import *

# ── 1. From physical noise to getrandom() ───────────────────────
s = Svg("rng-pipeline", 400, 254, "Interrupt timing, disk and network jitter, keyboard and mouse events, RDRAND and CPU jitter all feed one entropy pool. The pool seeds a CSPRNG, and getrandom hands its output to your code")
sources = ["Interrupt timing", "Disk and network", "Keyboard and mouse", "RDRAND", "CPU jitter"]
for i, name in enumerate(sources):
    y = 16 + i * 38
    s.box(20, y, 150, 30, name)
    s.add(f'<line x1="170" y1="{y + 15}" x2="190" y2="{y + 15}" class="d-line"/>')
s.add('<line x1="190" y1="31" x2="190" y2="183" class="d-line"/>')
s.arrow([(190, 40), (218, 40)])
s.box(220, 16, 160, 48, "Entropy pool", "Mixes every source", accent="violet")
s.arrow([(300, 64), (300, 82)])
s.box(220, 84, 160, 48, "CSPRNG", "Seed in, gigabytes out", accent="blue")
s.arrow([(300, 132), (300, 150)])
s.box(220, 152, 160, 48, "getrandom()", "What your code calls", accent="green")
s.rule(216)
s.text(20, 240, "You need true randomness once. After that it's arithmetic.", "d-s")
s.render()

# ── 2. Rolls needed for a 256-bit seed ──────────────────────────
s = Svg("dice-rolls", 400, 262, "Bars to scale. Hashing the transcript needs 100 dice rolls for a 256-bit seed, rejection sampling about 192, and binary reduction 256")
s.text(20, 22, "Dice rolls for a 256-bit seed", "d-t")
s.text(20, 38, "To scale. A fair die gives about 2.585 bits per roll.", "d-s")
methods = [
    ("Hash the transcript", "SHA-256 over every roll", 100, "green"),
    ("Rejection sampling", "Keep 1–4, reject 5 and 6", 192, "amber"),
    ("Binary reduction", "1–3 is 0, 4–6 is 1", 256, "rose"),
]
for i, (name, how, rolls, acc) in enumerate(methods):
    y = 68 + i * 54
    s.text(20, y, name, "d-t")
    s.text(380, y, how, "d-s", "end")
    s.add(f'<rect x="20" y="{y + 9}" width="{rolls * 1.2}" height="18" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(20 + rolls * 1.2 + 8, y + 22, str(rolls), f"d-t d-{acc} d-ct")
s.rule(226)
s.text(20, 250, "Doubt your dice? Roll 120 and hash them.", "d-s")
s.render()
