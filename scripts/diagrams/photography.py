"""Diagrams for the camera guide. Run: python3 scripts/diagrams/photography.py"""
from diagram_lib import *

# ── 1. DSLR vs mirrorless ───────────────────────────────────────
s = Svg("camera-mirror", 400, 330, "Cross-sections of two cameras. In a DSLR a mirror bounces light up through a prism to an optical viewfinder. A mirrorless camera sends light straight to the sensor, and the viewfinder is a small screen")


def body(s, y):
    s.add(f'<rect x="130" y="{y}" width="190" height="72" rx="6" class="d-box"/>')
    s.add(f'<rect x="84" y="{y + 12}" width="46" height="48" rx="3" class="d-box"/>')
    s.add(f'<ellipse cx="96" cy="{y + 36}" rx="5" ry="20" class="d-blue d-fill" opacity="0.45"/>')
    s.add(f'<rect x="296" y="{y + 14}" width="5" height="44" rx="1" class="d-green d-fill"/>')
    s.text(107, y + 76, "lens", "d-s", "middle")
    s.text(326, y + 40, "sensor", "d-s")


def ray(s, pts):
    d = "M" + " L".join(f"{x},{y}" for x, y in pts)
    s.add(f'<path d="{d}" class="d-line d-amber d-stroke" stroke-width="1.75" marker-end="url(#ah-{s.name})"/>')


s.text(20, 22, "DSLR", "d-t")
s.text(20, 38, "A mirror bounces the light up to an optical viewfinder", "d-s")
y = 78
body(s, y)
s.add(f'<polygon points="170,{y} 186,{y - 26} 262,{y - 26} 278,{y}" class="d-box"/>')
s.add(f'<rect x="278" y="{y - 21}" width="16" height="15" rx="2" class="d-box"/>')
s.add(f'<line x1="196" y1="{y + 56}" x2="236" y2="{y + 16}" class="d-line d-rose d-stroke" stroke-width="2.5"/>')
ray(s, [(20, y + 36), (216, y + 36), (216, y - 13), (304, y - 13)])
s.text(310, y - 9, "viewfinder", "d-s")
s.text(216, y + 67, "mirror", "d-s d-rose d-ct", "middle")
s.rule(176)

s.text(20, 200, "Mirrorless", "d-t")
s.text(20, 216, "Light goes straight to the sensor, all the time", "d-s")
y = 244
body(s, y)
ray(s, [(20, y + 36), (294, y + 36)])
s.add(f'<rect x="262" y="{y + 6}" width="26" height="14" rx="2" class="d-violet d-fill" opacity="0.5"/>')
s.add(f'<path d="M296,{y + 13} h-7" class="d-line d-violet d-stroke" stroke-dasharray="2 2"/>')
s.text(250, y + 17, "viewfinder screen", "d-s d-violet d-ct", "end")
s.render()

# ── 2. Sensor sizes to scale ────────────────────────────────────
s = Svg("camera-sensors", 400, 216, "Three sensors drawn to scale and centered. Full-frame is 36 by 24 millimeters, APS-C about 23 by 15, and Micro Four Thirds 17 by 13. The smaller ones use only the middle of what a full-frame sensor would see")
s.text(20, 22, "Sensor sizes", "d-t")
s.text(20, 38, "To scale. A smaller sensor keeps only the middle of the image.", "d-s")
scale, cx, cy = 6, 128, 128
sensors = [
    ("Full-frame", 36, 24, "blue", "36 × 24 mm"),
    ("APS-C", 23, 15, "green", "about 23 × 15 mm"),
    ("Micro Four Thirds", 17, 13, "rose", "17 × 13 mm"),
]
for i, (name, w, h, acc, size) in enumerate(sensors):
    pw, ph = w * scale, h * scale
    s.add(f'<rect x="{cx - pw / 2}" y="{cy - ph / 2}" width="{pw}" height="{ph}" rx="2" class="d-{acc} d-fill" opacity="0.16"/>')
    s.add(f'<rect x="{cx - pw / 2}" y="{cy - ph / 2}" width="{pw}" height="{ph}" rx="2" class="d-line d-{acc} d-stroke"/>')
    y = 76 + i * 50
    s.add(f'<circle cx="250" cy="{y - 4}" r="4" class="d-{acc} d-fill"/>')
    s.text(260, y, name, "d-t")
    s.text(260, y + 16, size, "d-s")
s.render()
