"""Diagrams for the agentic payments post. Run: python3 scripts/diagrams/agent_payments.py"""
from diagram_lib import *

# ── 1. The x402 flow ────────────────────────────────────────────
s = Svg("x402-flow", 400, 306, "The agent requests a resource and gets 402 Payment Required with the price, token and chain. It retries with a signed payment, the server or a facilitator checks it settled onchain, and the resource comes back")
agent, server = 75, 325
s.box(20, 16, 110, 36, "Agent", anchor="middle", node="agent")
s.box(270, 16, 110, 36, "Server", anchor="middle", node="server")
for x in (agent, server):
    s.add(f'<line x1="{x}" y1="52" x2="{x}" y2="298" class="d-line d-faint" stroke-dasharray="4 3"/>')
steps = [
    (100, True, "GET /api/weather", None, "agent-server"),
    (156, False, "402 Payment Required", "PAYMENT-REQUIRED: price, token, chain", "server-agent"),
    (212, True, "GET /api/weather", "PAYMENT-SIGNATURE: the signed payment", "agent-server-paid"),
    (286, False, "200 and the resource", None, "server-agent-paid"),
]
for y, outbound, label, sub, edge in steps:
    pts = [(agent + 2, y), (server - 3, y)] if outbound else [(server - 2, y), (agent + 3, y)]
    attr = f'data-edge="{edge}"'
    s.arrow(pts, edge=edge)
    s.text(200, y - (21 if sub else 8), label, "d-t d-m", "middle", attr)
    if sub:
        s.text(200, y - 7, sub, "d-s", "middle", attr)
s.add('<g data-node="check">')
s.add('<rect x="136" y="220" width="176" height="40" rx="6" class="d-box"/>')
s.text(224, 236, "Server or facilitator checks", "d-s d-amber d-ct", "middle")
s.text(224, 251, "that it settled onchain", "d-s d-amber d-ct", "middle")
s.add("</g>")
s.arrow([(323, 240), (314, 240)], edge="server-check")
s.render()

# ── 2. Verify, work, settle ─────────────────────────────────────
s = Svg("x402-settlement", 400, 506, "The agent requests a resource, gets a 402 with the price, and retries with a signed payment. The server asks the facilitator to verify it, does the work, then asks the facilitator to settle. The facilitator sends the transaction onchain, pays the gas and confirms, and the server returns the data. Verifying is read-only, so nothing moves until settle")
agent, server, facilitator = 60, 200, 330
s.box(20, 16, 80, 36, "Agent", anchor="middle", node="agent")
s.box(150, 16, 100, 36, "Server", anchor="middle", node="server")
s.box(280, 16, 100, 36, "Facilitator", anchor="middle", node="facilitator")
for x in (agent, server, facilitator):
    s.add(f'<line x1="{x}" y1="52" x2="{x}" y2="456" class="d-line d-faint" stroke-dasharray="4 3"/>')
messages = [
    (agent, server, 84, "GET /weather", "agent-server"),
    (server, agent, 124, "402 and the price", "server-agent"),
    (agent, server, 164, "Signed payment", "agent-server-signed"),
    (server, facilitator, 204, "/verify", "server-facilitator"),
    (facilitator, server, 240, "valid", "facilitator-server"),
    (server, facilitator, 316, "/settle", "server-facilitator-settle"),
    (facilitator, server, 398, "confirmed", "facilitator-server-confirmed"),
    (server, agent, 444, "200 and the data", "server-agent-data"),
]
for start, end, y, label, edge in messages:
    step = 2 if end > start else -2
    s.arrow([(start + step, y), (end - step * 1.5, y)], edge=edge)
    s.text((start + end) / 2, y - 8, label, "d-s d-m", "middle", f'data-edge="{edge}"')
s.add('<g data-node="work">')
s.add('<rect x="150" y="254" width="100" height="32" rx="6" class="d-box"/>')
s.text(200, 274, "Does the work", "d-s d-green d-ct", "middle")
s.add("</g>")
s.add('<g data-node="chain">')
s.add('<rect x="272" y="328" width="108" height="46" rx="6" class="d-box"/>')
s.text(326, 347, "Sends it onchain,", "d-s d-amber d-ct", "middle")
s.text(326, 363, "pays the gas", "d-s d-amber d-ct", "middle")
s.add("</g>")
s.rule(470)
s.text(20, 494, "Verify is read-only. Nothing moves until settle.", "d-t")
s.render()

# ── 3. Per-request payments vs a session ────────────────────────
s = Svg("agent-payments-sessions", 400, 244, "x402's basic flow attaches one payment to every request. MPP authorizes a spending limit once and streams micropayments against it. x402 V2 also added reusable sessions")
s.text(20, 22, "Per request: x402's basic flow", "d-t")
s.text(20, 38, "Every call carries its own payment", "d-s")
for i in range(8):
    s.add(f'<rect x="{20 + i * 49}" y="52" width="16" height="16" rx="3" class="d-blue d-fill" opacity="0.85"/>')
s.rule(90)
s.text(20, 114, "Session: MPP", "d-t")
s.text(20, 130, "Authorize a limit once, then stream micropayments against it", "d-s")
s.add('<rect x="20" y="144" width="360" height="24" rx="4" class="d-ext"/>')
s.add('<rect x="20" y="144" width="228" height="24" rx="4" class="d-green d-fill" opacity="0.18"/>')
for x in range(26, 244, 7):
    s.add(f'<line x1="{x}" y1="149" x2="{x}" y2="163" class="d-line d-green d-stroke"/>')
s.text(20, 184, "spent so far", "d-s")
s.text(380, 184, "spending limit", "d-s", "end")
s.rule(198)
s.text(20, 222, "x402 V2 has reusable sessions as well, so agents can skip", "d-s")
s.text(20, 238, "re-paying on every call.", "d-s")
s.render()

# ── 4. The stack, one purchase (interactive: src/data/diagrams/agent-payments-stack.ts) ──
s = Svg("agent-payments-stack", 400, 288, "ACP handles the purchase and AP2 proves a valid spending mandate. Below them, x402, MPP and L402 compete in the settlement layer, and one purchase can run through ACP, AP2 and x402 in turn")
s.box(20, 14, 360, 54, "ACP", "Checkout: what is the agent buying?", accent="blue", node="acp")
s.arrow([(84, 68), (84, 98)], "the purchase", 94, 88, edge="acp-ap2")
s.box(20, 100, 360, 54, "AP2", "Authorization: may it spend, and how much?", accent="violet", node="ap2")
s.add('<rect x="20" y="176" width="360" height="100" rx="8" class="d-ext"/>')
s.text(368, 196, "Settlement: the real contest", "d-s", "end")
s.arrow([(84, 154), (84, 208)], "a mandate", 94, 170, edge="ap2-x402")
s.box(32, 210, 104, 54, "x402", "stablecoins", accent="green", node="x402")
s.box(148, 210, 104, 54, "MPP", "sessions", accent="amber", node="mpp")
s.box(264, 210, 104, 54, "L402", "Lightning", accent="rose", node="l402")
s.render()

# ── 5. L402 (interactive: src/data/diagrams/agent-payments-l402.ts) ──
s = Svg("agent-payments-l402", 400, 368, "The agent requests a resource and gets a 402 with a token and a Lightning invoice. It pays the invoice over Lightning, which reveals a preimage, then retries with the token and preimage. The server checks the preimage against the hash in the token and needs no facilitator")
ln, agent, server = 70, 200, 330
s.box(20, 14, 100, 36, "Lightning", anchor="middle", node="lightning")
s.box(150, 14, 100, 36, "Agent", anchor="middle", node="agent")
s.box(280, 14, 100, 36, "Server", anchor="middle", node="server")
for x in (ln, agent, server):
    s.add(f'<line x1="{x}" y1="50" x2="{x}" y2="358" class="d-line d-faint" stroke-dasharray="4 3"/>')
for start, end, y, label, cls, edge in (
    (agent, server, 84, "GET /resource", "d-s d-m", "agent-server"),
    (server, agent, 124, "402, token, invoice", "d-s", "server-agent"),
    (agent, ln, 164, "pays the invoice", "d-s", "agent-lightning"),
    (ln, agent, 204, "the preimage", "d-s d-amber d-ct", "lightning-agent"),
    (agent, server, 244, "token:preimage", "d-s d-m", "agent-server-paid"),
    (server, agent, 346, "200 and the resource", "d-s", "server-agent-paid"),
):
    step = 2 if end > start else -2
    s.arrow([(start + step, y), (end - step * 1.5, y)], edge=edge)
    s.text((start + end) / 2, y - 8, label, cls, "middle", f'data-edge="{edge}"')
s.add('<g data-node="check">')
s.add('<rect x="212" y="262" width="168" height="54" rx="6" class="d-box"/>')
s.text(296, 284, "Preimage matches the hash", "d-s d-green d-ct", "middle")
s.text(296, 300, "No facilitator needed", "d-s", "middle")
s.add("</g>")
s.arrow([(330, 248), (330, 260)], edge="server-check")
s.render()

# ── 6. The timeline ─────────────────────────────────────────────
s = Svg("agent-payments-timeline", 400, 396, "A timeline spaced by month. x402 launches in May 2025, ACP in September, x402 V2 in December. Lightning Agent Tools come in February 2026, MPP in March. x402 moves to the Linux Foundation in April, Binance brings it to BNB Chain in May, the foundation goes operational in July, and Binance Agent OS bundles x402 in August")
s.add('<circle cx="24" cy="16" r="4" class="d-blue d-fill"/>')
s.text(33, 20, "x402 and who adopted it", "d-s")
s.add('<circle cx="194" cy="16" r="4" class="d-amber d-fill"/>')
s.text(203, 20, "Everything else", "d-s")
events = [
    (0, "May 2025", "x402 launches at Coinbase", "blue"),
    (4, "Sep 2025", "ACP launches in ChatGPT", "amber"),
    (7, "Dec 2025", "x402 V2 ships, with sessions", "blue"),
    (9, "Feb 2026", "Lightning Agent Tools for L402", "amber"),
    (10, "Mar 2026", "MPP launches; OpenAI moves checkout to apps", "amber"),
    (11, "Apr 2026", "x402 goes to the Linux Foundation", "blue"),
    (12, "May 2026", "Binance brings x402 to BNB Chain", "blue"),
    (14, "Jul 2026", "Foundation operational; Binance wallet adds x402", "blue"),
    (15, "Aug 2026", "Binance Agent OS bundles x402", "blue"),
]
top, per = 46, 22
s.add(f'<line x1="86" y1="{top - 6}" x2="86" y2="{top + 15 * per + 6}" class="d-line d-faint"/>')
for month, date, label, acc in events:
    y = top + month * per
    s.add(f'<circle cx="86" cy="{y}" r="4.5" class="d-{acc} d-fill"/>')
    s.text(20, y + 4, date, "d-s")
    s.text(100, y + 4, label, "d-s")
s.render()

# ── 7. The numbers, to scale ────────────────────────────────────
s = Svg("agent-payments-volume", 400, 294, "Four sources give 100 million, 165 million, 169 million and 200 million payments, which roughly agree. Dollar volumes drawn to scale do not: 50 billion dollars fills the width and 50 million dollars is a third of a pixel, which is 250 dollars a payment against 30 cents")
s.text(20, 22, "Payments: roughly the same", "d-t")
for i, (name, n) in enumerate((("Chainalysis", 100), ("RZLT", 165), ("Coinbase", 169), ("Solana Fdn.", 200))):
    y = 36 + i * 28
    s.text(20, y + 15, name, "d-s")
    s.add(f'<rect x="96" y="{y}" width="{n * 1.2:g}" height="20" rx="3" class="d-blue d-fill" opacity="0.8"/>')
    s.text(96 + n * 1.2 + 6, y + 15, f"{n}M", "d-s")
s.rule(160)
s.text(20, 186, "Dollars: not remotely, drawn to scale", "d-t")
s.text(20, 210, "Solana Foundation", "d-s")
s.text(380, 210, "$50B, or $250 a payment", "d-s", "end")
s.add('<rect x="20" y="216" width="360" height="20" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.text(20, 256, "RZLT", "d-s")
s.text(380, 256, "$50M, or $0.30 a payment", "d-s", "end")
s.add('<rect x="20" y="262" width="360" height="20" rx="3" class="d-ext"/>')
s.add('<rect x="20" y="262" width="0.36" height="20" class="d-green d-fill"/>')
s.text(30, 276, "the real bar is 0.36px wide, at the left edge", "d-s")
s.render()

# ── 8. Chainalysis: the mix and the wallets ─────────────────────
s = Svg("agent-payments-mix", 400, 262, "Transactions of 1 dollar or more went from 49 percent of volume in early 2025 to 95 percent by early 2026, while those between 10 cents and 1 dollar fell from 46 percent to 4 percent. The average x402 payer wallet is 197 days old, against 423 days for the rest of Base")
s.text(20, 22, "Share of volume, by payment size", "d-t")
for i, (name, big, mid) in enumerate((("Early 2025", 49, 46), ("Early 2026", 95, 4))):
    y = 34 + i * 34
    s.text(20, y + 16, name, "d-s")
    w = 300 / 100
    s.add(f'<rect x="80" y="{y}" width="{big * w:g}" height="24" class="d-green d-fill" opacity="0.3"/>')
    s.add(f'<rect x="{80 + big * w:g}" y="{y}" width="{mid * w:g}" height="24" class="d-amber d-fill" opacity="0.3"/>')
    s.add(f'<rect x="80" y="{y}" width="300" height="24" class="d-line d-faint"/>')
s.text(88, 51, "49%", "d-t")
s.text(88, 85, "95%", "d-t")
s.add('<rect x="80" y="110" width="10" height="10" class="d-green d-fill" opacity="0.3"/>')
s.text(95, 119, "$1 or more", "d-s")
s.add('<rect x="170" y="110" width="10" height="10" class="d-amber d-fill" opacity="0.3"/>')
s.text(185, 119, "10¢ to $1", "d-s")
s.rule(138)
s.text(20, 164, "Average wallet age", "d-t")
for i, (name, days, acc) in enumerate((("x402 payers", 197, "blue"), ("Rest of Base", 423, None))):
    y = 176 + i * 34
    s.text(20, y + 16, name, "d-s")
    cls = f"d-{acc} d-fill" if acc else "d-head"
    s.add(f'<rect x="90" y="{y}" width="{days * 0.56:g}" height="24" rx="3" class="{cls}" opacity="0.8"/>')
    s.text(90 + days * 0.56 + 6, y + 16, f"{days} days", "d-s")
s.render()

# ── 9. What to use (interactive: src/data/diagrams/agent-payments-choice.ts) ──
s = Svg("agent-payments-choice", 400, 280, "An open API, an agent builder and an enterprise all end up on x402, the enterprise with AP2 on top. A Stripe merchant uses MPP, and a Bitcoin-native service uses L402")
rows = [("open", "Open API, indie service"), ("agents", "Building agents"), ("enterprise", "Must prove authorization"), ("stripe", "Already on Stripe"), ("bitcoin", "Bitcoin-native")]
for i, (node, label) in enumerate(rows):
    s.box(20, 14 + i * 52, 196, 44, label, node=node)
s.add('<g data-node="x402">')
s.add('<rect x="296" y="14" width="84" height="148" rx="8" class="d-green d-fill" opacity="0.16"/>')
s.add('<rect x="296" y="14" width="84" height="148" rx="8" class="d-line d-green d-stroke"/>')
s.text(338, 92, "x402", "d-t", "middle")
s.add("</g>")
s.box(232, 118, 48, 44, "AP2", anchor="middle", node="ap2")
s.box(296, 170, 84, 44, "MPP", anchor="middle", node="mpp")
s.box(296, 222, 84, 44, "L402", anchor="middle", node="l402")
s.arrow([(216, 36), (294, 36)], edge="open-x402")
s.arrow([(216, 88), (294, 88)], edge="agents-x402")
s.arrow([(216, 140), (230, 140)], edge="enterprise-ap2")
s.arrow([(280, 140), (294, 140)], edge="ap2-x402")
s.arrow([(216, 192), (294, 192)], edge="stripe-mpp")
s.arrow([(216, 244), (294, 244)], edge="bitcoin-l402")
s.render()

# ── 10. x402: one entry, annotated (interactive: src/data/diagrams/x402-payment-anatomy.ts) ──
s = Svg("x402-payment-anatomy", 400, 262, "One entry from the accepts list, field by field. Scheme exact, network eip155:84532 is Base Sepolia, amount 10000 is 0.01 USDC, asset is the token contract, payTo is the seller, and maxTimeoutSeconds 60 is the time limit")
s.text(20, 22, "One entry in the accepts menu", "d-t")
fields = [
    ("scheme", "scheme", "exact", "how to charge", None),
    ("network", "network", "eip155:84532", "Base Sepolia testnet", None),
    ("amount", "amount", "10000", "0.01 USDC", "green"),
    ("asset", "asset", "0x036C…CF7e", "which token", None),
    ("payto", "payTo", "0x2096…287C", "who gets paid", None),
    ("timeout", "maxTimeoutSeconds", "60", "time limit", None),
]
for i, (node, field, value, meaning, acc) in enumerate(fields):
    y = 34 + i * 37
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="20" y="{y}" width="360" height="32" rx="6" class="d-box"/>')
    s.text(32, y + 20, field, "d-s d-m")
    s.text(146, y + 20, value, "d-s d-m d-blue d-ct")
    s.text(370, y + 20, meaning, f"d-t d-{acc} d-ct" if acc else "d-s", "end")
    s.add("</g>")
s.render()

# ── 11. x402: four ways to charge ───────────────────────────────
s = Svg("x402-schemes", 400, 348, "A sketch of the four schemes. Exact moves the whole authorized amount. Upto authorizes a cap and the seller settles what was used. Batch-settlement collects offchain vouchers and redeems them onchain together. Auth-capture holds a maximum, then captures, voids or refunds it")
s.text(20, 22, "Authorized against charged. A sketch, not data.", "d-s")
bar_y = lambda i: 52 + i * 76
for i, (name, note) in enumerate((("exact", "All of it, at once"), ("upto", "What was used, up to the cap"), ("batch-settlement", "Vouchers offchain, one redemption"), ("auth-capture", "Held, then captured, voided or refunded"))):
    y = bar_y(i)
    s.text(20, y, name, "d-t d-m")
    s.text(380, y, note, "d-s", "end")
    s.add(f'<rect x="20" y="{y + 10}" width="360" height="26" rx="4" class="d-ext"/>')
s.add(f'<rect x="20" y="{bar_y(0) + 10}" width="360" height="26" rx="4" class="d-blue d-fill" opacity="0.8"/>')
s.add(f'<rect x="20" y="{bar_y(1) + 10}" width="210" height="26" rx="4" class="d-blue d-fill" opacity="0.8"/>')
s.text(372, bar_y(1) + 28, "cap", "d-s", "end")
for k in range(16):
    s.add(f'<rect x="{26 + k * 16}" y="{bar_y(2) + 16}" width="10" height="14" rx="2" class="d-amber d-fill" opacity="0.8"/>')
s.add(f'<path d="M292,{bar_y(2) + 23} H326" class="d-line"/>')
s.add(f'<circle cx="340" cy="{bar_y(2) + 23}" r="9" class="d-green d-fill" opacity="0.85"/>')
s.add(f'<rect x="20" y="{bar_y(3) + 10}" width="160" height="26" rx="4" class="d-blue d-fill" opacity="0.3"/>')
s.add(f'<rect x="182" y="{bar_y(3) + 10}" width="198" height="26" rx="4" class="d-amber d-fill" opacity="0.25"/>')
s.text(100, bar_y(3) + 28, "captured", "d-s", "middle")
s.text(281, bar_y(3) + 28, "released to the client", "d-s", "middle")
s.render()

# ── 12. x402: after the signature goes out ──────────────────────
s = Svg("x402-retry", 400, 302, "Once PAYMENT-SIGNATURE is sent the outcome is unknown. A 200 with PAYMENT-RESPONSE means it's done. settlement_pending is non-terminal, so reconcile the transaction hash onchain. With a timeout, don't create a second payment, because the server may have settled the first")
s.box(20, 14, 360, 54, "PAYMENT-SIGNATURE sent", "From here the outcome is unknown", accent="amber")
s.text(20, 94, "What can come back", "d-s")
outcomes = [
    ("200 and the data", "PAYMENT-RESPONSE holds the hash", "Done", "green"),
    ("settlement_pending", "Non-terminal: it may still confirm", "Check the chain", "amber"),
    ("A timeout", "The first payment may have settled", "Don't pay again", "rose"),
]
for i, (title, sub, verdict, acc) in enumerate(outcomes):
    y = 104 + i * 62
    s.box(20, y, 360, 54, title, sub, accent=acc)
    s.text(366, y + 22, verdict, f"d-s d-{acc} d-ct", "end")
s.render()
