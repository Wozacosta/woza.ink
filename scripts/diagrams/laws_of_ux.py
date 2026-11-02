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

# ── 3. Map of the post (interactive: src/data/diagrams/ux-trust.ts) ──
s = Svg("ux-trust", 400, 360, "The nine laws sorted into three tiers. Measured: Fitts's law and Hick's law. Real findings with fine print: Miller's law, choice overload, the peak-end rule and the aesthetic-usability effect. Good advice with a law's name: the Doherty threshold, Jakob's law and Tesler's law")
s.text(20, 22, "Nine laws, sorted by trust", "d-t")
s.text(20, 38, "From fitted equations down to well-argued opinions", "d-s")
tiers = [
    ("Measured: you can calculate these", "green", [("fitts", "Fitts's law"), ("hick", "Hick's law")]),
    ("Real findings, with fine print", "amber", [("miller", "Miller's law"), ("choice", "Choice overload"), ("peak-end", "Peak-end rule"), ("aesthetic", "Aesthetic-usability")]),
    ("Good advice with a law's name", "rose", [("doherty", "Doherty threshold"), ("jakob", "Jakob's law"), ("tesler", "Tesler's law")]),
]
y = 62
for label, acc, laws in tiers:
    s.text(20, y, label, f"d-s d-{acc} d-ct")
    y += 8
    for i, (node, title) in enumerate(laws):
        s.box(20 + (i % 2) * 184, y + (i // 2) * 46, 176, 38, title, accent=acc, node=node)
    y += ((len(laws) + 1) // 2) * 46 + 18
s.render()

# ── 4. Why edges are fast ───────────────────────────────────────
s = Svg("ux-edges", 400, 246, "Two screens. A menu floating inside a window can be overshot, so the pointer has to slow down. A menu bar on the screen edge can't be overshot, because the pointer stops at the edge")
s.text(20, 22, "Why the screen edge is so fast to hit", "d-t")
s.text(20, 52, "Inside a window", "d-s")
s.add('<rect x="20" y="62" width="170" height="130" rx="4" class="d-box"/>')
s.add('<rect x="40" y="112" width="130" height="18" rx="2" class="d-rose d-fill" opacity="0.8"/>')
s.add('<circle cx="105" cy="178" r="4" class="d-blue d-fill"/>')
s.arrow([(105, 172), (105, 84)])
s.text(20, 212, "Overshoot and you miss,", "d-t")
s.text(20, 230, "so you have to slow down", "d-s")
s.text(210, 52, "On the screen edge", "d-s")
s.add('<rect x="210" y="62" width="170" height="130" rx="4" class="d-box"/>')
s.add('<rect x="210" y="62" width="170" height="18" rx="2" class="d-green d-fill" opacity="0.85"/>')
s.add('<circle cx="295" cy="178" r="4" class="d-blue d-fill"/>')
s.arrow([(295, 172), (295, 66)])
s.text(210, 212, "Push as hard as you like:", "d-t")
s.text(210, 230, "the pointer stops at the edge", "d-s")
s.render()

# ── 5. Hick's law ───────────────────────────────────────────────
s = Svg("ux-hick", 400, 236, "A logarithmic curve of reaction time against number of options. Four options cost 2.3 units, eight cost 3.2 and sixteen cost 4.1. Reading an unfamiliar list grows in a straight, steeper line instead, sketched here")
s.text(20, 22, "Each doubling adds about the same", "d-t")
s.text(20, 38, "Time = log2(n + 1), in units of b", "d-s")
x0, y0, px, py = 60, 190, 9.5, 26
X = lambda n: x0 + n * px
Y = lambda v: y0 - v * py
s.add(f'<line x1="{x0}" y1="{y0}" x2="{X(33)}" y2="{y0}" class="d-line d-faint"/>')
for n in (0, 8, 16, 32):
    s.text(X(n), y0 + 16, str(n), "d-s", "middle")
s.text(X(16), y0 + 34, "Number of options", "d-s", "middle")
s.add(f'<path d="M{X(0)},{Y(0)} L{X(6)},{Y(5)}" class="d-line" stroke-dasharray="4 3"/>')
curve = " L".join(f"{X(n / 4)},{Y(math.log2(n / 4 + 1)):.1f}" for n in range(129))
s.add(f'<path d="M{curve}" class="d-line d-green d-stroke" stroke-width="2"/>')
for n in (4, 8, 16):
    v = math.log2(n + 1)
    s.add(f'<circle cx="{X(n)}" cy="{Y(v):.1f}" r="4" class="d-green d-fill"/>')
    s.text(X(n) + 9, round(Y(v) + 15, 1), f"{n} options: {v:.1f}", "d-s")
s.text(X(32), 124, "Options you already know", "d-s d-green d-ct", "end")
s.text(X(6) + 6, Y(5) + 2, "Reading a list you don't know", "d-s")
s.text(X(6) + 6, Y(5) + 16, "(the slope is a sketch)", "d-s")
s.render()

# ── 6. Chunks ───────────────────────────────────────────────────
s = Svg("ux-chunks", 400, 206, "The same ten digits held three ways: ten separate items, five pairs, or one number you know by heart")
s.text(20, 22, "Same digits, fewer things to hold", "d-t")
s.text(20, 38, "Memory counts meaningful units, not information", "d-s")
digits = "0612345678"
s.text(20, 66, "Ten items", "d-s")
for i, d in enumerate(digits):
    s.add(f'<rect x="{20 + i * 36}" y="74" width="32" height="32" rx="4" class="d-box"/>')
    s.text(36 + i * 36, 95, d, "d-t d-m", "middle", 'style="font-size:13px"')
s.text(20, 130, "Five chunks", "d-s")
for i in range(5):
    s.add(f'<rect x="{20 + i * 72}" y="138" width="68" height="32" rx="4" class="d-amber d-fill" opacity="0.2"/>')
    s.add(f'<rect x="{20 + i * 72}" y="138" width="68" height="32" rx="4" class="d-line d-amber d-stroke"/>')
    s.text(54 + i * 72, 159, digits[i * 2:i * 2 + 2], "d-t d-m", "middle", 'style="font-size:13px"')
s.text(20, 194, "One chunk, if you know the number by heart", "d-s")
s.text(380, 194, digits, "d-t d-m d-green d-ct", "end", 'style="font-size:13px"')
s.render()

# ── 7. The jam study ────────────────────────────────────────────
s = Svg("ux-jam", 400, 262, "Of 100 passers-by, the table with 24 jams drew 60 and sold to about 2. The table with 6 jams drew 40 and sold to 12. A 2010 meta-analysis of 50 experiments and 5,036 people found a mean effect of virtually zero")
s.text(20, 22, "The jam study, per 100 passers-by", "d-t")
s.text(20, 38, "Iyengar and Lepper, 2000", "d-s")
scale = 4
for i, (label, stop, buy, acc) in enumerate([("24 jams", 60, 1.8, "rose"), ("6 jams", 40, 12, "green")]):
    y = 66 + i * 76
    s.text(20, y, label, "d-t")
    s.add(f'<rect x="20" y="{y + 8}" width="{stop * scale}" height="16" rx="2" class="d-{acc} d-fill" opacity="0.3"/>')
    s.text(20 + stop * scale + 8, y + 20, f"{stop} stop", "d-s")
    s.add(f'<rect x="20" y="{y + 28}" width="{buy * scale}" height="16" rx="2" class="d-{acc} d-fill"/>')
    s.text(20 + buy * scale + 8, y + 40, f"{buy:g} buy", f"d-s d-{acc} d-ct")
s.rule(200)
s.text(20, 224, "Ten years later: 50 experiments, 5,036 people", "d-t")
s.text(20, 242, "Mean effect of more options: virtually zero", "d-s")
s.render()

# ── 8. Aesthetic-usability ──────────────────────────────────────
s = Svg("ux-aesthetic", 400, 196, "How easy people thought an ATM was tracked how attractive they found it more closely than it tracked how easy it actually was")
s.text(20, 22, "What ease ratings really track", "d-t")
s.text(20, 38, "252 people rating 26 ATM layouts. Not to scale.", "d-s")
s.box(20, 58, 146, 44, "Attractive", accent="violet")
s.box(20, 136, 146, 44, "Actually easy", accent="blue")
s.box(244, 97, 136, 44, "Seems easy", accent="green")
s.add(f'<path d="M166,80 L242,112" class="d-line d-violet d-stroke" stroke-width="2.5" marker-end="url(#ah-ux-aesthetic)"/>')
s.add(f'<path d="M166,158 L242,128" class="d-line d-faint" stroke-dasharray="4 3" marker-end="url(#ah-ux-aesthetic)"/>')
s.text(216, 82, "closely", "d-s d-violet d-ct")
s.text(216, 162, "less closely", "d-s")
s.render()

# ── 9. Response times ───────────────────────────────────────────
s = Svg("ux-response", 400, 170, "A log scale of response times. 0.1 seconds feels instant, 400 milliseconds is the Doherty threshold, 1 second keeps a train of thought, 2 seconds was the old idea of fast enough, and 10 seconds is where attention goes")
s.text(20, 22, "Response time, on a log scale", "d-t")
s.text(20, 38, "Doherty's number among the classic limits", "d-s")
Xt = lambda sec: 30 + 170 * (math.log10(sec) + 1)
s.add(f'<line x1="{Xt(0.1)}" y1="112" x2="{Xt(10)}" y2="112" class="d-line"/>')
marks = [
    (0.1, "0.1 s", "feels instant", "above", "start", "green"),
    (0.4, "0.4 s", "Doherty's budget", "below", "middle", "amber"),
    (1, "1 s", "train of thought holds", "above", "middle", "blue"),
    (2, "2 s", "1982's \"fast enough\"", "below", "middle", "rose"),
    (10, "10 s", "attention goes", "above", "end", "rose"),
]
for sec, value, note, side, anchor, acc in marks:
    x = Xt(sec)
    s.add(f'<circle cx="{x:.1f}" cy="112" r="5" class="d-{acc} d-fill"/>')
    if side == "above":
        s.text(round(x, 1), 78, value, f"d-t d-{acc} d-ct", anchor)
        s.text(round(x, 1), 94, note, "d-s", anchor)
    else:
        s.text(round(x, 1), 140, value, f"d-t d-{acc} d-ct", anchor)
        s.text(round(x, 1), 156, note, "d-s", anchor)
s.render()

# ── 10. Jakob's law ─────────────────────────────────────────────
s = Svg("ux-jakob", 400, 232, "Two page wireframes. On the left the logo is top left and the cart top right, where people learned to expect them. On the right they've moved, so visitors have to learn the page first")
s.text(20, 22, "Conventions are learned somewhere else", "d-t")


def page(s, x, label, acc, logo, cart):
    s.text(x, 52, label, f"d-s d-{acc} d-ct")
    s.add(f'<rect x="{x}" y="60" width="170" height="126" rx="4" class="d-box"/>')
    for i, w in enumerate((130, 110, 120)):
        s.add(f'<rect x="{x + 16}" y="{112 + i * 14}" width="{w}" height="6" rx="1" class="d-line d-faint"/>')
    s.text(x + logo[0], logo[1], "logo", f"d-t d-{acc} d-ct", logo[2])
    s.text(x + cart[0], cart[1], "cart", f"d-t d-{acc} d-ct", cart[2])


page(s, 20, "Where you expect them", "green", (14, 84, "start"), (156, 84, "end"))
s.add('<line x1="20" y1="96" x2="190" y2="96" class="d-line d-faint"/>')
page(s, 210, "Somewhere you'd have to learn", "rose", (156, 176, "end"), (14, 84, "start"))
s.add('<line x1="210" y1="96" x2="380" y2="96" class="d-line d-faint"/>')
s.text(20, 212, "Every break is something a user has to relearn", "d-s")
s.render()

# ── 11. Tesler's law ────────────────────────────────────────────
s = Svg("ux-tesler", 400, 216, "Two bars of the same length. Signing raw calldata leaves most of the complexity with the person signing. Clear signing moves most of it to the people writing the descriptors. The total doesn't change")
s.text(20, 22, "Complexity moves, it doesn't shrink", "d-t")
s.text(20, 38, "Same total length. A sketch: nobody can measure this.", "d-s")
for i, (label, user) in enumerate([("Signing raw calldata", 300), ("Clear signing with ERC-7730", 60)]):
    y = 66 + i * 58
    s.text(20, y, label, "d-t")
    s.add(f'<rect x="20" y="{y + 8}" width="{user - 1}" height="26" rx="2" class="d-rose d-fill" opacity="0.8"/>')
    s.add(f'<rect x="{20 + user + 1}" y="{y + 8}" width="{359 - user}" height="26" rx="2" class="d-blue d-fill" opacity="0.8"/>')
s.add('<circle cx="24" cy="188" r="4" class="d-rose d-fill"/>')
s.text(34, 192, "Person signing", "d-s")
s.add('<circle cx="144" cy="188" r="4" class="d-blue d-fill"/>')
s.text(154, 192, "People writing and auditing descriptors", "d-s")
s.render()
