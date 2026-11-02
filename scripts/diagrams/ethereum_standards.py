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
    ("Honors it", "Rarible and others: the creator is paid", "green"),
    ("Makes it optional", "Blur, OpenSea since 2023: may get nothing", "amber"),
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


def chip(s, x, y, w, h, acc, lines, stroke=True):
    """A tinted rectangle with one or two centered labels."""
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="d-{acc} d-fill" opacity="0.16"/>')
    if stroke:
        s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="d-line d-{acc} d-stroke"/>')
    cx = x + w / 2
    if len(lines) == 1:
        s.text(cx, y + h / 2 + 4, lines[0], "d-s", "middle")
    else:
        s.text(cx, y + h / 2 - 4, lines[0], "d-t", "middle")
        s.text(cx, y + h / 2 + 12, lines[1], "d-s", "middle")


# ── 9. The whole timeline (interactive: src/data/diagrams/eth-standards-timeline.ts) ──
s = Svg("eth-standards-timeline", 400, 386, "Ten standards in order. Primitives: ERC-20 in 2015, EIP-155 in 2016, ERC-721 in 2018. Mechanics: ERC-1155 in 2019, ERC-2981 in 2020, EIP-1559 in 2021. Accounts: ERC-4337 and ERC-6551 in 2023, EIP-7702 in 2025. Scaling: EIP-4844 in 2024")
for (x, label, acc) in ((20, "Primitives", "violet"), (108, "Mechanics", "blue"), (196, "Scaling", "green"), (270, "Accounts", "amber")):
    s.add(f'<circle cx="{x + 4}" cy="16" r="4" class="d-{acc} d-fill"/>')
    s.text(x + 13, 20, label, "d-s")
rows = [
    ("erc20", "ERC-20", "fungible tokens", "2015", "violet"),
    ("eip155", "EIP-155", "replay protection", "2016", "violet"),
    ("erc721", "ERC-721", "NFTs", "2018", "violet"),
    ("erc1155", "ERC-1155", "multi-token contracts", "2019", "blue"),
    ("erc2981", "ERC-2981", "NFT royalty info", "2020", "blue"),
    ("eip1559", "EIP-1559", "fee market", "2021", "blue"),
    ("erc4337", "ERC-4337", "smart wallets", "2023", "amber"),
    ("erc6551", "ERC-6551", "token bound accounts", "2023", "amber"),
    ("eip4844", "EIP-4844", "blobs", "2024", "green"),
    ("eip7702", "EIP-7702", "EOAs delegate to code", "2025", "amber"),
]
for i, (node, title, sub, year, acc) in enumerate(rows):
    y = 34 + i * 35
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="20" y="{y}" width="360" height="30" rx="6" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y + 15}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 19.5, title, "d-t")
    s.text(124, y + 19, sub, "d-s")
    s.text(366, y + 19, year, "d-s", "end")
    s.add("</g>")
s.render()

# ── 10. ERC-20: who sends what (interactive: src/data/diagrams/erc20-approve-flow.ts) ──
s = Svg("erc20-approve-flow", 400, 244, "You send the first transaction, approve with an infinite amount, which sets an allowance on the token contract. The DEX sends the second, transferFrom, which spends your allowance")
you, token, dex = 70, 200, 330
s.box(20, 14, 100, 54, "You (EOA)", "wallet", anchor="middle", node="you")
s.box(140, 14, 120, 54, "Token contract", "ERC-20", anchor="middle", node="token")
s.box(280, 14, 100, 54, "DEX / DApp", "spender", anchor="middle", node="dex")
for x in (you, token, dex):
    s.add(f'<line x1="{x}" y1="68" x2="{x}" y2="232" class="d-line d-faint" stroke-dasharray="4 3"/>')
a = 'data-edge="you-token"'
s.text(135, 96, "Tx 1, from you", "d-s", "middle", a)
s.text(135, 114, "approve(dex, ∞)", "d-s d-m", "middle", a)
s.arrow([(you + 2, 124), (token - 3, 124)], edge="you-token")
s.text(135, 140, "sets allowance", "d-s d-blue d-ct", "middle", a)
a = 'data-edge="dex-token"'
s.text(265, 168, "Tx 2, from the dex", "d-s", "middle", a)
s.text(265, 186, "transferFrom(", "d-s d-m", "middle", a)
s.text(265, 200, "you, dex, amt)", "d-s d-m", "middle", a)
s.arrow([(dex - 2, 210), (token + 3, 210)], edge="dex-token")
s.text(265, 226, "spends your allowance", "d-s d-amber d-ct", "middle", a)
s.render()

# ── 11. EIP-155: before and after ───────────────────────────────
s = Svg("eip155-replay", 400, 262, "Before EIP-155, sending 10 ETH on Ethereum could be replayed on Ethereum Classic, draining 10 ETC too. After it, a transaction signed for chain 1 is rejected by chain 61, because the chain ID doesn't match")
s.text(20, 22, "Before EIP-155", "d-t")
s.box(20, 34, 130, 44, "Ethereum (ETH)", anchor="middle")
s.box(250, 34, 130, 44, "Eth Classic (ETC)", anchor="middle")
s.arrow([(150, 56), (248, 56)])
s.text(199, 48, "send 10 ETH", "d-s", "middle")
s.text(200, 100, "The same tx replayed: 10 ETC also drained", "d-s d-rose d-ct", "middle")
s.rule(118)
s.text(20, 144, "After EIP-155", "d-t")
s.box(20, 156, 130, 54, "ETH (chain 1)", "tx signed for chain 1", anchor="middle")
s.box(250, 156, 130, 54, "ETC (chain 61)", "rejects chain 1 tx", anchor="middle")
s.add('<path d="M150,183 L206,183" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.add('<path d="M212,177 L224,189 M224,177 L212,189" class="d-line d-rose d-stroke" stroke-width="2"/>')
s.text(200, 238, "chainId mismatch: the tx is invalid", "d-s d-green d-ct", "middle")
s.render()

# ── 12. Three token models ──────────────────────────────────────
s = Svg("erc-token-models", 400, 312, "ERC-20 is fungible, with one contract per token and one transaction per transfer. ERC-721 is non-fungible, with one contract per collection and one transaction per transfer. ERC-1155 holds both in one contract for everything, with one transaction for a batch transfer")
models = [
    ("ERC-20", "fungible: all identical", "1 contract per token", "1 tx per transfer", [("USDC", "blue")] * 3),
    ("ERC-721", "non-fungible: all unique", "1 contract per collection", "1 tx per transfer", [("#01", "violet"), ("#02", "rose"), ("#03", "green")]),
    ("ERC-1155", "both: multi-token", "1 contract for everything", "1 tx for batch transfer", [("gold", "amber")] * 3 + [("#01", "violet")]),
]
for i, (title, sub, contract, tx, items) in enumerate(models):
    y = 8 + i * 100
    last = i == 2
    s.add(f'<rect x="20" y="{y}" width="360" height="92" rx="8" class="d-box"/>')
    s.text(34, y + 22, title, "d-t")
    s.text(34, y + 38, sub, "d-s")
    s.text(366, y + 22, contract, "d-s d-green d-ct" if last else "d-s", "end")
    s.text(366, y + 38, tx, "d-s d-green d-ct" if last else "d-s", "end")
    for k, (label, acc) in enumerate(items):
        chip(s, 34 + k * 56, y + 52, 50, 28, acc, [label])
s.render()

# ── 13. EIP-1559: where the fee goes ────────────────────────────
s = Svg("eip1559-fee-split", 400, 268, "Before 1559 you guessed a gas price in a blind auction and all of it went to miners. After it, your max fee is a ceiling that splits into a base fee, set by the protocol and burned, a priority fee that tips the validator, and an unused part that is refunded")
s.text(20, 22, "Before 1559", "d-t")
s.add('<rect x="20" y="34" width="360" height="76" rx="8" class="d-box"/>')
s.text(34, 56, "You pay: ??? gwei", "d-t")
s.text(34, 76, "Blind auction: guess and hope", "d-s")
s.text(34, 94, "100% goes to miners", "d-s d-rose d-ct")
s.text(20, 144, "After 1559", "d-t")
chip(s, 20, 156, 190, 50, "violet", ["Base fee", "algorithmic"])
chip(s, 214, 156, 96, 50, "green", ["Priority fee", "tip"])
s.add('<rect x="314" y="156" width="66" height="50" rx="5" class="d-ext"/>')
s.text(347, 185, "Unused", "d-s", "middle")
s.text(115, 224, "Burned: destroyed forever", "d-s d-rose d-ct", "middle")
s.text(262, 224, "To the validator", "d-s d-green d-ct", "middle")
s.text(347, 224, "Refunded", "d-s", "middle")
s.add('<path d="M20,234 v6 h360 v-6" class="d-line d-faint"/>')
s.text(200, 258, "Max fee: your ceiling", "d-s", "middle")
s.render()

# ── 14. EIP-4844: where rollup data goes ────────────────────────
s = Svg("eip4844-rollups", 400, 334, "Before 4844, Arbitrum, Optimism and Base posted data to the L1 block as calldata, expensive and permanent, at about 10 to 50 cents per transaction. After it they post blobs, cheap and pruned after about 18 days, at about a tenth of a cent, 10 to 100 times cheaper")


def rollups(y):
    for i, name in enumerate(("Arbitrum", "Optimism", "Base")):
        x = 20 + i * 124
        s.box(x, y, 112, 36, name, anchor="middle")
        s.add(f'<path d="M{x + 56},{y + 36} v14" class="d-line"/>')
    s.add(f'<path d="M76,{y + 50} H324" class="d-line"/>')


s.text(20, 22, "Before 4844: L2 data as calldata", "d-t")
rollups(32)
s.arrow([(106, 82), (106, 100)])
s.box(20, 102, 172, 44, "L1 block", anchor="middle")
s.text(208, 118, "$0.10-0.50/tx", "d-t d-rose d-ct")
s.text(208, 136, "calldata: expensive, permanent", "d-s")
s.rule(166)
s.text(20, 192, "After 4844: L2 data as blobs", "d-t")
rollups(202)
s.arrow([(106, 252), (106, 270)])
for i in range(3):
    chip(s, 20 + i * 60, 272, 52, 44, "green", ["blob"])
s.text(208, 288, "~$0.001/tx", "d-t d-green d-ct")
s.text(208, 306, "cheap, pruned after ~18 days", "d-s")
s.text(208, 322, "10-100x cheaper", "d-s")
s.render()

# ── 15. ERC-6551: what sits inside what ─────────────────────────
s = Svg("erc6551-nesting", 400, 354, "You, at 0xABC, own Character NFT number 42, an ERC-721. Inside it sits a token bound account, ERC-6551, at 0xTBA, which holds a Sword NFT, 500 GOLD, a POAP and credentials")
s.box(20, 14, 170, 54, "You (owner)", "0xABC...", accent="violet")
s.arrow([(60, 68), (60, 96)], "owns", 70, 87)
s.add('<rect x="20" y="98" width="360" height="242" rx="8" class="d-ext"/>')
s.text(34, 120, "Character NFT #42 (ERC-721)", "d-t")
s.add('<rect x="32" y="132" width="336" height="196" rx="8" class="d-box"/>')
s.text(46, 154, "Token Bound Account (ERC-6551)", "d-t")
s.text(46, 170, "0xTBA...", "d-s")
items = [
    ("Sword NFT", "ERC-721", "violet"), ("500 GOLD", "ERC-20", "amber"),
    ("POAP", "ERC-721", "blue"), ("Credentials", "attestations", "green"),
]
for i, (title, sub, acc) in enumerate(items):
    chip(s, 46 + (i % 2) * 158, 184 + (i // 2) * 66, 150, 58, acc, [title, sub])
s.render()

# ── 16. EIP-7702: what the delegation buys ──────────────────────
s = Svg("eip7702-powers", 400, 352, "Before 7702, your EOA has only a private key and just signs transactions. With 7702 the same address delegates to a smart wallet's code and gains batch transactions, gas sponsorship, passkeys, recovery, session keys and limits. The delegation stays until a later authorization changes or clears it")
s.text(20, 22, "Before 7702", "d-t")
s.box(20, 34, 150, 54, "Your EOA", "private key only")
s.text(188, 65, "Just signs txs, nothing more", "d-s")
s.rule(106)
s.text(20, 132, "With 7702", "d-t")
s.box(20, 144, 150, 54, "Your EOA", "same address", accent="violet")
s.box(230, 144, 150, 54, "Smart wallet", "delegated code", accent="green")
s.arrow([(170, 171), (228, 171)])
s.text(199, 163, "delegates", "d-s", "middle")
s.arrow([(305, 198), (305, 226)], "gives the EOA", 295, 217, "end")
powers = ["batch txs", "gas sponsor", "passkeys", "recovery", "session keys", "limits"]
for i, label in enumerate(powers):
    chip(s, 20 + (i % 3) * 124, 228 + (i // 3) * 36, 112, 30, "green", [label])
s.text(20, 322, "The delegation stays in place until a later authorization", "d-s")
s.text(20, 338, "changes it or clears it.", "d-s")
s.render()

# ── 17. The layers ──────────────────────────────────────────────
s = Svg("eth-standards-layers", 400, 214, "Three layers stacked on each other. ERC-20 at the bottom gives you DeFi. EIP-1559 and EIP-4844 on top of it make DeFi cheap. ERC-4337 and EIP-7702 on top of that let you onboard normal users")
for x, w, y, title, sub, acc in (
    (100, 200, 14, "Normal users", "ERC-4337, EIP-7702", "amber"),
    (60, 280, 76, "Cheap DeFi", "EIP-1559, EIP-4844", "green"),
    (20, 360, 138, "DeFi", "ERC-20", "violet"),
):
    s.box(x, y, w, 54, title, sub, accent=acc)
s.render()
