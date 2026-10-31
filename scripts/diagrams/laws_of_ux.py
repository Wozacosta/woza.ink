"""Diagrams for the Laws of UX post. Run: python3 scripts/diagrams/laws_of_ux.py"""
import math

from diagram_lib import *

# ── 1. Fitts's law, drawn to scale ──────────────────────────────
s = Svg("ux-fitts", 400, 306, "Three pointing tasks drawn to scale. A far, narrow target scores 4.0 bits. Making it three times wider, or bringing it three times closer, both score 2.6 bits")
s.text(20, 22, "Difficulty = log2(D / W + 1)", "d-t")
s.text(20, 38, "Distances and widths to scale. Fewer bits means faster.", "d-s")
start = 30
rows = [
    ("Far and narrow", 300, 20, "rose"),
    ("Far and wide", 300, 60, "green"),
    ("Close and narrow", 100, 20, "green"),
]
for i, (label, d, w, acc) in enumerate(rows):
    y = 72 + i * 80
    bits = math.log2(d / w + 1)
    s.text(20, y, label, "d-s")
    s.text(380, y, f"{bits:.1f} bits", f"d-t d-{acc} d-ct", "end")
    cy = y + 28
    centre = start + d
    s.add(f'<circle cx="{start}" cy="{cy}" r="4" class="d-blue d-fill"/>')
    s.add(f'<rect x="{centre - w / 2}" y="{cy - 17}" width="{w}" height="34" rx="4" class="d-{acc} d-fill" opacity="0.85"/>')
    s.arrow([(start + 8, cy), (centre - w / 2 - 3, cy)])
s.render()

# ── 2. The cold water experiment ────────────────────────────────
s = Svg("ux-peak-end", 400, 276, "Two trials of cold water. The short one is 60 seconds at 14 degrees. The long one adds 30 seconds at 15 degrees: more discomfort in total, but a milder end. Most people chose to repeat the long one")
x0 = 20
scale = 4  # px per second
s.text(20, 22, "Short trial: 60 s at 14°C", "d-t")
s.add(f'<rect x="{x0}" y="36" width="{60 * scale}" height="46" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.text(20, 112, "Long trial: the same, then 30 s at 15°C", "d-t")
s.add(f'<rect x="{x0}" y="126" width="{60 * scale}" height="46" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.add(f'<rect x="{x0 + 60 * scale + 2}" y="146" width="{30 * scale - 2}" height="26" rx="3" class="d-amber d-fill" opacity="0.8"/>')
s.add('<line x1="20" y1="196" x2="380" y2="196" class="d-line d-faint"/>')
s.text(20, 220, "The long trial is strictly more discomfort.", "d-s")
s.text(20, 238, "Asked which to repeat, most people chose it anyway:", "d-s")
s.text(20, 256, "they remembered the better ending.", "d-t")
s.render()
