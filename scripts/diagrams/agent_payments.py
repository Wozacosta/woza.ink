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

# ── 2. Per-request payments vs a session ────────────────────────
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
