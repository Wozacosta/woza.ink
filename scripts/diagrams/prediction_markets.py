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

# ── 2. Trueo's escalation ladder ────────────────────────────────
s = Svg("trueo-escalation", 400, 486, "Trueo resolution: market rules fixed on-chain, a bonded proposal, then optional escalation to the Oracle Council, TRUE holders, and finally eleven random attesters")
steps = [
    ("Market created", "question, criteria, sources fixed on-chain", "blue"),
    ("Proposal", "a resolver proposes, 250 TYD bond", "violet"),
    ("Oracle Council", "5 members arbitrate, set who's slashed", "amber"),
    ("TRUE holders vote", "on the outcome and the slashing", "amber"),
    ("11 random attesters", "final verdict", "rose"),
]
arrows = [
    "event happens",
    "12 h to challenge, 250 TYD bond",
    "12 h to escalate, 750 TYD bond",
    "escalator holds ≥ 250k TRUE",
]
bw = 262
for i, (title, sub, acc) in enumerate(steps):
    y = 16 + i * 94
    s.box(20, y, bw, 52, title, sub, accent=acc)
    if 1 <= i <= 3:
        s.text(296, y + 22, "no challenge", "d-s d-green d-ct")
        s.text(296, y + 37, "→ resolved", "d-s d-green d-ct")
    if i < len(arrows):
        s.arrow([(64, y + 52), (64, y + 92)], arrows[i], 74, y + 76)
s.text(20, 480, "Each step costs more to reach and is more neutral than the last.", "d-s")
s.render()
