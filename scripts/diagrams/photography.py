"""Diagrams for the camera guide. Run: python3 scripts/diagrams/photography.py"""
import math

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
s = Svg("camera-night-stack", 400, 268, "A phone in Night Sight captures 6 to 15 frames, aligns them, removes noise and adjusts the tones, and finishes one image in a few seconds. A dedicated camera gives you a single raw capture and you decide how it looks")
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
s.text(20, 142, "6-15 frames", "d-s")
s.text(198, 142, "A few seconds, by software", "d-s", "middle")
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

# ── 5. Exposure triangle (interactive: src/data/diagrams/camera-exposure.ts) ──
s = Svg("camera-exposure", 400, 346, "A triangle of aperture, shutter speed and ISO. Aperture also changes background blur, shutter speed changes motion blur and ISO changes noise. Three example settings give the same exposure by trading one stop between them")
s.text(20, 22, "Three settings, one exposure", "d-t")
s.text(20, 38, "Each one has a side effect", "d-s")
for edge, a, b in (("aperture-shutter", (200, 104), (98, 206)), ("aperture-iso", (200, 104), (302, 206)), ("shutter-iso", (154, 232), (246, 232))):
    s.add(f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}" class="d-line" data-edge="{edge}"/>')
s.text(200, 186, "Exposure", "d-t", "middle")
s.box(120, 54, 160, 50, "Aperture", "Background blur", accent="blue", node="aperture")
s.box(20, 206, 134, 50, "Shutter speed", "Motion blur", accent="green", node="shutter")
s.box(246, 206, 134, 50, "ISO", "Noise", accent="rose", node="iso")
s.text(20, 280, "Same brightness, three ways", "d-s")
for i, (aperture, shutter, iso, note) in enumerate((
    ("f/2.8", "1/250", "ISO 400", "Start here"),
    ("f/4", "1/125", "ISO 400", "Less light in, for longer"),
    ("f/4", "1/250", "ISO 800", "Less light in, amplified"),
)):
    y = 298 + i * 17
    s.text(20, y, aperture, "d-s d-m")
    s.text(66, y, shutter, "d-s d-m")
    s.text(116, y, iso, "d-s d-m")
    s.text(380, y, note, "d-s", "end")
s.render()

# ── 6. Five mounts on a timeline (interactive: src/data/diagrams/camera-mounts.ts) ──
s = Svg("camera-mounts", 400, 272, "When each mount arrived, to scale: Micro Four Thirds in 2008, Sony E in 2010, Fujifilm X in 2012, and Nikon Z and Canon RF in 2018. All five are still running")
s.text(20, 22, "Five mounts, by age", "d-t")
s.text(20, 38, "To scale, from launch to 2026", "d-s")
Xm = lambda year: 20 + (year - 2008) * 20
mounts = [
    ("mft", "Micro Four Thirds", 2008, "rose"),
    ("sony", "Sony E", 2010, "blue"),
    ("fuji", "Fujifilm X", 2012, "green"),
    ("nikon", "Nikon Z", 2018, "blue"),
    ("canon", "Canon RF", 2018, "blue"),
]
for i, (node, name, year, acc) in enumerate(mounts):
    s.box(Xm(year), 54 + i * 34, Xm(2026) - Xm(year), 28, name, accent=acc, node=node)
s.add(f'<line x1="{Xm(2008)}" y1="228" x2="{Xm(2026)}" y2="228" class="d-line d-faint"/>')
for year in (2008, 2012, 2016, 2020, 2024):
    s.text(Xm(year) + (9 if year == 2008 else 0), 242, str(year), "d-s", "middle" if year != 2008 else "middle")
for x, acc, label in ((24, "blue", "Full-frame and APS-C"), (170, "green", "APS-C only"), (254, "rose", "Micro Four Thirds")):
    s.add(f'<circle cx="{x}" cy="260" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 10, 264, label, "d-s")
s.render()

# ── 7. Crop factor, as a picture ────────────────────────────────
s = Svg("camera-crop", 400, 186, "The same scene from the same spot with the same 50mm lens. On full-frame the bird is small. On APS-C it fills 1.5 times as much of the frame, as a 75mm lens would. On Micro Four Thirds it fills twice as much, like a 100mm lens")
s.text(20, 22, "Same lens, same spot, three sensors", "d-t")
s.text(20, 38, "Enlarged to the same print width. An illustration.", "d-s")
tiles = ((20, 1, "Full-frame", "Looks like 50mm", "blue", 76), (142, 1.5, "APS-C", "Looks like 75mm", "green", 76), (264, 2, "Micro Four Thirds", "Looks like 100mm", "rose", 87))
for x, zoom, name, look, acc, h in tiles:
    cid = f"crop-{name[:2].lower()}"
    s.add(f'<clipPath id="{cid}"><rect x="{x}" y="52" width="116" height="{h}" rx="3"/></clipPath>')
    cx, cy = x + 58, 52 + h / 2
    s.add(f'<g clip-path="url(#{cid})">')
    s.add(f'<rect x="{x}" y="52" width="116" height="{h}" class="d-box" style="stroke:none"/>')
    s.add(f'<g transform="translate({cx} {cy}) scale({zoom})">')
    s.add('<rect x="-116" y="16" width="232" height="60" class="d-green d-fill" opacity="0.22"/>')
    s.add('<circle cx="-34" cy="-16" r="8" class="d-amber d-fill" opacity="0.45"/>')
    s.add('<path d="M38,18 L38,-14" class="d-line d-amber d-stroke" stroke-width="2"/>')
    s.add('<circle cx="38" cy="-18" r="11" class="d-green d-fill" opacity="0.55"/>')
    s.add('<path d="M-10,2 q5,-7 10,-1 q5,-6 10,1 q-5,-3 -10,1 q-5,-4 -10,-1 z" class="d-violet d-fill"/>')
    s.add("</g></g>")
    s.add(f'<rect x="{x}" y="52" width="116" height="{h}" rx="3" class="d-line d-{acc} d-stroke"/>')
    s.text(x, 156, name, "d-s", "start")
    s.text(x, 172, look, f"d-s d-{acc} d-ct", "start")
s.render()

# ── 8. Depth of field to scale (interactive: src/data/diagrams/camera-dof.ts) ──
def dof(focal, n, coc, dist=2000):
    """Thin-lens near and far limits in mm for a subject at dist mm."""
    h = focal ** 2 / (n * coc) + focal
    return dist * (h - focal) / (h + dist - 2 * focal), dist * (h - focal) / (h - dist)


s = Svg("camera-dof", 400, 262, "How much stays sharp at f/1.8 with the same framing and a subject 2 meters away, to scale. About 17 centimeters on full-frame, 26 on APS-C, 34 on Micro Four Thirds and 47 on a 1-inch phone sensor")
s.text(20, 22, "How much stays sharp", "d-t")
s.text(20, 38, "Same framing, f/1.8, subject at 2 m. Computed, to scale.", "d-s")
Xd = lambda mm: 20 + (mm - 1700) * 0.48
rows = [
    ("ff", "Full-frame", 50, 1, "blue"),
    ("apsc", "APS-C", 50 / 1.5, 1.5, "green"),
    ("mft", "Micro Four Thirds", 25, 2, "rose"),
    ("phone", "1-inch phone", 50 / 2.73, 2.73, "amber"),
]
s.add(f'<line x1="{Xd(2000)}" y1="50" x2="{Xd(2000)}" y2="222" class="d-line d-faint" stroke-dasharray="4 3"/>')
for i, (node, name, focal, crop, acc) in enumerate(rows):
    near, far = dof(focal, 1.8, 0.03 / crop)
    y = 66 + i * 40
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="16" y="{y - 14}" width="368" height="38" rx="6" class="d-ext" style="stroke-opacity:0"/>')
    s.text(20, y, name, "d-s")
    s.text(380, y, f"{(far - near) / 10:.0f} cm", f"d-t d-{acc} d-ct", "end")
    s.add(f'<rect x="{Xd(near):.1f}" y="{y + 6}" width="{(far - near) * 0.48:.1f}" height="14" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.add("</g>")
s.add('<line x1="20" y1="226" x2="380" y2="226" class="d-line d-faint"/>')
for m in (1800, 2000, 2200, 2400):
    s.text(Xd(m), 242, f"{m / 1000:.1f} m", "d-s", "middle")
s.text(20, 256, "Subject on the dashed line", "d-s")
s.render()

# ── 9. Aperture to scale ────────────────────────────────────────
s = Svg("camera-aperture", 400, 224, "Lens openings to scale at 50 millimeters. A 50mm f/1.8 prime opens to about 28 millimeters. The Z DX 16-50mm kit zoom at f/6.3 opens to about 8 millimeters, so the prime lets in about 12 times the light")
s.text(20, 22, "Why a fast prime teaches more", "d-t")
s.text(20, 38, "Openings at 50mm, to scale: focal length / f-number", "d-s")
mm = 4
for cx, n, name, acc in ((90, 1.8, "50mm f/1.8 prime", "green"), (290, 6.3, "Kit zoom at 50mm f/6.3", "rose")):
    d = 50 / n
    s.add(f'<circle cx="{cx}" cy="116" r="{d * mm / 2:.1f}" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(cx, 186, name, "d-t", "middle")
    s.text(cx, 202, f"{d:.0f} mm across", f"d-s d-{acc} d-ct", "middle")
s.text(190, 120, "(6.3 / 1.8)² =", "d-s", "middle")
s.text(190, 136, "12× the light", "d-t", "middle")
s.render()

# ── 10. Focal lengths to scale ──────────────────────────────────
s = Svg("camera-focal-lengths", 400, 312, "Horizontal angle of view on full-frame, drawn to scale from one camera position. 16mm sees 97 degrees, 35mm 54, 50mm 40, 85mm 24, 200mm 10 and 600mm 3.4 degrees")
s.text(20, 22, "What a focal length sees", "d-t")
s.text(20, 38, "Full-frame, angles to scale", "d-s")
ox, oy = 200, 296
for focal, r, acc in ((16, 128, "rose"), (35, 158, "amber"), (50, 182, "green"), (85, 204, "blue"), (200, 224, "violet"), (600, 244, "rose")):
    half = math.atan(36 / (2 * focal))
    lx, ly = ox - r * math.sin(half), oy - r * math.cos(half)
    rx, ry = ox + r * math.sin(half), ly
    s.add(f'<path d="M{ox},{oy} L{lx:.1f},{ly:.1f} A{r},{r} 0 0 1 {rx:.1f},{ry:.1f} Z" class="d-{acc} d-fill" opacity="0.12"/>')
    s.add(f'<path d="M{ox},{oy} L{lx:.1f},{ly:.1f} A{r},{r} 0 0 1 {rx:.1f},{ry:.1f} Z" class="d-line d-{acc} d-stroke"/>')
    angle = math.degrees(2 * half)
    label = f"{focal}mm, {angle:.1f}°" if angle < 10 else f"{focal}mm, {angle:.0f}°"
    s.text(round(rx + 7, 1), round(ry + 4, 1), label, f"d-s d-{acc} d-ct")
s.add(f'<circle cx="{ox}" cy="{oy}" r="5" class="d-box" style="fill:var(--foreground,#1a1a1a);stroke:none"/>')
s.text(ox + 10, oy + 4, "Camera", "d-s")
s.render()

# ── 11. Sensor area, in light ───────────────────────────────────
s = Svg("camera-sensor-area", 400, 218, "Sensor areas to scale. Full-frame is 864 square millimeters. APS-C is about 345, 2.5 times smaller. Micro Four Thirds is 221, 3.9 times smaller. A 1-inch phone sensor is 116, 7.4 times smaller")
s.text(20, 22, "A big phone sensor, to scale", "d-t")
s.text(20, 38, "Area collects the light, so this is the bar that matters", "d-s")
rows = [("Full-frame", 36 * 24, "blue"), ("APS-C", 23 * 15, "green"), ("Micro Four Thirds", 17 * 13, "rose"), ("1-inch phone", 13.2 * 8.8, "amber")]
for i, (name, area, acc) in enumerate(rows):
    y = 62 + i * 38
    s.text(20, y, name, "d-t")
    note = f"{area:.0f} mm²" if i == 0 else f"{area:.0f} mm², {864 / area:.1f}× less light"
    s.text(380, y, note, f"d-s d-{acc} d-ct", "end")
    s.add(f'<rect x="20" y="{y + 6}" width="{area * 360 / 864:.1f}" height="14" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
s.render()

# ── 12. Prices to scale ─────────────────────────────────────────
s = Svg("camera-prices", 400, 292, "Seven cameras by price, to scale. Canon EOS R100 with a kit lens 480 dollars, Fujifilm X-M5 800, Canon EOS R10 880, Nikon Z50 II 960, Sony A6700 1,500, Nikon Z6 III 2,000 and Sony A7C II 2,100. The last two are full-frame")
s.text(20, 22, "The list, to scale", "d-t")
s.text(20, 38, "Body prices, except the R100 kit. Prices move.", "d-s")
cameras = [("Canon EOS R100 kit", 480, "green"), ("Fujifilm X-M5", 800, "green"), ("Canon EOS R10", 880, "green"), ("Nikon Z50 II", 960, "green"), ("Sony A6700", 1500, "green"), ("Nikon Z6 III", 2000, "blue"), ("Sony A7C II", 2100, "blue")]
px = 230 / 2100
for i, (name, price, acc) in enumerate(cameras):
    y = 66 + i * 28
    s.text(20, y, name, "d-s")
    s.add(f'<rect x="130" y="{y - 11}" width="{price * px:.1f}" height="14" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
    label = f"${price:,}"
    if price * px > 196:
        s.text(round(130 + price * px - 6, 1), y, label, "d-s", "end", 'style="fill:var(--background,#faf8f5)"')
    else:
        s.text(round(130 + price * px + 6, 1), y, label, "d-s")
s.add('<circle cx="24" cy="268" r="4" class="d-green d-fill"/>')
s.text(34, 272, "APS-C", "d-s")
s.add('<circle cx="94" cy="268" r="4" class="d-blue d-fill"/>')
s.text(104, 272, "Full-frame", "d-s")
s.render()

# ── 13. What buying used saves ──────────────────────────────────
s = Svg("camera-used", 400, 236, "To scale. A body one generation behind costs 50 to 60 percent of the current price and gives 90 percent of the performance. A Canon EF 70-200mm f/2.8L IS II costs 2,000 dollars new and 900 to 1,100 used")
s.text(20, 22, "What one generation back costs you", "d-t")
s.text(20, 38, "Bars to scale, using the numbers above", "d-s")
W = 300
s.text(20, 66, "Body, one generation behind", "d-t")
for y, label, lo, hi, acc in ((74, "Price", 0.5, 0.6, "green"), (98, "Performance", 0.9, 0.9, "blue")):
    s.add(f'<rect x="20" y="{y}" width="{W}" height="18" rx="2" class="d-line d-faint"/>')
    s.add(f'<rect x="20" y="{y}" width="{W * lo}" height="18" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
    if hi > lo:
        s.add(f'<rect x="{20 + W * lo}" y="{y}" width="{W * (hi - lo)}" height="18" class="d-{acc} d-fill" opacity="0.35"/>')
    s.text(330, y + 14, "50-60%" if hi > lo else "90%", f"d-s d-{acc} d-ct")
s.text(20, 146, "Canon EF 70-200mm f/2.8L IS II", "d-t")
for y, lo, hi, acc, note in ((154, 2000, 2000, "rose", "$2,000 new"), (178, 900, 1100, "green", "$900-1,100")):
    k = 300 / 2000
    s.add(f'<rect x="20" y="{y}" width="{lo * k}" height="18" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
    if hi > lo:
        s.add(f'<rect x="{20 + lo * k}" y="{y}" width="{(hi - lo) * k}" height="18" class="d-{acc} d-fill" opacity="0.35"/>')
    s.text(330, y + 14, note, f"d-s d-{acc} d-ct")
s.text(20, 222, "Pale ends show the range", "d-s")
s.render()

# ── 14. What a frame costs ──────────────────────────────────────
s = Svg("camera-film-cost", 400, 196, "A strip of 36 frames. A roll at 10 dollars plus development and scanning at 15 to 20 dollars is 25 to 30 dollars, or 69 to 83 cents a frame")
s.text(20, 22, "What each frame costs", "d-t")
s.text(20, 38, "One roll of Kodak Gold 200, developed and scanned", "d-s")
for row in range(2):
    top = 52 + row * 44
    s.add(f'<rect x="20" y="{top}" width="360" height="38" rx="2" style="fill:var(--foreground,#1a1a1a)" opacity="0.82"/>')
    for i in range(18):
        s.add(f'<rect x="{23 + i * 20}" y="{top + 8}" width="17" height="22" rx="1" class="d-amber d-fill" opacity="0.75"/>')
        for hole in (top + 2.5, top + 32.5):
            s.add(f'<rect x="{26 + i * 20}" y="{hole}" width="3" height="3" style="fill:var(--background,#faf8f5)"/>')
            s.add(f'<rect x="{34 + i * 20}" y="{hole}" width="3" height="3" style="fill:var(--background,#faf8f5)"/>')
s.text(20, 160, "$10 roll + $15-20 lab = $25-30", "d-s")
s.text(380, 160, "36 frames", "d-s", "end")
s.text(20, 182, "69 to 83 cents every time you press the shutter", "d-t")
s.render()

# ── 15. What to buy (interactive: src/data/diagrams/camera-buy.ts) ──
s = Svg("camera-buy", 400, 348, "A decision path. If you're not sure, shoot with your phone for a month first. If you are, a tight budget leads to the Nikon Z50 II with its kit lens, a stretch budget to the Fujifilm X-M5 or Canon R10, and full-frame to the Sony A7C II. Every path ends with one body and two lenses")
s.text(20, 22, "Which path are you on?", "d-t")
s.text(20, 38, "The picks above, as a map", "d-s")
s.box(20, 54, 170, 52, "Sure you want one?", "Starting from zero", accent="violet", node="sure")
s.box(250, 54, 130, 52, "Phone first", "One careful month", accent="amber", node="phone")
s.box(100, 138, 200, 44, "How far can you go?", anchor="middle", node="budget")
s.arrow([(190, 80), (248, 80)], "Not yet", 219, 73, "middle", edge="sure-phone")
s.arrow([(105, 106), (105, 122), (200, 122), (200, 136)], "Yes", 113, 119, edge="sure-budget")
s.arrow([(315, 106), (315, 160), (302, 160)], "Frustrated?", 323, 136, edge="phone-budget")
for i, (node, name, sub, label, acc) in enumerate((
    ("tight", "Nikon Z50 II", "With the kit lens", "Tight", "green"),
    ("stretch", "X-M5 or R10", "Skip the kit lens", "Stretch", "blue"),
    ("full", "Sony A7C II", "Full-frame", "Full-frame", "rose"),
)):
    x = 20 + i * 123
    s.box(x, 216, 114, 52, name, sub, node=node)
    cx = x + 57
    pts = [(200, 182), (200, 214)] if i == 1 else [(200 + (i - 1) * 54, 182), (200 + (i - 1) * 54, 198), (cx, 198), (cx, 214)]
    lx = {0: cx - 7, 1: 206, 2: cx + 7}[i]
    s.arrow(pts, label, lx, 195 if i == 1 else 210, {0: "end", 1: "start", 2: "start"}[i], edge=f"budget-{node}")
    s.arrow([(cx, 268), (cx, 298)], edge=f"{node}-lenses")
s.box(20, 300, 360, 36, "One body, two lenses", anchor="middle", accent=None, node="lenses")
s.render()

# ── 16. Shipments to scale ──────────────────────────────────────
s = Svg("camera-shipments", 400, 148, "Camera shipments in 2025, to scale, from CIPA: 6.31 million mirrorless cameras against 691,000 DSLRs, about nine to one")
s.text(20, 22, "The 2025 shipments, to scale", "d-t")
s.text(20, 38, "CIPA figures, in units", "d-s")
for i, (name, units, label, acc) in enumerate((("Mirrorless", 6.31, "6.31 million", "green"), ("DSLR", 0.691, "691,000", "rose"))):
    y = 60 + i * 42
    w = units * 360 / 6.31
    s.text(20, y, name, "d-t")
    s.text(380, y, label, f"d-s d-{acc} d-ct", "end")
    s.add(f'<rect x="20" y="{y + 7}" width="{w:.1f}" height="16" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
s.render()
