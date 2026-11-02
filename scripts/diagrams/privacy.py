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

# ── 6. Zcash's proving systems ──────────────────────────────────
s = Svg("zcash-proofs", 400, 196, "Zcash's proving systems on a timeline to scale. Sprout launched in October 2016 with BCTV14. Sapling moved to Groth16 in October 2018. Both need a trusted setup. Orchard, activated in 2022, uses Halo 2, which needs none")
s.text(20, 22, "Three proving systems, the last with no setup", "d-t")
s.text(20, 38, "To scale from Zcash's launch", "d-s")
x_year = lambda year: 20 + (year - 2016.75) * 360 / 8
eras = [(2016.75, 2018.8, "Sprout", "BCTV14", "rose"), (2018.8, 2022.42, "Sapling", "Groth16", "amber"), (2022.42, 2024.75, "Orchard", "Halo 2", "green")]
for start, end, name, proof, acc in eras:
    x, width = x_year(start), x_year(end) - x_year(start) - 2
    s.add(f'<rect x="{x:.1f}" y="56" width="{width:.1f}" height="44" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(f"{x + 8:.1f}", 74, name, "d-t", "start", 'style="fill:var(--background,#faf8f5)"')
    s.text(f"{x + 8:.1f}", 90, proof, "d-s", "start", 'style="fill:var(--background,#faf8f5)"')
for year, label, anchor in ((2016.75, "Oct 2016", "start"), (2018.8, "Oct 2018", "middle"), (2022.42, "2022", "middle")):
    s.text(f"{x_year(year):.1f}", 116, label, "d-s", anchor)
s.add(f'<path d="M{x_year(2016.75):.1f},128 L{x_year(2016.75):.1f},134 L{x_year(2022.42) - 2:.1f},134 L{x_year(2022.42) - 2:.1f},128" class="d-line d-rose d-stroke"/>')
s.text(f"{(x_year(2016.75) + x_year(2022.42)) / 2:.1f}", 150, "Trusted setup, with toxic waste to discard", "d-s d-rose d-ct", "middle")
s.add(f'<path d="M{x_year(2022.42) + 2:.1f},128 L{x_year(2022.42) + 2:.1f},134 L380,134 L380,128" class="d-line d-green d-stroke"/>')
s.text(380, 150, "No setup", "d-s d-green d-ct", "end")
s.text(20, 182, "The axis stops at 2024 for space. Orchard is still current.", "d-s")
s.render()

# ── 7. Islands ──────────────────────────────────────────────────
s = Svg("privacy-islands", 400, 226, "Monero and Zcash are separate chains with no route into DeFi. Lending, trading, yield, NFTs and DAOs live on Ethereum and EVM chains, where everything is public")
s.text(20, 22, "Privacy here, DeFi over there", "d-t")
s.box(20, 44, 126, 60, "Monero", "own chain", accent="green")
s.box(20, 120, 126, 60, "Zcash", "own chain", accent="green")
s.add('<rect x="190" y="44" width="190" height="136" rx="8" class="d-ext"/>')
s.text(204, 66, "Ethereum and EVM chains", "d-t")
s.text(204, 82, "everything public", "d-s d-rose d-ct")
for i, label in enumerate(("Lending", "Trading", "Yield", "NFTs", "DAOs")):
    x, y = 204 + (i % 2) * 84, 96 + (i // 2) * 26
    s.text(x, y + 10, label, "d-s")
s.add('<line x1="168" y1="52" x2="168" y2="172" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(168, 204, "no route across", "d-s d-rose d-ct", "middle")
s.render()

# ── 8. The Tornado Cash timeline ────────────────────────────────
s = Svg("tornado-timeline", 400, 248, "Tornado Cash on a timeline to scale. OFAC sanctioned it in August 2022. A Dutch court convicted Alexey Pertsev in May 2024. The Fifth Circuit ruled against OFAC in November 2024. Treasury lifted the sanctions in March 2025. A US jury convicted Roman Storm on one count in August 2025")
s.text(20, 22, "The code got cleared. The developers didn't.", "d-t")
x_month = lambda year, month: 20 + (year + (month - 1) / 12 - 2022) * 360 / 4
axis = 56
s.add(f'<line x1="20" y1="{axis}" x2="380" y2="{axis}" class="d-line"/>')
for year in range(2022, 2027):
    x = x_month(year, 1)
    s.add(f'<line x1="{x}" y1="{axis - 4}" x2="{x}" y2="{axis + 4}" class="d-line"/>')
    s.text(x, axis - 9, str(year), "d-s", "start" if year == 2022 else "end" if year == 2026 else "middle")
events = [
    (2022, 8, "Aug 2022: OFAC sanctions", "rose", "start"),
    (2024, 5, "May 2024: Pertsev convicted", "amber", "end"),
    (2024, 11, "Nov 2024: Fifth Circuit ruling", "green", "end"),
    (2025, 3, "Mar 2025: sanctions lifted", "green", "end"),
    (2025, 8, "Aug 2025: Storm convicted", "amber", "end"),
]
for i, (year, month, label, acc, anchor) in enumerate(events):
    x, y = x_month(year, month), 86 + i * 34
    s.add(f'<line x1="{x:.1f}" y1="{axis}" x2="{x:.1f}" y2="{y + 4}" class="d-line d-{acc} d-stroke"/>')
    s.add(f'<circle cx="{x:.1f}" cy="{axis}" r="4" class="d-{acc} d-fill"/>')
    s.text(f"{x + (6 if anchor == 'start' else -6):.1f}", y, label, f"d-s d-{acc} d-ct", anchor)
s.render()

# ── 9. Full transparency to full opacity ────────────────────────
s = Svg("privacy-disclosure", 400, 142, "A spectrum from full transparency to full opacity. Bitcoin and Ethereum sit at the transparent end, Zcash and RAILGUN in the middle with viewing keys for selective disclosure, and Monero at the opaque end")
s.text(20, 22, "Who gets to see", "d-t")
s.add('<line x1="30" y1="70" x2="370" y2="70" class="d-line"/>')
for x, name, sub, acc, anchor in ((30, "Bitcoin, Ethereum", "everyone sees", "rose", "start"), (200, "RAILGUN, Zcash", "you pick who sees", "green", "middle"), (370, "Monero", "nobody sees", "violet", "end")):
    s.add(f'<circle cx="{x}" cy="70" r="7" class="d-{acc} d-fill"/>')
    s.text(x if anchor != "start" else 20, 96, name, f"d-t d-{acc} d-ct", anchor)
    s.text(x if anchor != "start" else 20, 112, sub, "d-s", anchor)
s.text(20, 132, "Positions show the design, not how much of each chain is private.", "d-s")
s.render()

# ── 10. After LocalMonero (interactive: src/data/diagrams/privacy-p2p.ts) ──
s = Svg("privacy-p2p", 400, 302, "The peer-to-peer options after LocalMonero closed in May 2024. Haveno trades Monero with Monero multisig escrow. Bisq trades Bitcoin with Bitcoin multisig escrow. xmr-btc-swap swaps Bitcoin for Monero with no exchange at all. RoboSats trades Bitcoin over Lightning with HODL invoices")
s.text(20, 22, "Buying without an account", "d-t")
s.box(20, 36, 360, 54, "LocalMonero", "hosted, shut down in May 2024", dashed=True, accent="rose", node="localmonero")
cards = [
    ("haveno", "Haveno", "XMR, multisig escrow", "green"),
    ("bisq", "Bisq", "BTC base, multisig escrow", "blue"),
    ("swap", "xmr-btc-swap", "BTC to XMR, two wallets", "amber"),
    ("robosats", "RoboSats", "BTC over Lightning", "violet"),
]
for i, (node, title, sub, acc) in enumerate(cards):
    s.box(20 + (i % 2) * 184, 118 + (i // 2) * 70, 176, 58, title, sub, accent=acc, node=node)
s.text(20, 110, "What's left", "d-s")
s.text(20, 274, "Haveno and Bisq run on Tor with a desktop client. Liquidity is thin.", "d-s")
s.render()

# ── 11. LocalMonero's end ───────────────────────────────────────
s = Svg("privacy-localmonero", 400, 150, "To scale. LocalMonero launched in 2017 and shut down in May 2024, giving users six months to withdraw. Haveno reached mainnet readiness in late 2024")
s.text(20, 22, "Seven years of the easy route", "d-t")
x_year = lambda year: 20 + (year - 2017) * 360 / 8
s.add(f'<rect x="{x_year(2017)}" y="44" width="{x_year(2024.35) - x_year(2017):.1f}" height="24" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.add(f'<rect x="{x_year(2024.35) + 2:.1f}" y="44" width="{x_year(2024.85) - x_year(2024.35) - 2:.1f}" height="24" rx="3" class="d-amber d-fill" opacity="0.8"/>')
s.text(30, 61, "LocalMonero", "d-t", "start", 'style="fill:var(--background,#faf8f5)"')
s.add(f'<line x1="{x_year(2024.85):.1f}" y1="68" x2="{x_year(2024.85):.1f}" y2="96" class="d-line d-green d-stroke"/>')
s.text(380, 108, "Haveno, late 2024", "d-s d-green d-ct", "end")
s.add(f'<line x1="{x_year(2024.35):.1f}" y1="68" x2="{x_year(2024.35):.1f}" y2="84" class="d-line d-amber d-stroke"/>')
s.text(x_year(2024.35) - 4, 86, "Shut down May 2024, six months to withdraw", "d-s d-amber d-ct", "end")
for year in (2017, 2019, 2021, 2023, 2025):
    s.text(f"{x_year(year):.1f}", 136, str(year), "d-s", "start" if year == 2017 else "end" if year == 2025 else "middle")
s.add('<line x1="20" y1="122" x2="380" y2="122" class="d-line d-faint"/>')
s.render()
