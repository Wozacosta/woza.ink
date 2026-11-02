"""Diagrams for the agentic payments post. Run: python3 scripts/diagrams/agent_payments.py"""
from diagram_lib import *

# ── 1. The x402 flow ────────────────────────────────────────────
s = Svg("x402-flow", 400, 306, "The agent requests a resource and gets 402 Payment Required with the price, token and chain. It retries with a signed payment, the server or a facilitator checks it settled onchain, and the resource comes back")
agent, server = 75, 325
s.box(20, 16, 110, 36, "Agent", anchor="middle")
s.box(270, 16, 110, 36, "Server", anchor="middle")
for x in (agent, server):
    s.add(f'<line x1="{x}" y1="52" x2="{x}" y2="298" class="d-line d-faint" stroke-dasharray="4 3"/>')
steps = [
    (100, True, "GET /api/weather", None),
    (156, False, "402 Payment Required", "PAYMENT-REQUIRED: price, token, chain"),
    (212, True, "GET /api/weather", "PAYMENT-SIGNATURE: the signed payment"),
    (286, False, "200 and the resource", None),
]
for y, outbound, label, sub in steps:
    pts = [(agent + 2, y), (server - 3, y)] if outbound else [(server - 2, y), (agent + 3, y)]
    s.arrow(pts)
    s.text(200, y - (21 if sub else 8), label, "d-t d-m", "middle")
    if sub:
        s.text(200, y - 7, sub, "d-s", "middle")
s.text(317, 240, "Server or facilitator checks", "d-s d-amber d-ct", "end")
s.text(317, 255, "that it settled onchain", "d-s d-amber d-ct", "end")
s.render()

# ── 2. Verify, work, settle ─────────────────────────────────────
s = Svg("x402-settlement", 400, 506, "The agent requests a resource, gets a 402 with the price, and retries with a signed payment. The server asks the facilitator to verify it, does the work, then asks the facilitator to settle. The facilitator sends the transaction onchain, pays the gas and confirms, and the server returns the data. Verifying is read-only, so nothing moves until settle")
agent, server, facilitator = 60, 200, 330
s.box(20, 16, 80, 36, "Agent", anchor="middle")
s.box(150, 16, 100, 36, "Server", anchor="middle")
s.box(280, 16, 100, 36, "Facilitator", anchor="middle")
for x in (agent, server, facilitator):
    s.add(f'<line x1="{x}" y1="52" x2="{x}" y2="456" class="d-line d-faint" stroke-dasharray="4 3"/>')
messages = [
    (agent, server, 84, "GET /weather"),
    (server, agent, 124, "402 and the price"),
    (agent, server, 164, "Signed payment"),
    (server, facilitator, 204, "/verify"),
    (facilitator, server, 240, "valid"),
    (server, facilitator, 316, "/settle"),
    (facilitator, server, 398, "confirmed"),
    (server, agent, 444, "200 and the data"),
]
for start, end, y, label in messages:
    step = 2 if end > start else -2
    s.arrow([(start + step, y), (end - step * 1.5, y)])
    s.text((start + end) / 2, y - 8, label, "d-s d-m", "middle")
s.add('<rect x="150" y="254" width="100" height="32" rx="6" class="d-box"/>')
s.text(200, 274, "Does the work", "d-s d-green d-ct", "middle")
s.add('<rect x="272" y="328" width="108" height="46" rx="6" class="d-box"/>')
s.text(326, 347, "Sends it onchain,", "d-s d-amber d-ct", "middle")
s.text(326, 363, "pays the gas", "d-s d-amber d-ct", "middle")
s.rule(470)
s.text(20, 494, "Verify is read-only. Nothing moves until settle.", "d-t")
s.render()

# ── 3. Per-request payments vs a session ────────────────────────
s = Svg("agent-payments-sessions", 400, 244, "x402's basic flow attaches one payment to every request. MPP authorizes a spending limit once and streams micropayments against it. x402 V2 has since added reusable sessions")
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
s.text(20, 222, "x402 V2 added reusable sessions as well, so agents can skip", "d-s")
s.text(20, 238, "re-paying on every call.", "d-s")
s.render()
