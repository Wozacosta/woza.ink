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

# ── 3. Who absorbs a failed position (interactive: src/data/diagrams/perps-waterfall.ts) ──
s = Svg("perps-waterfall", 400, 392, "When a position fails it first goes to the order book, then a backstop such as an insurance fund or liquidator vault, and finally auto-deleveraging closes profitable traders on the other side")
steps = [
    ("trigger", "Equity below maintenance", "measured at the mark price", "blue"),
    ("book", "Market orders to the book", "almost always the end of it", "green"),
    ("backstop", "Backstop", "insurance fund or liquidator vault", "amber"),
    ("adl", "Auto-deleveraging", "winners on the other side are closed", "rose"),
]
arrows = ["liquidation starts", "the book can't absorb it", "the backstop runs out"]
bw = 262
for i, (node, title, sub, acc) in enumerate(steps):
    y = 16 + i * 94
    s.box(20, y, bw, 52, title, sub, accent=acc, node=node)
    if i in (1, 2):
        s.text(296, y + 22, "absorbed", "d-s d-green d-ct")
        s.text(296, y + 37, "→ done", "d-s d-green d-ct")
    if i < len(arrows):
        s.arrow([(64, y + 52), (64, y + 92)], arrows[i], 74, y + 76, edge=f"{node}-{steps[i + 1][0]}")
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

# ── 5. Volume in 2025, to scale ─────────────────────────────────
s = Svg("perps-volume", 400, 142, "Crypto trading volume in 2025, to scale: perpetual futures about 61.8 trillion dollars, spot about 18.6 trillion dollars")
s.text(20, 22, "Crypto volume in 2025", "d-t")
s.text(20, 38, "To scale. CryptoQuant's figures.", "d-s")
per_t = 360 / 61.8
for y, label, value, acc in ((56, "Perps", 61.8, "blue"), (98, "Spot", 18.6, "amber")):
    s.add(f'<rect x="20" y="{y}" width="{value * per_t:.1f}" height="30" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(20 + value * per_t + 8 if value < 30 else 20 + value * per_t - 8, y + 19, f"{label} ${value}T", f"d-t d-{acc} d-ct" if value < 30 else "d-t", "start" if value < 30 else "end", 'style="fill:var(--background,#faf8f5)"' if value >= 30 else "")
s.render()

# ── 6. The funding formula, plotted ─────────────────────────────
s = Svg("perps-funding", 400, 306, "The Binance funding rate plotted against the average premium. Between minus 0.04 and plus 0.06 percent the clamp holds the rate at exactly 0.01 percent. Outside that band the rate follows the premium, so a 0.10 percent premium gives a rate of 0.05 percent")
s.text(20, 22, "Funding rate against the premium", "d-t")
s.text(20, 38, "Per 8 hours, from the formula above", "d-s")
left, right, top, bottom = 44, 384, 56, 262
x_at = lambda p: left + (p + 0.16) * (right - left) / 0.36
y_at = lambda f: bottom - (f + 0.12) * (bottom - top) / 0.28
funding = lambda p: p + max(-0.05, min(0.05, 0.01 - p))
s.add(f'<rect x="{x_at(-0.04):.1f}" y="{top}" width="{x_at(0.06) - x_at(-0.04):.1f}" height="{bottom - top}" class="d-green d-fill" opacity="0.14"/>')
for p in (-0.1, 0.1, 0.2):
    s.add(f'<line x1="{x_at(p):.1f}" y1="{top}" x2="{x_at(p):.1f}" y2="{bottom}" class="d-line d-faint" stroke-dasharray="3 3"/>')
for f in (-0.1, 0.1):
    s.add(f'<line x1="{left}" y1="{y_at(f):.1f}" x2="{right}" y2="{y_at(f):.1f}" class="d-line d-faint" stroke-dasharray="3 3"/>')
s.add(f'<line x1="{left}" y1="{y_at(0):.1f}" x2="{right}" y2="{y_at(0):.1f}" class="d-line d-faint"/>')
s.add(f'<line x1="{x_at(0):.1f}" y1="{top}" x2="{x_at(0):.1f}" y2="{bottom}" class="d-line d-faint"/>')
for p, label in ((-0.1, "-0.1%"), (0, "0"), (0.1, "+0.1%"), (0.2, "+0.2%")):
    s.text(f"{x_at(p):.1f}", bottom + 15, label, "d-s", "middle" if p < 0.2 else "end")
for f, label in ((-0.1, "-0.1%"), (0, "0"), (0.1, "+0.1%")):
    s.text(left - 5, f"{y_at(f) + 4:.1f}", label, "d-s", "end")
s.text(214, bottom + 34, "Average premium of the perp over the index", "d-s", "middle")
s.add(f'<path d="{path([(x_at(p / 100), y_at(funding(p / 100))) for p in range(-16, 21)])}" class="d-line d-blue d-stroke" style="stroke-width:2"/>')
s.text(f"{x_at(0.01):.1f}", 72, "clamp holds it at 0.01%", "d-s d-green d-ct", "middle")
s.add(f'<circle cx="{x_at(0.1):.1f}" cy="{y_at(0.05):.1f}" r="5" class="d-rose d-fill"/>')
s.text(382, f"{y_at(0.05) + 26:.1f}", "0.10% in, 0.05% out", "d-s d-rose d-ct", "end")
s.render()

# ── 7. The liquidation cascade (interactive: src/data/diagrams/perps-cascade.ts) ──
s = Svg("perps-cascade", 400, 262, "The liquidation cascade is a loop. Liquidations are market sells, market sells push the price down, and a lower price triggers the next liquidations. On October 10, 2025 over 19 billion dollars of positions were closed, with 3.21 billion going in one minute")
s.text(20, 22, "The mechanism working against itself", "d-t")
s.box(110, 40, 180, 54, "Liquidations", "the engine closes accounts", accent="rose", node="liquidations")
s.box(216, 142, 164, 54, "Market sells", "hit the order book", accent="amber", node="sells")
s.box(20, 142, 164, 54, "Lower price", "trips the next accounts", accent="violet", node="price")
s.arrow([(290, 67), (298, 67), (298, 140)], edge="liquidations-sells")
s.arrow([(216, 169), (186, 169)], edge="sells-price")
s.arrow([(102, 142), (102, 67), (108, 67)], edge="price-liquidations")
s.rule(214)
s.text(20, 238, "October 10, 2025: over $19B closed, $3.21B of it in one minute", "d-s")
s.render()

# ── 8. USDe on one exchange ─────────────────────────────────────
s = Svg("perps-usde", 400, 164, "During the crash USDe fell to 65 cents on Binance's own order book while staying around 99 cents on Curve and Uniswap. Binance's unified accounts valued margin at the lower price")
s.text(20, 22, "One dollar token, two prices", "d-t")
s.text(20, 38, "USDe during the crash, to scale from $0 to $1", "d-s")
for y, label, value, acc in ((58, "Curve, Uniswap", 0.99, "green"), (106, "Binance", 0.65, "rose")):
    s.text(20, y, label, "d-s")
    s.add(f'<rect x="20" y="{y + 7}" width="{value * 300}" height="20" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(20 + value * 300 + 8, y + 22, f"${value:.2f}", f"d-t d-{acc} d-ct")
s.text(20, 154, "Cross-margined accounts were valued at the lower bar.", "d-s")
s.render()

# ── 9. JELLYJELLY (interactive: src/data/diagrams/perps-jelly.ts) ──
s = Svg("perps-jelly", 400, 330, "March 26, 2025. A large short on the thin JELLYJELLY market is liquidated, the book can't absorb it, the HLP vault inherits it and sits on about 12 million dollars of unrealized losses, then Hyperliquid's validators delist the market and settle it at 0.0095 dollars, and the loss disappears")
s.text(20, 22, "March 26, 2025: JELLYJELLY", "d-t")
rows = [
    ("short", "A large short opens", "on a thin memecoin", "blue"),
    ("liquidated", "It gets liquidated", "the book can't absorb it", "amber"),
    ("hlp", "HLP inherits the short", "about $12M of unrealized losses", "rose"),
    ("validators", "Validators delist the market", "settled at $0.0095, well below trading", "violet"),
]
for i, (node, title, sub, acc) in enumerate(rows):
    y = 40 + i * 68
    s.box(20, y, 360, 52, title, sub, accent=acc, node=node)
    if i < len(rows) - 1:
        s.arrow([(40, y + 52), (40, y + 66)], edge=f"{node}-{rows[i + 1][0]}")
s.text(20, 318, "A trader's bet became the vault's loss, then a governance decision.", "d-s")
s.render()

# ── 10. The weekend problem ─────────────────────────────────────
s = Svg("perps-weekend", 400, 264, "A sketch. While the reference market is shut for the weekend the index stops updating and the perp trades on its own flow. When the market reopens the price can move in one jump, past a long's liquidation price")
s.text(20, 22, "A perp on Sunday", "d-t")
s.text(20, 38, "A sketch, not data", "d-s")
close_x, open_x = 120, 300
top, bottom = 56, 226
s.add(f'<rect x="{close_x}" y="{top}" width="{open_x - close_x}" height="{bottom - top}" class="d-amber d-fill" opacity="0.12"/>')
s.text((close_x + open_x) / 2, 72, "reference market shut", "d-s d-amber d-ct", "middle")
s.add(f'<line x1="20" y1="170" x2="380" y2="170" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(20, 186, "long's liquidation", "d-s d-rose d-ct")
s.text(20, 100, "perp", "d-s d-blue d-ct")
s.text(20, 136, "index", "d-s")
drift = lambda x: 112 + 10 * math.sin((x - close_x) / 23) + 6 * math.sin((x - close_x) / 9)
before = [(x, 112 + 3 * math.sin(x / 13)) for x in range(20, close_x + 1, 4)]
s.add(f'<path d="{path(before)}" class="d-line d-blue d-stroke"/>')
s.add(f'<path d="{path(before)}" class="d-line" transform="translate(0,5)"/>')
s.add(f'<path d="{path([(x, drift(x)) for x in range(close_x, open_x + 1, 4)])}" class="d-line d-blue d-stroke"/>')
s.add(f'<line x1="{close_x}" y1="{before[-1][1] + 5:.1f}" x2="{open_x}" y2="{before[-1][1] + 5:.1f}" class="d-line" stroke-dasharray="4 3"/>')
s.text(210, 150, "index frozen, perp on its own flow", "d-s", "middle")
s.add(f'<path d="{path([(open_x, drift(open_x)), (open_x + 4, 200)] + [(x, 200 + 3 * math.sin(x / 11)) for x in range(open_x + 8, 381, 4)])}" class="d-line d-blue d-stroke"/>')
s.add(f'<circle cx="{open_x + 2}" cy="170" r="4" class="d-rose d-fill"/>')
s.text(380, 222, "reopens lower", "d-s", "end")
s.text(20, 250, "Friday close", "d-s")
s.text(close_x + 90, 250, "Sunday", "d-s", "middle")
s.text(380, 250, "Monday open", "d-s", "end")
s.render()
