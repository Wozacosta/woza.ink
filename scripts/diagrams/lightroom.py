"""Diagram for the Lightroom alternatives post. Run: python3 scripts/diagrams/lightroom.py"""
from diagram_lib import *

# ── 1. From sensor data to a picture ────────────────────────────
s = Svg("raw-pipeline", 400, 300, "A RAW file is a mosaic of red, green and blue readings from the sensor. Software turns it into a picture through demosaicing, white balance, tone curve, noise reduction and sharpening, and every tool does each step differently")
s.text(20, 22, "One RAW file", "d-t")
s.text(20, 38, "One color per pixel", "d-s")
size, top = 16, 76
bayer = (("rose", "green"), ("green", "blue"))
for row in range(6):
    for col in range(6):
        acc = bayer[row % 2][col % 2]
        s.add(f'<rect x="{20 + col * size}" y="{top + row * size}" width="{size - 1}" height="{size - 1}" class="d-{acc} d-fill" opacity="0.75"/>')
s.arrow([(118, 124), (146, 124)])
steps = [
    ("Demosaic", "Bayer pattern into RGB pixels", "violet"),
    ("White balance", None, "amber"),
    ("Tone curve", None, "amber"),
    ("Noise reduction", None, "blue"),
    ("Sharpening", None, "green"),
]
y = 16
for name, sub, acc in steps:
    height = 50 if sub else 36
    s.box(148, y, 232, height, name, sub, accent=acc)
    y += height + 8
s.rule(254)
s.text(20, 278, "Same file, different algorithms: that's why tools look different.", "d-s")
s.render()
