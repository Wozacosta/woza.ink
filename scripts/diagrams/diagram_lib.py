"""Helpers for the blog's theme-aware SVG diagrams.

SVGs use CSS variables from src/app/globals.css (with light fallbacks), so they follow the
page theme when inlined. Boxes with node= and arrows with edge= get data-node / data-edge
attributes, which src/data/diagrams/* can use to make a diagram interactive.
"""
import os
from xml.sax.saxutils import escape

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public", "diagrams")
os.makedirs(OUT, exist_ok=True)

FONT = "var(--font-inter,Inter),system-ui,-apple-system,sans-serif"
MONO = "var(--font-mono,ui-monospace),Menlo,monospace"

STYLE = f"""<style>
.d-box{{fill:var(--surface,#f1ede6);stroke:var(--line-strong,#cfc8bc);stroke-width:1}}
.d-ext{{fill:none;stroke:var(--line-strong,#cfc8bc);stroke-width:1;stroke-dasharray:4 3}}
.d-t{{fill:var(--foreground,#1a1a1a);font-family:{FONT};font-size:13px;font-weight:600}}
.d-s{{fill:var(--subtle,#6b665f);font-family:{FONT};font-size:11px}}
.d-m{{font-family:{MONO};font-size:10.5px}}
.d-line{{stroke:var(--subtle,#6b665f);stroke-width:1.25;fill:none}}
.d-faint{{stroke:var(--line-strong,#cfc8bc)}}
.d-head{{fill:var(--subtle,#6b665f)}}
.d-violet{{--c:var(--d-violet,#6d28d9)}}.d-blue{{--c:var(--d-blue,#1d4ed8)}}.d-amber{{--c:var(--d-amber,#92400e)}}
.d-green{{--c:var(--d-green,#047857)}}.d-rose{{--c:var(--d-rose,#be123c)}}
.d-fill{{fill:var(--c)}}.d-stroke{{stroke:var(--c)}}.d-ct{{fill:var(--c)}}
</style>"""


class Svg:
    def __init__(self, name, w, h, title):
        self.name, self.w, self.h, self.title = name, w, h, title
        self.parts = []

    def add(self, s):
        self.parts.append(s)

    def text(self, x, y, s, cls="d-t", anchor="start", extra=""):
        self.add(f'<text x="{x}" y="{y}" class="{cls}" text-anchor="{anchor}" {extra}>{escape(s)}</text>')

    def box(self, x, y, w, h, title, sub=None, accent=None, dashed=False, anchor="start", node=None):
        if node:
            self.add(f'<g data-node="{node}">')
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" class="{"d-ext" if dashed else "d-box"}"/>')
        tx = x + 14 if anchor == "start" else x + w / 2
        if accent and anchor == "start":
            cy = y + 18 if (sub or h > 60) else y + h / 2
            self.add(f'<circle cx="{x + 14}" cy="{cy}" r="4" class="d-{accent} d-fill"/>')
            tx = x + 26
        if sub:
            self.text(tx, y + 22, title, "d-t", anchor)
            self.text(tx, y + 38, sub, "d-s", anchor)
        elif h > 60:
            self.text(tx, y + 24, title, "d-t", anchor)
        else:
            self.text(tx, y + h / 2 + 4.5, title, "d-t", anchor)
        if node:
            self.add("</g>")

    def arrow(self, pts, label=None, lx=None, ly=None, lanchor="start", faint=False, dashed=False, edge=None):
        d = "M" + " L".join(f"{x},{y}" for x, y in pts)
        cls = "d-line" + (" d-faint" if faint else "")
        dash = ' stroke-dasharray="4 3"' if dashed else ""
        attr = f' data-edge="{edge}"' if edge else ""
        self.add(f'<path d="{d}" class="{cls}"{dash}{attr} marker-end="url(#ah-{self.name})"/>')
        if label:
            self.text(lx, ly, label, "d-s", lanchor, attr.strip())

    def render(self):
        defs = (
            f'<defs><marker id="ah-{self.name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" '
            f'markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="d-head"/></marker></defs>'
        )
        body = "\n".join(self.parts)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" role="img" '
            f'aria-labelledby="t-{self.name}"><title id="t-{self.name}">{escape(self.title)}</title>\n'
            f"{STYLE}\n{defs}\n{body}\n</svg>\n"
        )
        with open(os.path.join(OUT, f"{self.name}.svg"), "w") as f:
            f.write(svg)
        print("wrote", self.name, self.w, "x", self.h)


