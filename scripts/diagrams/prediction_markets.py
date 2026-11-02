"""Diagrams for the prediction markets post. Run: python3 scripts/diagrams/prediction_markets.py"""
from diagram_lib import *

# ── 1. How the shares work ──────────────────────────────────────
s = Svg("pm-shares", 400, 300, "One dollar of collateral mints a YES and a NO share; their prices are the market's probabilities; at resolution the winning share pays one dollar")
s.text(20, 22, "Will X happen before the deadline?", "d-t")
s.box(20, 48, 128, 64, "$1 collateral", "USDC, or TYD", accent="blue")
s.text(84, 130, "mint a pair", "d-s", "middle")
s.box(196, 36, 184, 44, "YES", "pays $1 if X happens", accent="green")
s.box(196, 90, 184, 44, "NO", "pays $1 if it doesn't", accent="rose")
s.arrow([(148, 72), (170, 72), (170, 58), (194, 58)])
s.arrow([(170, 72), (170, 112), (194, 112)])
# price bar
y = 172
split = 20 + 360 * 0.62
s.text(20, y - 8, "YES 0.62", "d-s d-green d-ct")
s.text(380, y - 8, "NO 0.38", "d-s d-rose d-ct", "end")
s.add(f'<rect x="20" y="{y}" width="{split - 20}" height="14" rx="3" class="d-green d-fill" opacity="0.85"/>')
s.add(f'<rect x="{split + 2}" y="{y}" width="{380 - split - 2}" height="14" rx="3" class="d-rose d-fill" opacity="0.85"/>')
s.text(200, y + 32, "The price is the market's probability: 62%", "d-s", "middle")
s.add('<line x1="20" y1="226" x2="380" y2="226" class="d-line d-faint"/>')
s.text(20, 250, "At resolution", "d-t")
s.text(20, 270, "X happens → YES redeems for $1, NO for $0", "d-s")
s.text(20, 287, "A YES + NO pair always redeems for $1, so prices sum to ~1", "d-s")
s.render()

# ── 2. Trueo's escalation ladder (interactive: src/data/diagrams/trueo-escalation.ts) ──
s = Svg("trueo-escalation", 400, 486, "Trueo resolution: market rules fixed on-chain, a bonded proposal, then optional escalation to the Oracle Council, TRUE holders, and finally eleven random attesters")
steps = [
    ("created", "Market created", "question, criteria, sources fixed on-chain", "blue"),
    ("proposal", "Proposal", "a resolver proposes, 250 TYD bond", "violet"),
    ("council", "Oracle Council", "5 members arbitrate, set who's slashed", "amber"),
    ("holders", "TRUE holders vote", "on the outcome and the slashing", "amber"),
    ("attesters", "11 random attesters", "final verdict", "rose"),
]
arrows = [
    "event happens",
    "12 h to challenge, 250 TYD bond",
    "12 h to escalate, 750 TYD bond",
    "escalator holds ≥ 250k TRUE",
]
bw = 262
for i, (node, title, sub, acc) in enumerate(steps):
    y = 16 + i * 94
    s.box(20, y, bw, 52, title, sub, accent=acc, node=node)
    if 1 <= i <= 3:
        s.text(296, y + 22, "no challenge", "d-s d-green d-ct")
        s.text(296, y + 37, "→ resolved", "d-s d-green d-ct")
    if i < len(arrows):
        s.arrow([(64, y + 52), (64, y + 92)], arrows[i], 74, y + 76, edge=f"{node}-{steps[i + 1][0]}")
s.text(20, 480, "Each step costs more to reach and is more neutral than the last.", "d-s")
s.render()

# ── 3. A decision market (interactive: src/data/diagrams/pm-decision.ts) ──
s = Svg("pm-decision", 400, 256, "A decision market runs one conditional market per policy, both pricing the same metric. Whichever policy the market prices higher is the one adopted")
s.text(20, 22, "To choose between two policies", "d-t")
s.box(20, 40, 164, 54, "Market on A", "the metric if A happens", accent="blue", node="a")
s.box(20, 110, 164, 54, "Market on B", "the metric if B happens", accent="violet", node="b")
s.box(232, 74, 148, 54, "Compare", "the two prices", accent="amber", node="compare")
s.box(232, 182, 148, 54, "Adopt the winner", "priced higher", accent="green", node="adopt")
s.arrow([(184, 67), (208, 67), (208, 101), (230, 101)], edge="a-compare")
s.arrow([(184, 137), (208, 137), (208, 101), (230, 101)], edge="b-compare")
s.arrow([(306, 128), (306, 180)], edge="compare-adopt")
s.text(20, 196, "The metric could be", "d-s")
s.text(20, 212, "a token price or", "d-s")
s.text(20, 228, "a health outcome", "d-s")
s.render()

# ── 4. Vitalik's 2020 trade, to scale ───────────────────────────
s = Svg("pm-capital", 400, 276, "Vitalik's 2020 trade, to scale. Trump supporters offset his position with about 60,000 dollars. He bet 308,249 DAI to earn 56,803 dollars, and needed around a million dollars of capital to do it")
s.text(20, 22, "What correcting the price cost", "d-t")
s.text(20, 38, "Vitalik's 2020 trade, to scale", "d-s")
per_dollar = 360 / 1_000_000
rows = [
    ("Capital tied up", "about $1,000,000", 1_000_000, "rose"),
    ("His bet", "308,249 DAI", 308_249, "amber"),
    ("His profit", "$56,803", 56_803, "green"),
    ("What offset his bet", "about $60,000", 60_000, "violet"),
]
for i, (label, value, amount, acc) in enumerate(rows):
    y = 62 + i * 50
    s.text(20, y, label, "d-s")
    s.text(380, y, value, f"d-s d-{acc} d-ct", "end")
    s.add(f'<rect x="20" y="{y + 7}" width="{amount * per_dollar:.1f}" height="20" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
s.text(20, 266, "Locked for about two months.", "d-s")
s.render()

# ── 5. UMA's optimistic oracle (interactive: src/data/diagrams/pm-uma.ts) ──
s = Svg("pm-uma", 400, 268, "UMA's optimistic oracle. Someone proposes an answer and posts a bond. If nobody challenges within a window the answer stands. If someone does, the dispute goes to a vote of UMA token holders, weighted by tokens held")
s.box(20, 16, 360, 54, "Proposal", "someone proposes an answer and posts a bond", accent="violet", node="proposal")
s.arrow([(200, 70), (200, 98)], edge="proposal-window")
s.box(20, 100, 360, 54, "Challenge window", "anyone can dispute it", accent="amber", node="window")
s.arrow([(104, 154), (104, 198)], "no challenge", 112, 180, edge="window-stands")
s.arrow([(296, 154), (296, 198)], "challenged", 304, 180, edge="window-vote")
s.box(20, 200, 172, 54, "Answer stands", "fast and cheap", accent="green", node="stands")
s.box(208, 200, 172, 54, "UMA token vote", "weighted by tokens held", accent="rose", node="vote")
s.render()

# ── 6. The Strategy dispute, day by day ─────────────────────────
s = Svg("pm-strategy", 400, 232, "The Strategy dispute, to scale. Strategy sold 32 BTC between May 26 and May 31. The market's deadline was May 31. The SEC filing came out on June 1, and a UMA vote finalized No on June 3. Two traders sued on July 3")
s.text(20, 22, "One day late", "d-t")
s.text(20, 38, "To scale, May 26 to June 3, 2026", "d-s")
x_day = lambda d: 28 + d * 43  # days after May 26
axis = 112
s.add(f'<rect x="{x_day(0)}" y="{axis - 10}" width="{x_day(5) - x_day(0)}" height="20" rx="3" class="d-green d-fill" opacity="0.75"/>')
s.text(x_day(0), axis - 18, "32 BTC sold, May 26–31", "d-s d-green d-ct")
s.add(f'<line x1="{x_day(0)}" y1="{axis + 10}" x2="{x_day(8)}" y2="{axis + 10}" class="d-line"/>')
for d in range(9):
    s.add(f'<line x1="{x_day(d)}" y1="{axis + 7}" x2="{x_day(d)}" y2="{axis + 13}" class="d-line"/>')
marks = [(5, "Deadline", "May 31", "amber", 150, "end"), (6, "Filing published", "June 1", "rose", 150, "start"), (8, "UMA vote: No", "June 3", "violet", 66, "end")]
for d, title, date, acc, y, anchor in marks:
    y0, y1 = (axis + 10, y - 12) if y < axis else (axis + 10, y + 16)
    s.add(f'<line x1="{x_day(d)}" y1="{y0}" x2="{x_day(d)}" y2="{y1}" class="d-line d-{acc} d-stroke"/>')
    dx = -6 if anchor == "end" else 6
    s.text(x_day(d) + dx, y, title, f"d-t d-{acc} d-ct", anchor)
    s.text(x_day(d) + dx, y + 15, date, "d-s", anchor)
s.text(20, 222, "Two traders sued on July 3, off this chart.", "d-s")
s.render()

# ── 7. Who trades, in numbers ───────────────────────────────────
s = Svg("pm-volume", 400, 214, "Combined monthly volume on Kalshi and Polymarket, to scale: under 5 billion dollars in September 2025, over 50 billion in July 2026, and 45.33 billion in August 2026, of which Kalshi handled 37.17 billion, about 82 percent")
s.text(20, 22, "Combined monthly volume", "d-t")
s.text(20, 38, "Kalshi and Polymarket, to scale", "d-s")
per_b = 360 / 52
rows = [("September 2025", "under $5B", 5), ("July 2026", "over $50B", 50)]
for i, (label, value, amount) in enumerate(rows):
    y = 60 + i * 46
    s.text(20, y, label, "d-s")
    s.text(380, y, value, "d-s", "end")
    s.add(f'<rect x="20" y="{y + 7}" width="{amount * per_b:.1f}" height="18" rx="3" class="d-blue d-fill" opacity="0.75"/>')
y = 152
s.text(20, y, "August 2026", "d-s")
s.text(380, y, "$45.33B", "d-s", "end")
s.add(f'<rect x="20" y="{y + 7}" width="{37.17 * per_b:.1f}" height="18" rx="3" class="d-green d-fill" opacity="0.8"/>')
s.add(f'<rect x="{20 + 37.17 * per_b + 2:.1f}" y="{y + 7}" width="{8.16 * per_b - 2:.1f}" height="18" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.text(20, y + 42, "Kalshi $37.17B", "d-s d-green d-ct")
s.text(20 + (37.17 + 8.16) * per_b, y + 42, "Polymarket $8.16B", "d-s d-rose d-ct", "end")
s.render()

# ── 8. Two oracles side by side ─────────────────────────────────
s = Svg("pm-oracles", 400, 268, "Polymarket with UMA next to Trueo. Polymarket's rules can gain a clarification after trading starts; Trueo's are fixed on-chain at creation. Polymarket's disputes go straight to a UMA token vote; Trueo's go to a five-member council first. UMA holders have the last word on Polymarket, eleven random attesters on Trueo. Collateral is plain USDC on one and yield-bearing TYD on the other")
s.text(112, 22, "Polymarket + UMA", "d-t")
s.text(256, 22, "Trueo", "d-t")
rows = [
    ("Rules", "Clarified after outcomes", "Fixed at creation"),
    ("Proposal", "Bonded, then a window", "250 TYD, 12 hours"),
    ("Dispute", "UMA token vote", "Council of 5 first"),
    ("Last word", "UMA holders", "11 random attesters"),
    ("Collateral", "USDC, zero yield", "TYD, earns yield"),
]
for i, (label, left, right) in enumerate(rows):
    y = 34 + i * 46
    s.add(f'<rect x="20" y="{y}" width="360" height="40" rx="8" class="d-box"/>')
    s.text(32, y + 24, label, "d-s")
    s.text(112, y + 24, left, "d-s d-rose d-ct")
    s.text(256, y + 24, right, "d-s d-green d-ct")
s.render()

# ── 9. What locked collateral earns ─────────────────────────────
s = Svg("pm-collateral", 400, 208, "A sketch of a position held for months. Bare USDC stays flat, so being right late still loses against a savings account. Collateral in TYD grows at about a lending rate while the bet is open")
s.text(20, 22, "Holding a position while you wait", "d-t")
s.text(20, 38, "A sketch, not a rate", "d-s")
base, top, x0, x1 = 160, 72, 30, 370
s.add(f'<line x1="{x0}" y1="{top - 12}" x2="{x0}" y2="{base + 16}" class="d-line d-faint"/>')
s.add(f'<path d="M{x0},{base} L{x1},{top}" class="d-line d-green d-stroke" style="stroke-width:2"/>')
s.add(f'<path d="M{x0},{base} L{x1},{base}" class="d-line d-rose d-stroke" style="stroke-width:2"/>')
s.text(x1, top - 10, "TYD: earns about a lending rate", "d-s d-green d-ct", "end")
s.text(x1, base - 8, "Bare USDC: zero", "d-s d-rose d-ct", "end")
s.text(x0, base + 30, "Deposit", "d-s")
s.text(x1, base + 30, "Resolution", "d-s", "end")
s.render()

# ── 10. Hedging instead of betting ──────────────────────────────
s = Svg("pm-hedge", 400, 134, "Vitalik's hedging idea as a flow. A local AI looks at what you spend money on and builds a basket of positions that pays out when those costs rise")
s.text(20, 22, "A market as insurance", "d-t")
stages = [("Your spending", "what it costs you", "blue"), ("Local AI", "builds a basket", "violet"), ("Positions", "pay if costs rise", "green")]
for i, (title, sub, acc) in enumerate(stages):
    x = 20 + i * 126
    s.add(f'<rect x="{x}" y="40" width="108" height="64" rx="8" class="d-box"/>')
    s.add(f'<circle cx="{x + 14}" cy="58" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 24, 62, title.split()[0] if i == 0 else title, "d-t")
    if i == 0:
        s.text(x + 24, 77, title.split()[1], "d-t")
    s.text(x + 14, 95, sub, "d-s")
    if i < 2:
        s.arrow([(x + 108, 72), (x + 124, 72)])
s.render()
