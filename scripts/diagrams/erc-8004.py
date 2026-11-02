"""Diagram for the ERC-8004 post. Run: python3 scripts/diagrams/erc-8004.py"""
from diagram_lib import *

# ── 1. Three registries (interactive: src/data/diagrams/erc8004-registries.ts) ──
s = Svg("erc8004-registries", 400, 438, "Your agent meets a stranger and asks three onchain registries three questions. Identity is an ERC-721 NFT, Reputation stores client feedback, and Validation records third-party checks. Heavy data stays offchain, referenced by a URI, with a KECCAK-256 hash on feedback and validation data")
s.text(20, 22, "Should I trust this agent?", "d-t")
s.box(20, 34, 360, 54, "Your agent", "meets a stranger, and claims are cheap", accent="rose", node="client")
s.add('<rect x="20" y="106" width="360" height="222" rx="8" class="d-ext"/>')
s.text(52, 126, "Onchain, one small contract each", "d-s")
registries = [
    ("identity", "Identity", "Who are you? An ERC-721 NFT per agent", "blue"),
    ("reputation", "Reputation", "What's your track record? Client feedback", "green"),
    ("validation", "Validation", "Can a third party verify it? Stake, zkML, TEE", "violet"),
]
for i, (node, title, sub, acc) in enumerate(registries):
    y = 136 + i * 62
    s.box(52, y, 296, 54, title, sub, accent=acc, node=node)
    s.arrow([(36, 88), (36, y + 27), (50, y + 27)], edge=f"client-{node}")
    s.arrow([(348, y + 27), (364, y + 27), (364, 370)], edge=f"{node}-offchain")
s.text(356, 354, "a URI, with a KECCAK-256 hash on the last two", "d-s", "end")
s.box(20, 372, 360, 54, "Offchain", "Registration file, feedback, validation evidence", dashed=True, node="offchain")
s.render()

# ── 2. One agent (interactive: src/data/diagrams/erc8004-identity.ts) ──
s = Svg("erc8004-identity", 400, 362, "Onchain, an agent is an NFT in the Identity Registry, named by its registry and agentId, with an agentWallet that needs that wallet's signature, key-value metadata and an agentURI. The URI resolves to an offchain Agent Registration File listing its name, description and services such as A2A, MCP and OASF. No hash of the file is stored")
s.add('<rect x="20" y="14" width="360" height="212" rx="8" class="d-ext"/>')
s.text(34, 36, "Onchain: an NFT in the Identity Registry", "d-s")
rows = [
    ("id", "eip155:1:0x8004…a432", "plus the agentId"),
    ("wallet", "agentWallet", "needs that wallet's signature"),
    ("metadata", "metadata", "key-value pairs"),
    ("uri", "agentURI", "ipfs://, https:// or data:"),
]
for i, (node, field, note) in enumerate(rows):
    y = 46 + i * 43
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="32" y="{y}" width="336" height="37" rx="6" class="d-box"/>')
    s.text(44, y + 23, field, "d-s d-m d-blue d-ct")
    s.text(356, y + 23, note, "d-s", "end")
    s.add("</g>")
s.arrow([(200, 212), (200, 256)], "resolves to, with no hash stored", 210, 244, edge="uri-file")
s.add('<g data-node="file">')
s.add('<rect x="20" y="258" width="360" height="92" rx="8" class="d-ext"/>')
s.text(34, 280, "Agent Registration File", "d-t")
s.text(34, 296, "Offchain: name, description, services", "d-s")
for i, label in enumerate(("A2A", "MCP", "OASF")):
    x = 34 + i * 64
    s.add(f'<rect x="{x}" y="310" width="56" height="26" rx="5" class="d-box"/>')
    s.text(x + 28, 327, label, "d-s", "middle")
s.add("</g>")
s.render()

# ── 3. Feedback, then readers (interactive: src/data/diagrams/erc8004-feedback.ts) ──
s = Svg("erc8004-feedback", 400, 290, "Clients give and revoke feedback, and anyone can append a response. The Reputation Registry stores raw values, like 9977 with 2 decimals tagged uptime, meaning 99.77 percent. A DeFi protocol, a code review service and a data pipeline each read the same data with their own rules")
s.box(20, 14, 172, 54, "Client", "giveFeedback, revoke", accent="blue", node="client")
s.box(208, 14, 172, 54, "Anyone", "appendResponse", accent="amber", node="responder")
s.arrow([(106, 68), (106, 94)], edge="client-registry")
s.arrow([(294, 68), (294, 94)], edge="responder-registry")
s.box(20, 96, 360, 54, "Reputation Registry", "uptime, value 9977, 2 decimals: 99.77%", accent="green", node="registry")
readers = [(20, "defi", "DeFi protocol", "recent trading"), (144, "review", "Code review", "long-term record"), (268, "pipeline", "Data pipeline", "uptime only")]
for x, node, title, sub in readers:
    s.arrow([(x + 56, 150), (x + 56, 184)], edge=f"registry-{node}")
    s.box(x, 186, 112, 54, title, sub, anchor="middle", node=node)
s.text(20, 268, "No formula in the standard. Each reader decides.", "d-t")
s.render()

# ── 4. One validation (interactive: src/data/diagrams/erc8004-validation.ts) ──
s = Svg("erc8004-validation", 400, 330, "The agent owner sends validationRequest to the registry naming a validator. The validator checks the work, by re-running it with stake, with a zkML proof or in a TEE, then sends validationResponse with a score from 0, failed, to 100, passed")
owner, reg, val = 70, 200, 330
s.box(20, 14, 100, 36, "Owner", anchor="middle", node="owner")
s.box(150, 14, 100, 36, "Registry", anchor="middle", node="registry")
s.box(280, 14, 100, 36, "Validator", anchor="middle", node="validator")
for x in (owner, reg, val):
    s.add(f'<line x1="{x}" y1="50" x2="{x}" y2="252" class="d-line d-faint" stroke-dasharray="4 3"/>')
for start, end, y, label, cls, edge in (
    (owner, reg, 84, "validationRequest", "d-s d-m", "owner-registry"),
    (reg, val, 124, "names this validator", "d-s", "registry-validator"),
    (val, reg, 240, "validationResponse", "d-s d-m", "validator-registry"),
):
    step = 2 if end > start else -2
    s.arrow([(start + step, y), (end - step * 1.5, y)], edge=edge)
    s.text((start + end) / 2, y - 8, label, cls, "middle", f'data-edge="{edge}"')
s.add('<g data-node="check">')
s.add('<rect x="212" y="146" width="168" height="62" rx="6" class="d-box"/>')
s.text(296, 168, "Checks the work", "d-t", "middle")
s.text(296, 186, "Stake, zkML or TEE", "d-s", "middle")
s.add("</g>")
s.arrow([(330, 128), (330, 144)], edge="validator-check")
s.text(20, 276, "0", "d-t")
s.text(380, 276, "100", "d-t", "end")
s.text(200, 276, "response", "d-s", "middle")
for i in range(20):
    s.add(f'<rect x="{20 + i * 18}" y="284" width="18" height="12" class="d-rose d-fill" opacity="{0.8 * (19 - i) / 19:.2f}"/>')
    s.add(f'<rect x="{20 + i * 18}" y="284" width="18" height="12" class="d-green d-fill" opacity="{0.8 * i / 19:.2f}"/>')
s.text(20, 314, "failed", "d-s d-rose d-ct")
s.text(380, 314, "passed", "d-s d-green d-ct", "end")
s.render()

# ── 5. Status over time, to scale ───────────────────────────────
s = Svg("erc8004-status", 400, 156, "A timeline to scale. Draft from August 2025, Review from October 2025, back to Draft on January 13, 2026. The contracts reach mainnet on January 29 while the spec is a Draft")
day = 360 / 214
x_oct, x_jan, x_main = 20 + 51 * day, 20 + 148 * day, 20 + 164 * day
s.text(x_main, 28, "Jan 29: mainnet", "d-s d-green d-ct", "end")
s.text(x_main, 44, "and 30+ chains", "d-s d-green d-ct", "end")
s.add(f'<line x1="{x_main:.1f}" y1="50" x2="{x_main:.1f}" y2="104" class="d-line d-green d-stroke"/>')
for x, w, label, acc in ((20, x_oct - 20, "Draft", "amber"), (x_oct, x_jan - x_oct, "Review", "blue"), (x_jan, 380 - x_jan, "Draft", "amber")):
    s.add(f'<rect x="{x:.1f}" y="60" width="{w - 2:.1f}" height="34" rx="4" class="d-{acc} d-fill" opacity="0.22"/>')
    s.text(372 if x == x_jan else x + 8, 81, label, "d-t", "end" if x == x_jan else "start")
for x, label, anchor in ((20, "Aug 2025", "start"), (x_oct, "Oct 2025", "start"), (x_jan, "Jan 2026", "end"), (380, "Mar 2026", "end")):
    s.text(round(x, 1), 122, label, "d-s", anchor)
s.text(20, 148, "To scale, by day.", "d-s")
s.render()

# ── 6. Inherited trust, and none ────────────────────────────────
s = Svg("erc8004-trust-gap", 400, 218, "In a closed system trust is inherited: you deployed your own agents and signed a contract with your partner. In an open system a stranger agent has only its claims, and could be competent, incompetent or malicious")
s.text(20, 22, "Closed: trust is inherited", "d-t")
s.box(20, 34, 172, 54, "Your agent", "you deployed it", accent="green")
s.box(208, 34, 172, 54, "Partner's agent", "you signed a contract", accent="green")
s.rule(106)
s.text(20, 132, "Open: nothing to inherit", "d-t")
s.box(20, 144, 172, 54, "Your agent", "no prior relationship", accent="green")
s.box(208, 144, 172, 54, "A stranger", "claims are cheap", accent="rose", dashed=True)
s.add('<path d="M192,171 H207" class="d-line d-rose d-stroke" stroke-dasharray="3 3"/>')
s.render()
