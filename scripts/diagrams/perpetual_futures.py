"""Diagrams for the perpetual futures post. Run: python3 scripts/diagrams/perpetual_futures.py"""
import math

from diagram_lib import *


def path(points):
    return "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in points)


# ── 1. Expiry vs funding ────────────────────────────────────────
s = Svg("perps-expiry", 400, 356, "A dated future is forced to meet the spot price at expiry. A perp has no expiry, so funding pulls it back: above the index longs pay shorts, below it shorts pay longs")
s.text(20, 22, "Dated future", "d-t")
s.text(20, 38, "The calendar forces the price to meet spot", "d-s")
expiry = 340
spot = lambda x: 112 - 9 * math.sin(x / 46) - 4 * math.sin(x / 19)
xs = range(20, expiry + 1, 4)
s.add(f'<path d="{path([(x, spot(x)) for x in xs])}" class="d-line"/>')
s.add(f'<path d="{path([(x, spot(x) - 36 * (expiry - x) / (expiry - 20)) for x in xs])}" class="d-line d-blue d-stroke"/>')
s.add(f'<line x1="{expiry}" y1="54" x2="{expiry}" y2="146" class="d-line d-faint" stroke-dasharray="4 3"/>')
s.text(expiry + 6, 66, "expiry", "d-s")
s.text(76, 72, "future", "d-s d-blue d-ct")
s.text(76, 139, "spot", "d-s")
s.add('<line x1="20" y1="168" x2="380" y2="168" class="d-line d-faint"/>')

s.text(20, 192, "Perp", "d-t")
s.text(20, 208, "No expiry, so funding does the pulling", "d-s")
mid = 278
index = lambda x: mid + 3 * math.sin(x / 31)
perp = lambda x: index(x) - 30 * math.sin((x - 20) / 57)
xs = range(20, 361, 4)
s.add(f'<path d="{path([(x, index(x)) for x in xs])}" class="d-line" marker-end="url(#ah-perps-expiry)"/>')
s.add(f'<path d="{path([(x, perp(x)) for x in xs])}" class="d-line d-blue d-stroke" marker-end="url(#ah-perps-expiry)"/>')
s.text(110, 238, "above index: longs pay shorts", "d-s d-green d-ct", "middle")
s.text(290, 331, "below index: shorts pay longs", "d-s d-rose d-ct", "middle")
s.text(20, 300, "index", "d-s")
s.text(380, 250, "no end date", "d-s", "end")
s.render()

# ── 2. A 10x long, from entry to bankruptcy ─────────────────────
s = Svg("perps-margin", 400, 376, "A 10x long opened at 100,000 with 1,000 dollars of margin. With a 2.5 percent maintenance margin it is liquidated near 92,300. At 90,000 the margin is gone; below that the loss belongs to someone else")
s.text(20, 22, "10x long: $1,000 margin, $10,000 position", "d-t")
top, liq, bank, bottom = 54, 239, 294, 346  # 24px per 1% of price, down to the bankruptcy line
axis = 104
for y0, y1, acc, opacity in ((top, liq, "green", 0.14), (liq, bank, "amber", 0.2), (bank, bottom, "rose", 0.2)):
    s.add(f'<rect x="{axis}" y="{y0}" width="276" height="{y1 - y0}" class="d-{acc} d-fill" opacity="{opacity}"/>')
s.add(f'<line x1="{axis}" y1="{top}" x2="{axis}" y2="{bottom}" class="d-line"/>')
for y, price, cls in ((top, "$100,000", "d-green"), (liq, "$92,308", "d-amber"), (bank, "$90,000", "d-rose")):
    s.add(f'<line x1="{axis - 5}" y1="{y}" x2="{axis + 5}" y2="{y}" class="d-line"/>')
    s.text(axis - 10, y + 4, price, f"d-s {cls} d-ct", "end")
s.text(118, top + 22, "Entry. Equity $1,000", "d-t")
s.text(118, top + 39, "Every 1% down costs $100 of your $1,000", "d-s")
s.text(118, liq - 12, "Equity falls to 2.5% of the position", "d-s")
s.text(118, liq + 20, "Liquidation. Equity $231", "d-t")
s.text(118, liq + 37, "The engine has this far to close you out", "d-s")
s.text(118, bank + 20, "Bankruptcy. Equity $0", "d-t")
s.text(118, bank + 37, "Past here the loss is someone else's", "d-s")
s.text(20, 368, "Bitcoin price, to scale. The position is 0.1 BTC, 2.5% maintenance.", "d-s")
s.render()

# ── 3. Who absorbs a failed position ────────────────────────────
s = Svg("perps-waterfall", 400, 392, "When a position fails it first goes to the order book, then a backstop such as an insurance fund or liquidator vault, and finally auto-deleveraging closes profitable traders on the other side")
steps = [
    ("Equity below maintenance", "measured at the mark price", "blue"),
    ("Market orders to the book", "almost always the end of it", "green"),
    ("Backstop", "insurance fund or liquidator vault", "amber"),
    ("Auto-deleveraging", "winners on the other side are closed", "rose"),
]
arrows = ["liquidation starts", "the book can't absorb it", "the backstop runs out"]
bw = 262
for i, (title, sub, acc) in enumerate(steps):
    y = 16 + i * 94
    s.box(20, y, bw, 52, title, sub, accent=acc)
    if i in (1, 2):
        s.text(296, y + 22, "absorbed", "d-s d-green d-ct")
        s.text(296, y + 37, "→ done", "d-s d-green d-ct")
    if i < len(arrows):
        s.arrow([(64, y + 52), (64, y + 92)], arrows[i], 74, y + 76)
s.text(20, 374, "Each step moves the loss further from the trader who took the risk.", "d-s")
s.render()

# ── 4. The basis trade ──────────────────────────────────────────
s = Svg("perps-carry", 400, 246, "Buying one bitcoin on spot and shorting one bitcoin perp cancels the price exposure and leaves the funding payments, with several risks")
s.box(20, 20, 172, 52, "Long 1 BTC spot", "gains if the price rises", accent="green")
s.box(20, 92, 172, 52, "Short 1 BTC perp", "gains if the price falls", accent="rose")
s.box(244, 56, 136, 52, "Flat on price", "keeps the funding", accent="blue")
s.arrow([(192, 46), (218, 46), (218, 82), (242, 82)])
s.arrow([(192, 118), (218, 118), (218, 82), (242, 82)])
s.add('<line x1="20" y1="166" x2="380" y2="166" class="d-line d-faint"/>')
s.text(20, 188, "Baseline funding of 0.01% every 8 hours is about 11% a year", "d-s")
s.text(20, 206, "It breaks if funding turns negative, the exchange fails, or", "d-s")
s.text(20, 222, "the short leg is auto-deleveraged and leaves you long", "d-s")
s.render()
