"""Diagrams for the ERCs and EIPs post. Run: python3 scripts/diagrams/ethereum_standards.py"""
from diagram_lib import *

# ── 1. ERC-20: the allowance over time ──────────────────────────
s = Svg("erc20-allowance", 400, 300, "Three moments in an infinite approval. The approve transaction moves nothing. A later transferFrom lowers your balance but the allowance stays infinite. Later still, an exploit of the spender drains the balance through the same open allowance")
s.text(20, 22, "Approve once, spend forever", "d-t")
s.text(20, 38, "What the token contract records. A sketch, not data.", "d-s")
s.text(20, 66, "Your balance", "d-s")
s.text(210, 66, "Spender's allowance", "d-s")
rows = [
    ("Tx 1: approve(dex, ∞)", "nothing moved yet", None, 1.0, "blue"),
    ("Tx 2: transferFrom(you, dex, amt)", "still infinite", None, 0.65, "blue"),
    ("Later: the spender is exploited", "drained", "d-rose d-ct", 0, "rose"),
]
for i, (label, note, cls, left, acc) in enumerate(rows):
    y = 92 + i * 62
    s.text(20, y, label, "d-s d-m")
    s.text(380, y, note, f"d-s {cls}" if cls else "d-s", "end")
    s.add(f'<rect x="20" y="{y + 8}" width="170" height="22" rx="4" class="d-ext"/>')
    if left:
        s.add(f'<rect x="20" y="{y + 8}" width="{170 * left:g}" height="22" rx="4" class="d-{acc} d-fill" opacity="0.8"/>')
    s.add(f'<rect x="210" y="{y + 8}" width="170" height="22" rx="4" class="d-amber d-fill" opacity="0.25"/>')
    s.add(f'<rect x="210" y="{y + 8}" width="170" height="22" rx="4" class="d-line d-amber d-stroke"/>')
    s.text(295, y + 24, "∞", "d-t d-amber d-ct", "middle")
s.rule(264)
s.text(20, 286, "Nothing expires: the allowance outlives the trade it was for.", "d-s")
s.render()

# ── 2. ERC-721: what's onchain ──────────────────────────────────
s = Svg("erc721-tokenuri", 400, 294, "The contract onchain answers two questions: ownerOf returns an address and tokenURI returns a URL. The URL points offchain to a JSON file, which points to the image")
s.text(20, 22, "Onchain: who owns it. Offchain: what it is.", "d-t")
s.add('<rect x="20" y="36" width="360" height="112" rx="8" class="d-ext"/>')
s.text(34, 56, "Onchain, in the ERC-721 contract", "d-s")
s.add('<rect x="34" y="66" width="180" height="32" rx="6" class="d-box"/>')
s.text(46, 86, "ownerOf(tokenId)", "d-s d-m")
s.arrow([(214, 82), (262, 82)])
s.text(270, 86, "an address", "d-t")
s.add('<rect x="34" y="106" width="180" height="32" rx="6" class="d-box"/>')
s.text(46, 126, "tokenURI(tokenId)", "d-s d-m")
s.arrow([(214, 122), (262, 122)])
s.text(270, 126, "a URL", "d-t d-amber d-ct")
s.arrow([(310, 134), (310, 186)])
s.text(20, 176, "Offchain, wherever the URL points", "d-s")
s.box(200, 188, 180, 90, "JSON file", None, accent="amber")
for i, field in enumerate(("image", "description", "attributes")):
    s.text(226, 226 + i * 16, field, "d-s d-m")
s.arrow([(200, 233), (152, 233)])
s.box(20, 206, 130, 54, "Image", "a link away", dashed=True)
s.render()

# ── 3. ERC-2981: a question, not a rule ─────────────────────────
s = Svg("erc2981-royalty", 400, 306, "A marketplace asks the NFT contract for the royalty and gets a receiver and an amount. What happens next is up to the seller: some marketplaces honor it, some make it optional, and a peer-to-peer transfer never has to ask")
s.text(20, 22, "royaltyInfo answers. It can't make anyone pay.", "d-t")
s.box(20, 38, 120, 54, "Marketplace", anchor="middle")
s.box(260, 38, 120, 54, "NFT contract", anchor="middle")
s.arrow([(140, 56), (258, 56)])
s.text(200, 50, "tokenId, salePrice", "d-s", "middle")
s.arrow([(260, 76), (142, 76)])
s.text(200, 90, "receiver, amount", "d-s", "middle")
s.rule(110)
s.text(20, 132, "After that, nothing onchain enforces the answer", "d-s")
outcomes = [
    ("Honors it", "OpenSea, Rarible: the creator is paid", "green"),
    ("Makes it optional", "Blur: the creator may get nothing", "amber"),
    ("Never asks", "A P2P transfer: nothing routes funds", "rose"),
]
for i, (title, sub, acc) in enumerate(outcomes):
    s.box(20, 142 + i * 54, 360, 46, title, sub, accent=acc)
s.render()

# ── 4. EIP-1559: the base fee follows fullness ──────────────────
s = Svg("eip1559-base-fee", 400, 278, "A sketch of twelve blocks. While blocks are more than half full the base fee climbs in steps, while they are less than half full it falls, and at exactly half full it holds")
s.text(20, 22, "The base fee chases half-full blocks", "d-t")
s.text(20, 38, "A sketch, not data", "d-s")
full = [80, 100, 90, 70, 50, 40, 20, 10, 30, 50, 75, 95]
step, bar, x0 = 30, 24, 20
fee, level = [], 0
for f in full:
    fee.append(level)
    level += f - 50
Yfee = lambda v: 122 - v * 0.42
d = f"M{x0},{Yfee(fee[0]):.1f}"
for i, v in enumerate(fee):
    d += f" L{x0 + i * step},{Yfee(v):.1f} L{x0 + (i + 1) * step - 6},{Yfee(v):.1f}"
s.add(f'<path d="{d}" class="d-line d-violet d-stroke" stroke-width="2"/>')
s.text(20, 62, "Base fee", "d-s d-violet d-ct")
s.text(20, 156, "Gas used in each block", "d-s")
base, tall = 244, 80
for i, f in enumerate(full):
    h = tall * f / 100
    acc = "amber" if f > 50 else "blue" if f < 50 else None
    fill = f'd-{acc} d-fill' if acc else "d-head"
    s.add(f'<rect x="{x0 + i * step}" y="{base - h:g}" width="{bar}" height="{h:g}" rx="2" class="{fill}" opacity="0.8"/>')
s.add(f'<line x1="20" y1="{base - tall / 2:g}" x2="380" y2="{base - tall / 2:g}" class="d-line" stroke-dasharray="4 3"/>')
s.text(245, base - tall / 2 - 5, "target: 50% full", "d-s", "middle")
s.add(f'<line x1="20" y1="{base}" x2="380" y2="{base}" class="d-line d-faint"/>')
s.text(20, 266, "Over target: the fee rises", "d-s d-amber d-ct")
s.text(380, 266, "Under target: it falls", "d-s d-blue d-ct", "end")
s.render()

# ── 5. EIP-4844: retention and room ─────────────────────────────
s = Svg("eip4844-blobs", 400, 330, "Calldata is kept forever, while blobs are pruned after about 18 days. As activated at Dencun, a block holds up to 6 blobs of about 128 KB each, 768 KB in all, with a target of 3 blobs, or 384 KB, in a fee market of their own")
s.text(20, 22, "How long the data stays", "d-t")
s.text(20, 38, "Not to scale", "d-s")
s.text(20, 66, "Calldata", "d-s")
s.add('<rect x="20" y="74" width="346" height="20" rx="3" class="d-rose d-fill" opacity="0.8"/>')
s.arrow([(366, 84), (382, 84)])
s.text(380, 66, "permanent", "d-s d-rose d-ct", "end")
s.text(20, 120, "Blob", "d-s")
s.add('<rect x="20" y="128" width="120" height="20" rx="3" class="d-green d-fill" opacity="0.85"/>')
s.add('<rect x="142" y="128" width="238" height="20" rx="3" class="d-ext"/>')
s.text(140, 120, "~18 days", "d-s d-green d-ct", "end")
s.text(380, 120, "then pruned", "d-s", "end")
s.text(20, 166, "Long enough for fraud proofs and availability checks", "d-s")
s.rule(182)
s.text(20, 206, "Room in one block, as activated at Dencun", "d-t")
for i in range(6):
    x = 20 + i * 61
    if i < 3:
        s.add(f'<rect x="{x}" y="220" width="55" height="40" rx="4" class="d-green d-fill" opacity="0.2"/>')
        s.add(f'<rect x="{x}" y="220" width="55" height="40" rx="4" class="d-line d-green d-stroke"/>')
    else:
        s.add(f'<rect x="{x}" y="220" width="55" height="40" rx="4" class="d-ext"/>')
    s.text(x + 27.5, 244, "128 KB", "d-s", "middle")
s.text(20, 280, "Target: 3 blobs, ~384 KB", "d-s d-green d-ct")
s.text(380, 280, "Max: 6 blobs, ~768 KB", "d-s", "end")
s.text(20, 312, "Priced in a fee market of their own, apart from gas.", "d-s")
s.render()

# ── 6. ERC-4337 (interactive: src/data/diagrams/erc4337-flow.ts) ──
s = Svg("erc4337-flow", 400, 340, "You sign a UserOperation offchain and a bundler wraps it in a real transaction. Onchain, the EntryPoint contract has your smart wallet validate it, then executes it. An optional paymaster can sponsor the gas")
s.text(20, 22, "Offchain: not a transaction yet", "d-s")
s.box(20, 32, 142, 54, "You", "sign a UserOperation", accent="violet", node="user")
s.box(222, 32, 158, 54, "Bundler", "wraps it in a real tx", accent="blue", node="bundler")
s.arrow([(162, 59), (220, 59)], "UserOp", 191, 53, "middle", edge="user-bundler")
s.rule(118)
s.text(20, 136, "Onchain", "d-s")
s.arrow([(301, 86), (301, 152)], "a real transaction", 293, 108, "end", edge="bundler-entrypoint")
s.box(20, 154, 360, 54, "EntryPoint", "singleton contract: validates, then executes", accent="blue", node="entrypoint")
s.box(20, 272, 142, 54, "Paymaster", "optional", accent="amber", dashed=True, node="paymaster")
s.box(222, 272, 158, 54, "Your smart wallet", "your account", accent="green", node="wallet")
s.arrow([(91, 272), (91, 210)], "sponsors gas", 99, 245, dashed=True, edge="paymaster-entrypoint")
s.arrow([(272, 272), (272, 210)], "1 validate", 264, 245, "end", edge="wallet-entrypoint")
s.arrow([(330, 208), (330, 270)], "2 execute", 338, 245, edge="entrypoint-wallet")
s.render()

# ── 7. ERC-6551: what a transfer changes ────────────────────────
s = Svg("erc6551-transfer", 400, 318, "Before and after an NFT transfer. The owner of Character NFT 42 changes. The NFT's token bound account, and the sword, gold and POAP inside it, stay exactly as they were")
s.text(20, 22, "Transfer the NFT and the account follows", "d-t")
for x, heading, owner, acc in ((20, "Before", "You", "violet"), (210, "After the transfer", "New owner", "green")):
    s.text(x, 48, heading, "d-s")
    s.box(x, 56, 170, 36, owner, accent=acc)
    s.arrow([(x + 40, 92), (x + 40, 116)], "owns", x + 48, 108)
    s.box(x, 118, 170, 36, "Character NFT #42")
    s.arrow([(x + 40, 154), (x + 40, 178)], "controls", x + 48, 170)
    s.add(f'<rect x="{x}" y="180" width="170" height="92" rx="8" class="d-box"/>')
    s.text(x + 14, 202, "Token bound account", "d-t")
    for i, item in enumerate(("Sword NFT", "500 GOLD", "POAP")):
        s.text(x + 14, 222 + i * 16, item, "d-s")
s.text(20, 300, "Only the top box changes. Nothing inside the account moves.", "d-s")
s.render()

# ── 8. EIP-7702: one field changes ──────────────────────────────
s = Svg("eip7702-code", 400, 286, "A transaction carrying an authorization_list, signed by your EOA, changes one field of your account: the code field goes from empty to a pointer at a smart wallet contract. The address, ENS name, approvals and history stay the same")
s.text(20, 22, "Same account, one field changes", "d-t")
s.box(20, 36, 360, 54, "A transaction with an authorization_list", "signed statement: treat my EOA as this contract", accent="blue")
s.add('<rect x="20" y="104" width="230" height="166" rx="8" class="d-box"/>')
s.text(34, 124, "Your EOA", "d-t")
s.add('<rect x="30" y="130" width="210" height="30" rx="4" class="d-green d-fill" opacity="0.18"/>')
s.arrow([(170, 90), (170, 128)])
s.text(40, 150, "Code", "d-s")
s.text(232, 150, "empty → pointer", "d-s d-green d-ct", "end")
for i, field in enumerate(("Address", "ENS name", "Token approvals", "History")):
    y = 180 + i * 24
    s.text(40, y, field, "d-s")
    s.text(232, y, "unchanged", "d-s", "end")
s.arrow([(240, 145), (278, 145)])
s.box(280, 118, 100, 54, "Smart wallet", "contract", anchor="middle")
s.text(280, 200, "Same address, so", "d-s")
s.text(280, 216, "there's nothing", "d-s")
s.text(280, 232, "to migrate.", "d-s")
s.render()
