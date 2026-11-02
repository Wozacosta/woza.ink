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

# ── 2. Renting vs buying ────────────────────────────────────────
s = Svg("lightroom-cost", 400, 288, "Total paid over two years. Lightroom at 19.99 dollars a month rises in a straight line. It passes ON1 Photo RAW at about 100 dollars after 5 months, DxO PhotoLab at about 230 after 12 months, and Capture One at 299 after 15 months. darktable stays at zero")
s.text(20, 22, "When buying beats renting", "d-t")
s.text(20, 38, "Total paid over two years. Paid major upgrades not included.", "d-s")
X = lambda m: 30 + m * 14.5
Y = lambda d: 244 - d * 0.38
s.add(f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(24)}" y2="{Y(0)}" class="d-line"/>')
for m in (0, 6, 12, 18, 24):
    s.text(X(m), 260, str(m), "d-s", "middle")
s.text(X(12), 278, "Months", "d-s", "middle")
owned = [
    ("ON1 Photo RAW, about $100", 100, "blue", "5 months"),
    ("DxO PhotoLab, about $230", 230, "amber", "12 months"),
    ("Capture One Pro, $299", 299, "violet", "15 months"),
]
for label, price, acc, after in owned:
    y = Y(price)
    s.add(f'<line x1="{X(0)}" y1="{y:.1f}" x2="{X(24)}" y2="{y:.1f}" class="d-line d-{acc} d-stroke"/>')
    s.text(X(24), round(y + 14, 1), label, f"d-s d-{acc} d-ct", "end")
s.add(f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(24)}" y2="{Y(19.99 * 24):.1f}" class="d-line d-rose d-stroke" stroke-width="2.25"/>')
for label, price, acc, after in owned:
    x, y = X(price / 19.99), Y(price)
    s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" class="d-{acc} d-fill"/>')
    s.text(round(x - 8, 1), round(y - 7, 1), after, f"d-s d-{acc} d-ct", "end")
s.text(X(24) - 44, 72, "Lightroom, $19.99 a month", "d-s d-rose d-ct", "end")
s.text(X(24), Y(0) - 6, "darktable, free", "d-s d-green d-ct", "end")
s.render()

# ── 3. Two jobs (interactive: src/data/diagrams/lightroom-halves.ts) ──
s = Svg("lightroom-halves", 400, 350, "Lightroom, Capture One, ON1 Photo RAW and darktable do both library management and RAW editing. digiKam and Apple Photos only do the library, and RawTherapee, Photomator and DxO PhotoLab only edit, so they get paired: digiKam with RawTherapee, Apple Photos with Photomator, and DxO PhotoLab with Lightroom or darktable")
s.text(20, 22, "Lightroom is two tools in one", "d-t")
s.text(20, 38, "Full rows do both jobs. Half rows pair up.", "d-s")
s.text(104, 62, "Library", "d-s", "middle")
s.text(296, 62, "RAW editing", "d-s", "middle")
for i, (node, name, acc) in enumerate((
    ("lightroom", "Lightroom", "rose"),
    ("capture-one", "Capture One", "amber"),
    ("on1", "ON1 Photo RAW", "amber"),
    ("darktable", "darktable", "green"),
)):
    s.box(20, 70 + i * 36, 360, 28, name, accent=acc, node=node)
for i, (left, right) in enumerate((
    (("digikam", "digiKam", "green"), ("rawtherapee", "RawTherapee", "green")),
    (("apple-photos", "Apple Photos", None), ("photomator", "Photomator", "amber")),
)):
    y = 214 + i * 36
    s.box(20, y, 168, 28, left[1], accent=left[2], node=left[0])
    s.box(212, y, 168, 28, right[1], accent=right[2], node=right[0])
    s.arrow([(188, y + 14), (210, y + 14)], edge=f"{left[0]}-{right[0]}")
s.add('<rect x="20" y="286" width="168" height="28" rx="8" class="d-ext"/>')
s.text(104, 304, "Lightroom or darktable", "d-s", "middle")
s.box(212, 286, 168, 28, "DxO PhotoLab", accent="amber", node="dxo")
s.arrow([(188, 300), (210, 300)])
for x, acc, label in ((24, "rose", "Subscription only"), (146, "amber", "Can buy once"), (248, "green", "Open source")):
    s.add(f'<circle cx="{x}" cy="334" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 10, 338, label, "d-s")
s.render()
