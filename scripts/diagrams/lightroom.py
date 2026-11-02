"""Diagrams for the Lightroom alternatives post. Run: python3 scripts/diagrams/lightroom.py"""
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
s = Svg("lightroom-cost", 400, 288, "Total paid over two years. Lightroom at 19.99 dollars a month rises in a straight line. It passes ON1 Photo RAW at about 100 dollars after 5 months, DxO PhotoLab at about 240 after 12 months, and Capture One at 299 after 15 months. darktable stays at zero")
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
    ("DxO PhotoLab, about $240", 240, "amber", "12 months"),
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

# ── 4. Edits are a recipe (interactive: src/data/diagrams/lightroom-recipe.ts) ──
s = Svg("lightroom-recipe", 400, 332, "The original RAW file is read-only. The catalog stores a list of edit instructions. Processing applies that list to the original to draw the preview on screen, and again to write the exported file")
s.text(20, 22, "Edits are a recipe, not a change", "d-t")
s.text(20, 38, "The instruction values here are just examples", "d-s")
s.box(20, 58, 150, 52, "Original RAW", "Read-only", accent="blue", node="original")
s.add('<g data-node="catalog">')
s.add('<rect x="230" y="58" width="150" height="96" rx="8" class="d-box"/>')
s.add('<circle cx="244" cy="76" r="4" class="d-amber d-fill"/>')
s.text(256, 80, "Catalog", "d-t")
for i, line in enumerate(("Exposure +0.30", "Contrast +12", "Crop 3:2")):
    s.text(244, 102 + i * 16, line, "d-s d-m")
s.add("</g>")
s.box(110, 176, 180, 52, "Processing", "Applies the list on the fly", accent="violet", node="processing")
s.box(20, 268, 150, 52, "Preview", "What you see", accent="green", node="preview")
s.box(230, 268, 150, 52, "Export", "A new JPEG or TIFF", accent="green", node="export")
s.arrow([(95, 110), (95, 202), (108, 202)], edge="original-processing")
s.arrow([(305, 154), (305, 202), (292, 202)], edge="catalog-processing")
s.arrow([(170, 228), (170, 248), (95, 248), (95, 266)], edge="processing-preview")
s.arrow([(230, 228), (230, 248), (305, 248), (305, 266)], edge="processing-export")
s.render()

# ── 5. Two apps, one name ───────────────────────────────────────
s = Svg("lightroom-two-apps", 400, 262, "Lightroom Classic keeps originals on your disks with one local catalog file, edits on the desktop, and suits people who manage files. Lightroom keeps originals on Adobe's servers, edits on any device, and suits people who don't want to manage files, with less control and fewer features")
s.text(20, 22, "Two apps, nearly one name", "d-t")
s.text(20, 38, "Where each one puts things", "d-s")
s.text(116, 64, "Classic", "d-t d-blue d-ct")
s.text(254, 64, "Lightroom (cloud)", "d-t d-violet d-ct")
rows = [
    ("Originals", "Your own disks", "Adobe's servers"),
    ("Catalog", "One local SQLite file", "Adobe's servers"),
    ("Edit on", "The desktop", "Any device or browser"),
    ("Weak spot", "100,000+ images", "Less control"),
    ("Made for", "Hands-on organizers", "Hands-off users"),
]
for i, (label, classic, cloud) in enumerate(rows):
    y = 90 + i * 34
    s.add(f'<line x1="20" y1="{y - 19}" x2="380" y2="{y - 19}" class="d-line d-faint"/>')
    s.text(20, y, label, "d-s")
    s.text(116, y, classic, "d-s")
    s.text(254, y, cloud, "d-s")
s.render()

# ── 6. One catalog or many sessions ─────────────────────────────
s = Svg("lightroom-sessions", 400, 262, "A catalog holds every shoot in one file. Capture One's sessions give each shoot its own folder, with Capture, Selects, Output and Trash folders inside, so a job can be handed over or archived whole")
s.text(20, 22, "One big catalog, or one folder per job", "d-t")
s.text(20, 52, "Catalog", "d-s")
s.add('<rect x="20" y="62" width="170" height="150" rx="6" class="d-box"/>')
palette = ("blue", "amber", "green", "rose")
for i in range(36):
    col, row = i % 6, i // 6
    s.add(f'<rect x="{32 + col * 25}" y="{74 + row * 21}" width="21" height="17" rx="2" class="d-{palette[i // 9]} d-fill" opacity="0.7"/>')
s.text(20, 234, "Every shoot in one file", "d-t")
s.text(20, 250, "Each color here is a shoot", "d-s")
s.text(210, 52, "Sessions", "d-s")
for i, (name, acc) in enumerate((("Shoot 1", "blue"), ("Shoot 2", "amber"), ("Shoot 3", "green"))):
    y = 62 if i == 0 else 158 + (i - 1) * 27
    h = 90 if i == 0 else 22
    s.add(f'<rect x="210" y="{y}" width="170" height="{h}" rx="4" class="d-line d-{acc} d-stroke"/>')
    s.add(f'<rect x="210" y="{y}" width="170" height="22" rx="4" class="d-{acc} d-fill" opacity="0.2"/>')
    s.text(222, y + 15, name, "d-s")
for i, folder in enumerate(("Capture", "Selects")):
    s.text(226, 110 + i * 18, folder, "d-s d-m")
for i, folder in enumerate(("Output", "Trash")):
    s.text(306, 110 + i * 18, folder, "d-s d-m")
s.text(210, 234, "Each shoot stands alone", "d-t")
s.text(210, 250, "Hand it over, or archive it", "d-s")
s.render()

# ── 7. What two or three stops buy ──────────────────────────────
s = Svg("lightroom-iso-stops", 400, 214, "Bars to scale for ISO 1600, 3200, 6400 and 12800, each double the last. A file shot at ISO 12800 and cleaned two to three stops better looks like one shot at ISO 3200 to 1600")
s.text(20, 22, "What two or three stops buy", "d-t")
s.text(20, 38, "One stop is a doubling, so the bars double", "d-s")
for i, (iso, acc, note) in enumerate(((12800, "rose", "Shot here"), (6400, None, None), (3200, "green", None), (1600, "green", None))):
    y = 58 + i * 34
    w = iso * 360 / 12800
    fill = f"d-{acc} d-fill" if acc else "d-line d-faint"
    op = ' opacity="0.8"' if acc else ""
    style = "" if acc else ' style="fill:var(--line-strong,#cfc8bc)"'
    s.add(f'<rect x="20" y="{y}" width="{w}" height="22" rx="2" class="{fill}"{op}{style}/>')
    if iso == 12800:
        s.text(30, y + 15, f"ISO {iso}", "d-t", "start", 'style="fill:var(--background,#faf8f5)"')
    else:
        s.text(20 + w + 8, y + 15, f"ISO {iso}", "d-s")
s.add('<path d="M196,126 h10 v56 h-10" class="d-line"/>')
s.text(216, 150, "Reads like this after", "d-s")
s.text(216, 166, "DeepPRIME XD3", "d-t d-green d-ct")
s.render()

# ── 8. Built for one stack ──────────────────────────────────────
s = Svg("lightroom-apple-stack", 400, 226, "Photomator sits directly on Apple's own layers: SwiftUI for the interface, Core ML for its machine learning, Metal for the graphics chip, and Apple silicon with its Neural Engine underneath")
s.text(20, 22, "One app, one vendor's stack", "d-t")
s.text(20, 38, "Each layer below it comes from Apple", "d-s")
s.add('<rect x="20" y="54" width="360" height="34" rx="6" class="d-amber d-fill" opacity="0.25"/>')
s.add('<rect x="20" y="54" width="360" height="34" rx="6" class="d-line d-amber d-stroke"/>')
s.text(34, 76, "Photomator", "d-t")
layers = [("SwiftUI", "The interface"), ("Core ML", "The auto-adjustments"), ("Metal", "The graphics chip"), ("Apple silicon", "Includes the Neural Engine")]
for i, (name, note) in enumerate(layers):
    y = 94 + i * 30
    s.add(f'<rect x="20" y="{y}" width="360" height="26" rx="4" class="d-box"/>')
    s.text(34, y + 17.5, name, "d-t")
    s.text(366, y + 17.5, note, "d-s", "end")
s.render()

# ── 9. The darktable learning curve ─────────────────────────────
s = Svg("lightroom-learning-curve", 400, 232, "A sketch of productivity over hours of use. Lightroom starts high on day one. darktable starts low and takes hours of learning to catch up, then ends with more control")
s.text(20, 22, "Hours of learning before day one", "d-t")
s.text(20, 38, "A sketch of the shape, not a measurement", "d-s")
x0, y0 = 36, 190
s.add(f'<line x1="{x0}" y1="{y0}" x2="380" y2="{y0}" class="d-line d-faint"/>')
s.add(f'<line x1="{x0}" y1="58" x2="{x0}" y2="{y0}" class="d-line d-faint"/>')
s.text(380, y0 + 16, "Hours of use", "d-s", "end")
s.add(f'<path d="M{x0},{y0 - 74} C110,100 170,96 370,92" class="d-line d-rose d-stroke" stroke-width="2"/>')
s.add(f'<path d="M{x0},{y0 - 8} C150,186 190,120 250,92 S340,66 370,62" class="d-line d-green d-stroke" stroke-width="2"/>')
s.text(370, 112, "Lightroom", "d-s d-rose d-ct", "end")
s.text(370, 54, "darktable", "d-s d-green d-ct", "end")
s.add(f'<line x1="244" y1="96" x2="244" y2="{y0}" class="d-line d-faint" stroke-dasharray="4 3"/>')
s.text(236, 180, "Caught up", "d-s", "end")
s.render()

# ── 10. Where each tool runs, and how you pay ───────────────────
s = Svg("lightroom-field", 400, 348, "Ten photo tools. All run on Mac. All but Photomator run on Windows. Only darktable, RawTherapee and digiKam run on Linux, and those three are free. Affinity is free too. Lightroom is a subscription, and the rest can be bought once")
s.text(20, 22, "Where each tool runs, and how you pay", "d-t")
s.text(20, 38, "Only the open-source tools reach Linux", "d-s")
cols = (("Mac", 186), ("Win", 222), ("Linux", 260))
for label, x in cols:
    s.text(x, 62, label, "d-s", "middle")
s.text(380, 62, "Cost", "d-s", "end")
tools = [
    ("Lightroom", 1, 1, 0, "$19.99 a month", "rose"),
    ("Capture One", 1, 1, 0, "$299, or a plan", "amber"),
    ("DxO PhotoLab", 1, 1, 0, "About $240", "amber"),
    ("ON1 Photo RAW", 1, 1, 0, "About $100", "amber"),
    ("Luminar Neo", 1, 1, 0, "Once, or a plan", "amber"),
    ("Photomator", 1, 0, 0, "Once, or a plan", "amber"),
    ("Affinity", 1, 1, 0, "Free", "green"),
    ("darktable", 1, 1, 1, "Free", "green"),
    ("RawTherapee", 1, 1, 1, "Free", "green"),
    ("digiKam", 1, 1, 1, "Free", "green"),
]
for i, (name, mac, win, linux, cost, acc) in enumerate(tools):
    y = 88 + i * 26
    s.add(f'<line x1="20" y1="{y - 17}" x2="380" y2="{y - 17}" class="d-line d-faint"/>')
    s.text(20, y, name, "d-t")
    for (label, x), on in zip(cols, (mac, win, linux)):
        if on:
            s.add(f'<circle cx="{x}" cy="{y - 4}" r="5" class="d-{acc} d-fill"/>')
        else:
            s.add(f'<circle cx="{x}" cy="{y - 4}" r="4.5" class="d-line d-faint"/>')
    s.text(380, y, cost, f"d-s d-{acc} d-ct", "end")
s.render()

# ── 11. Same shoot, three tools (interactive: src/data/diagrams/lightroom-triage.ts) ──
s = Svg("lightroom-triage", 400, 256, "One shoot split across three tools. The cleanest files go through Lightroom for speed, high-ISO keepers through DxO for noise reduction, and the hero shots through Capture One for color")
s.text(20, 22, "Same shoot, three tools", "d-t")
s.text(20, 38, "The tools aren't mutually exclusive", "d-s")
s.box(20, 124, 96, 52, "One shoot", "Sort by need", node="shoot")
for i, (node, name, sub, acc, label) in enumerate((
    ("lightroom", "Lightroom", "For speed", "rose", "Cleanest"),
    ("dxo", "DxO PhotoLab", "For noise reduction", "amber", "High ISO"),
    ("capture-one", "Capture One", "For perfect color", "violet", "Hero shots"),
)):
    y = 58 + i * 66
    s.box(226, y, 154, 52, name, sub, accent=acc, node=node)
    pts = [(116, 150), (146, 150), (146, y + 26), (224, y + 26)] if i != 1 else [(116, 150), (224, 150)]
    s.arrow(pts, label, 154, y + 21, edge=f"shoot-{node}")
s.render()

# ── 12. Three kinds of library (interactive: src/data/diagrams/lightroom-dam.ts) ──
s = Svg("lightroom-dam", 400, 256, "Three ways to manage photos. A catalog has strong search but ties you to the software. Folders and sidecar files are portable but weaker at search. Cloud libraries work anywhere but depend on the service, and migration is painful. Ratings are a sketch")
s.text(20, 22, "Three ways to keep a library", "d-t")
s.text(20, 38, "Filled dots mean strong. A sketch of the trade-offs.", "d-s")
models = (
    ("catalog", "Catalog", 88, "amber", (3, 1, 1)),
    ("folders", "Folders", 188, "green", (1, 3, 1)),
    ("cloud", "Cloud", 288, "blue", (2, 1, 3)),
)
rows = ("Search", "Portability", "Anywhere")
for i, label in enumerate(rows):
    y = 134 + i * 36
    s.add(f'<line x1="20" y1="{y - 22}" x2="380" y2="{y - 22}" class="d-line d-faint"/>')
    s.text(20, y, label, "d-s")
for node, title, x, acc, scores in models:
    s.box(x + 0, 58, 92, 44, title, node=node, anchor="middle")
    for i, score in enumerate(scores):
        y = 134 + i * 36 - 4
        for dot in range(3):
            cx = x + 26 + dot * 20
            if dot < score:
                s.add(f'<circle cx="{cx}" cy="{y}" r="6" class="d-{acc} d-fill"/>')
            else:
                s.add(f'<circle cx="{cx}" cy="{y}" r="5.5" class="d-line d-faint"/>')
s.render()

# ── 13. What upscaling multiplies ───────────────────────────────
s = Svg("lightroom-upscale", 400, 280, "Three rectangles to scale. Doubling a photo's width and height gives four times the pixels. Quadrupling them gives sixteen times the pixels")
s.text(20, 22, "Double the sides, quadruple the pixels", "d-t")
s.text(20, 38, "To scale. A big print needs width, and a crop eats it.", "d-s")
scale, x0, y0 = 60, 20, 266
for factor, acc, label in ((4, "blue", "4× the sides: 16× the pixels"), (2, "green", "2× the sides: 4× the pixels"), (1, "rose", "Original")):
    w, h = 90 * factor, 52.5 * factor
    s.add(f'<rect x="{x0}" y="{y0 - h}" width="{w}" height="{h}" rx="2" class="d-{acc} d-fill" opacity="0.14"/>')
    s.add(f'<rect x="{x0}" y="{y0 - h}" width="{w}" height="{h}" rx="2" class="d-line d-{acc} d-stroke"/>')
    if factor == 1:
        s.text(x0 + 8, y0 - 8, label, f"d-s d-{acc} d-ct")
    else:
        s.text(x0 + 8, y0 - h + 16, label, f"d-s d-{acc} d-ct")
s.render()
