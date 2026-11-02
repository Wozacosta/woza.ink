"""Diagram for the crypto privacy post. Run: python3 scripts/diagrams/privacy.py"""
from diagram_lib import *

# ── 1. Three fields, three mechanisms ───────────────────────────
s = Svg("monero-hidden", 400, 274, "A transparent chain shows the sender, the receiver and the amount. Monero hides each with its own mechanism: a ring signature for the sender, a one-time stealth address for the receiver, and RingCT for the amount")
s.text(20, 22, "On a transparent chain", "d-s")
s.text(176, 22, "On Monero", "d-s")
rows = [
    ("Sender", "0xd8dA…6045", "Ring signature", "One of a ring of 16"),
    ("Receiver", "0x3fC9…7FAD", "Stealth address", "One-time, per payment"),
    ("Amount", "1.5 ETH", "RingCT", "Committed, still balanced"),
]
for i, (field, shown, mechanism, how) in enumerate(rows):
    y = 34 + i * 70
    s.add(f'<rect x="20" y="{y}" width="140" height="58" rx="8" class="d-box"/>')
    s.text(34, y + 23, field, "d-s")
    s.text(34, y + 41, shown, "d-t d-m d-rose d-ct")
    s.arrow([(160, y + 29), (174, y + 29)])
    s.add(f'<rect x="176" y="{y}" width="204" height="58" rx="8" class="d-box"/>')
    s.add(f'<circle cx="190" cy="{y + 19}" r="4" class="d-green d-fill"/>')
    s.text(202, y + 23, mechanism, "d-t")
    s.text(202, y + 41, how, "d-s")
s.text(20, 264, "Mandatory for everyone: there's no transparent mode.", "d-s")
s.render()

# ── 2. One link reveals the whole history ───────────────────────
s = Svg("privacy-link", 400, 222, "A wallet's transactions look anonymous until one of them is tied to a real name. Then every transaction, back to the wallet's first use, is linked to that person")
s.text(20, 22, "One link reveals the whole wallet", "d-t")
xs = [30 + i * 34 for i in range(11)]
linked = 7
s.text(20, 52, "A pseudonym: an address and no name", "d-s")
s.add(f'<line x1="{xs[0]}" y1="72" x2="{xs[-1]}" y2="72" class="d-line d-faint"/>')
for x in xs:
    s.add(f'<circle cx="{x}" cy="72" r="6" class="d-box"/>')
s.rule(100)
s.text(20, 124, "One transaction gets tied to you", "d-s")
s.add(f'<line x1="{xs[0]}" y1="168" x2="{xs[-1]}" y2="168" class="d-line d-faint"/>')
for i, x in enumerate(xs):
    if i != linked:
        s.add(f'<circle cx="{x}" cy="168" r="6" class="d-rose d-fill"/>')
s.add(f'<circle cx="{xs[linked]}" cy="168" r="9" class="d-violet d-fill"/>')
s.text(xs[linked], 150, "KYC, ENS name or a tweet", "d-s d-violet d-ct", "middle")
s.arrow([(xs[linked] - 14, 190), (xs[0], 190)])
s.arrow([(xs[linked] + 14, 190), (xs[-1], 190)])
s.text(xs[0], 208, "All the way back to the wallet's first use", "d-s d-rose d-ct")
s.text(xs[-1], 208, "and onward", "d-s d-rose d-ct", "end")
s.render()

# ── 3. Anonymity sets ───────────────────────────────────────────
s = Svg("privacy-anonymity-set", 400, 240, "A sketch with sixty users on each side. On Monero all of them are possible senders. On Zcash only the few using shielded addresses are, because transparent users are visibly someone else")
s.text(20, 22, "Who could the sender be?", "d-t")
s.text(20, 38, "Each dot is a user. A sketch: the counts aren't data.", "d-s")
shielded = {(4, 1), (6, 1), (3, 2), (5, 2), (7, 2), (4, 3), (6, 3), (5, 4)}
for px, name, sub in ((20, "Monero", "Every user is cover"), (210, "Zcash", "Only shielded users are")):
    s.text(px, 66, name, "d-t")
    s.text(px, 82, sub, "d-s")
    for row in range(6):
        for col in range(10):
            cx, cy = px + 6 + col * 17.5, 100 + row * 17
            if name == "Monero" or (col, row) in shielded:
                s.add(f'<circle cx="{cx}" cy="{cy}" r="6" class="d-green d-fill"/>')
            else:
                s.add(f'<circle cx="{cx}" cy="{cy}" r="5.5" class="d-line d-faint"/>')
s.add('<circle cx="26" cy="216" r="6" class="d-green d-fill"/>')
s.text(38, 220, "Could be the sender", "d-s")
s.add('<circle cx="216" cy="216" r="5.5" class="d-line d-faint"/>')
s.text(228, 220, "Public, so ruled out", "d-s")
s.render()

# ── 4. RAILGUN (interactive: src/data/diagrams/railgun-shielded.ts) ──
s = Svg("railgun-shielded", 400, 288, "Tokens are shielded from a public address into an encrypted 0zk balance on Ethereum. From there a ZK proof authorizes DeFi calls without showing who made them, a viewing key discloses to an auditor you choose, and a Proof of Innocence shows anyone there was no contact with flagged addresses")
s.box(20, 16, 360, 54, "Your public address", "every token and every move is visible", accent="rose", node="wallet")
s.add('<g data-node="pool">')
s.box(20, 110, 130, 168, "0zk balance", "encrypted onchain", accent="green")
s.text(46, 176, "While shielded:", "d-s")
for i, verb in enumerate(("trade", "borrow", "earn", "transfer")):
    s.text(46, 196 + i * 18, verb, "d-s d-green d-ct")
s.add("</g>")
s.box(222, 110, 158, 50, "Uniswap, Aave", "see the call, not who", accent="blue", node="defi")
s.box(222, 169, 158, 50, "Your auditor", "sees where funds began", accent="amber", node="auditor")
s.box(222, 228, 158, 50, "Anyone checking", "no flagged addresses", accent="violet", node="checker")
s.arrow([(85, 70), (85, 108)], "shield", 93, 94, edge="wallet-pool")
s.arrow([(150, 135), (220, 135)], "ZK proof", 185, 128, "middle", edge="pool-defi")
s.arrow([(150, 194), (220, 194)], "viewing key", 185, 187, "middle", dashed=True, edge="pool-auditor")
s.arrow([(150, 253), (220, 253)], "POI proof", 185, 246, "middle", dashed=True, edge="pool-checker")
s.render()

# ── 5. The on-ramp ──────────────────────────────────────────────
s = Svg("privacy-onramp", 400, 272, "Buying through a KYC exchange leaves a record tying your ID to your first address, though everything after it is private. Buying peer to peer has no central record of the same link")
s.text(20, 22, "The chain can't hide how you got in", "d-t")
lanes = [
    (50, "Through a KYC exchange", "rose", ("Your ID", "Exchange", "Your address")),
    (170, "Peer to peer", "green", ("You", "A seller", "Your address")),
]
for y, label, acc, boxes in lanes:
    s.text(20, y, label, f"d-s d-{acc} d-ct")
    for i, title in enumerate(boxes):
        s.box(20 + i * 110, y + 8, 94, 38, title, anchor="middle")
        if i < 2:
            s.arrow([(114 + i * 110, y + 27), (128 + i * 110, y + 27)])
    s.arrow([(334, y + 27), (382, y + 27)], "private", 358, y + 21, "middle", dashed=True)
y = lanes[0][0]
s.add(f'<path d="M67,{y + 46} L67,{y + 60} L287,{y + 60} L287,{y + 46}" class="d-line d-rose d-stroke"/>')
s.text(177, y + 76, "The exchange's record ties these two together", "d-s d-rose d-ct", "middle")
s.text(177, lanes[1][0] + 66, "No central record of who bought", "d-s d-green d-ct", "middle")
s.render()
