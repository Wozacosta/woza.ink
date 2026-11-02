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

# ── 3. Bodies vs lenses ─────────────────────────────────────────
s = Svg("camera-lens-life", 400, 234, "A ten-year timeline. Three camera bodies follow each other, replaced every three to four years, each worth 40 to 60 percent less after two years. One lens runs across the whole decade and holds its value")
s.text(20, 22, "What you keep for a decade", "d-t")
s.text(20, 38, "A sketch, with a new body every 3.5 years", "d-s")
X = lambda year: 20 + year * 36
on_fill = 'style="fill:var(--background,#faf8f5)"'
s.text(20, 62, "Bodies, replaced every 3 to 4 years", "d-s")
for i, (start, end) in enumerate(((0, 3.5), (3.5, 7), (7, 10))):
    s.add(f'<rect x="{X(start)}" y="70" width="{(end - start) * 36 - 3}" height="32" rx="3" class="d-rose d-fill" opacity="0.8"/>')
    s.text(X(start) + 10, 90, f"Body {i + 1}", "d-t", "start", on_fill)
s.add(f'<line x1="{X(2)}" y1="102" x2="{X(2)}" y2="112" class="d-line"/>')
s.text(X(2) + 6, 118, "After two years: worth 40-60% less", "d-s")
s.text(20, 146, "One good lens, holding its value", "d-s")
s.add(f'<rect x="{X(0)}" y="154" width="{10 * 36}" height="32" rx="3" class="d-green d-fill" opacity="0.85"/>')
s.text(X(0) + 10, 174, "Lens", "d-t", "start", on_fill)
s.add(f'<line x1="{X(0)}" y1="198" x2="{X(10)}" y2="198" class="d-line d-faint"/>')
for year in (0, 2, 4, 6, 8):
    s.text(X(year), 214, str(year), "d-s", "middle")
s.text(X(10), 214, "10 years", "d-s", "end")
s.render()

# ── 4. Merged frames vs one capture ─────────────────────────────
s = Svg("camera-night-stack", 400, 268, "A phone in Night Sight captures 15 to 30 frames, aligns them, removes noise and adjusts the tones, and finishes one image in under two seconds. A dedicated camera gives you a single raw capture and you decide how it looks")
s.text(20, 22, "Who finishes the picture", "d-t")
s.text(20, 38, "Software on a phone, you on a camera", "d-s")
s.text(20, 66, "Phone, Night Sight", "d-t")
for i in range(5, -1, -1):
    s.add(f'<rect x="{20 + i * 2}" y="{78 + i * 2}" width="44" height="32" rx="2" class="d-box"/>')
s.arrow([(78, 100), (92, 100)])
for i, name in enumerate(("Align", "Denoise", "Tones")):
    x = 94 + i * 74
    s.box(x, 78, 60, 44, name, anchor="middle")
    if i < 2:
        s.arrow([(x + 60, 100), (x + 72, 100)])
s.arrow([(302, 100), (322, 100)])
s.add('<rect x="324" y="78" width="56" height="44" rx="3" class="d-green d-fill" opacity="0.8"/>')
s.text(20, 142, "15-30 frames", "d-s")
s.text(198, 142, "Under two seconds, by software", "d-s", "middle")
s.text(380, 142, "One image", "d-s", "end")
s.rule(158)
s.text(20, 186, "Dedicated camera", "d-t")
s.add('<rect x="20" y="198" width="44" height="32" rx="2" class="d-box"/>')
s.arrow([(68, 214), (92, 214)])
s.box(94, 192, 208, 44, "You decide how it looks", anchor="middle")
s.arrow([(302, 214), (322, 214)])
s.add('<rect x="324" y="192" width="56" height="44" rx="3" class="d-green d-fill" opacity="0.8"/>')
s.text(20, 256, "One raw capture", "d-s")
s.text(380, 256, "One image", "d-s", "end")
s.render()
