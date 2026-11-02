"""Diagrams for the multisig post. Run: python3 scripts/diagrams/multisig.py"""
from diagram_lib import *


def key(s, x, y, needed, color="d-green d-stroke"):
    cls = color if needed else "d-faint"
    s.add(f'<circle cx="{x + 5}" cy="{y}" r="4.5" class="d-line {cls}"/>')
    s.add(f'<path d="M{x + 9.5},{y} h13 M{x + 18},{y} v4 M{x + 22},{y} v4" class="d-line {cls}"/>')


# ── 1. What each quorum buys you ────────────────────────────────
s = Svg("multisig-quorums", 400, 276, "Compared with one key, 1-of-2 lets you lose a key but is easier to steal from. 3-of-3 needs three stolen keys but one lost key is fatal. 2-of-3 is the smallest setup that improves both: a thief needs two keys and you can lose one")
s.text(240, 22, "Thief needs", "d-s", "middle")
s.text(332, 22, "You can lose", "d-s", "middle")
rows = [("1 key", 1, 1, None, None), ("1-of-2", 1, 2, "rose", "green"), ("2-of-3", 2, 3, "green", "green"), ("3-of-3", 3, 3, "green", "rose")]
for i, (label, m, n, thief, lose) in enumerate(rows):
    y = 58 + i * 46
    if label == "2-of-3":
        s.add(f'<rect x="20" y="{y - 22}" width="360" height="44" rx="6" class="d-green d-fill" opacity="0.1"/>')
    s.text(32, y + 4.5, label, "d-t")
    for k in range(n):
        key(s, 92 + k * 30, y, k < m)
    s.text(240, y + 4.5, str(m), f"d-t d-{thief} d-ct" if thief else "d-t", "middle")
    s.text(332, y + 4.5, str(n - m), f"d-t d-{lose} d-ct" if lose else "d-t", "middle")
s.rule(232)
s.text(20, 256, "2-of-3 is the smallest setup that improves both.", "d-t")
s.render()

# ── 2. How Bybit lost $1.44 billion (interactive: src/data/diagrams/multisig-bybit.ts) ──
s = Svg("multisig-bybit", 400, 508, "Attackers went from a Safe developer's machine to Safe's cloud and modified the multisig frontend. Signers saw a routine transfer while the payload replaced the wallet's code. Hardware wallets showed only a hash, so nobody could compare the two. The threshold was met, every signature was valid, and 1.44 billion dollars left the wallet")
s.box(20, 16, 172, 54, "Developer's machine", "Compromised first", accent="rose", node="dev")
s.box(208, 16, 172, 54, "Safe's cloud", "Reached from there", accent="rose", node="cloud")
s.arrow([(192, 43), (206, 43)], edge="dev-cloud")
s.arrow([(294, 70), (294, 104)], edge="cloud-frontend")
s.box(20, 106, 360, 54, "Compromised frontend", "Attackers modified the multisig UI's JavaScript", accent="rose", node="frontend")
s.arrow([(106, 160), (106, 194)], edge="frontend-screen")
s.arrow([(294, 160), (294, 194)], edge="frontend-payload")
s.box(20, 196, 172, 54, "Screen showed", "A routine transfer", accent="green", node="screen")
s.box(208, 196, 172, 54, "Payload held", "Replace the wallet's code", accent="rose", node="payload")
s.arrow([(106, 250), (106, 284)], edge="screen-hardware")
s.arrow([(294, 250), (294, 284)], edge="payload-hardware")
s.box(20, 286, 360, 54, "Hardware wallets", "Showed a hash, so nobody could compare the two", accent="amber", node="hardware")
s.arrow([(200, 340), (200, 374)], "signed", 210, 361, edge="hardware-multisig")
s.box(20, 376, 360, 54, "The multisig", "Threshold met, every signature valid", accent="green", node="multisig")
s.rule(448)
s.text(20, 472, "$1.44 billion gone, and no key was ever stolen.", "d-t")
s.text(20, 490, "Multisig guards signatures. The attack came through the display.", "d-s")
s.render()

# ── 3. Where the rule lives ─────────────────────────────────────
s = Svg("multisig-mpc", 400, 330, "In multisig, n separate keys each produce a signature and the blockchain enforces the threshold, so it rejects an under-signed transaction. In MPC, one key is split into n shares, an off-chain signing protocol enforces the threshold, and the chain sees one ordinary signature, so it can't catch a broken or compromised protocol")
s.text(20, 22, "Multisig", "d-t")
s.text(20, 38, "n separate keys", "d-s")
s.text(210, 22, "MPC / TSS", "d-t")
s.text(210, 38, "One key, split into n shares", "d-s")
for i in range(3):
    s.box(20 + i * 60, 52, 50, 28, "key", anchor="middle")
    s.box(210 + i * 60, 52, 50, 28, "share", anchor="middle")
    s.arrow([(45 + i * 60, 80), (45 + i * 60, 204)])
    s.arrow([(235 + i * 60, 80), (235 + i * 60 + (295 - (235 + i * 60)) * 0.4, 110)])
s.arrow([(295, 164), (295, 204)], "one signature", 287, 181, "end")
s.add('<line x1="20" y1="186" x2="380" y2="186" class="d-line d-faint" stroke-dasharray="3 4"/>')
s.text(380, 180, "off-chain", "d-s", "end")
s.text(380, 200, "on-chain", "d-s", "end")
s.text(75, 136, "signs", "d-s", "middle")
s.add('<rect x="210" y="112" width="170" height="52" rx="8" class="d-box d-violet"/>')
s.add('<rect x="210" y="112" width="170" height="52" rx="8" class="d-violet d-fill" opacity="0.1"/>')
s.text(224, 134, "Signing protocol", "d-t")
s.text(224, 150, "The rule lives here", "d-s d-violet d-ct")
s.add('<rect x="20" y="206" width="170" height="52" rx="8" class="d-box d-violet"/>')
s.add('<rect x="20" y="206" width="170" height="52" rx="8" class="d-violet d-fill" opacity="0.1"/>')
s.text(34, 228, "The blockchain", "d-t")
s.text(34, 244, "The rule lives here", "d-s d-violet d-ct")
s.box(210, 206, 170, 52, "The blockchain", "Sees an ordinary signature")
s.text(20, 282, "Rejects an under-signed", "d-s d-green d-ct")
s.text(20, 298, "transaction by consensus", "d-s d-green d-ct")
s.text(210, 282, "Nothing here catches a broken", "d-s d-rose d-ct")
s.text(210, 298, "or compromised protocol", "d-s d-rose d-ct")
s.render()

# ── 4. What the chain sees, by era ──────────────────────────────
s = Svg("multisig-bitcoin-history", 400, 296, "Four steps in Bitcoin multisig. Bare multisig in 2011 shows every key. P2SH in 2012 shows a hash until you spend. P2WSH in 2017 moves the script to the witness and cuts fees. Taproot in 2021 shows one key and one signature")
s.text(20, 22, "What the chain sees", "d-t")
eras = [
    ("2011", "Bare multisig", "Every public key, in the output", "rose"),
    ("2012", "P2SH", "A hash, until you spend", "amber"),
    ("2017", "P2WSH", "The script in a witness, lower fees", "blue"),
    ("2021", "Taproot", "One key, one signature", "green"),
]
s.add('<line x1="72" y1="52" x2="72" y2="256" class="d-line d-faint"/>')
for i, (year, name, sub, acc) in enumerate(eras):
    y = 56 + i * 66
    s.text(20, y + 4, year, "d-t")
    s.add(f'<circle cx="72" cy="{y}" r="5" class="d-{acc} d-fill"/>')
    s.text(88, y + 4, name, "d-t")
    s.text(88, y + 20, sub, "d-s")
for k in range(3):
    key(s, 306 + k * 26, 56, True)
s.add('<rect x="316" y="108" width="64" height="28" rx="5" class="d-box"/>')
s.text(348, 127, "hash", "d-s", "middle")
s.add('<rect x="316" y="174" width="64" height="28" rx="5" class="d-box"/>')
s.text(348, 193, "witness", "d-s", "middle")
key(s, 352, 254, True)
s.render()

# ── 5. MuSig2 and FROST ─────────────────────────────────────────
s = Svg("multisig-musig-frost", 400, 222, "MuSig2 is n-of-n: with all three signing it works, and with one offline nobody can spend. FROST is a threshold: in a 2-of-3, one signer offline changes nothing. Both produce one aggregate signature")


def signers(x, y, up):
    for i in range(3):
        cx = x + 12 + i * 28
        cls = "d-green d-fill" if i < up else "d-ext"
        s.add(f'<circle cx="{cx}" cy="{y}" r="10" class="{cls}"/>')


s.text(20, 22, "MuSig2", "d-t")
s.text(20, 38, "n-of-n: everyone signs", "d-s")
s.text(210, 22, "FROST", "d-t")
s.text(210, 38, "m-of-n: 2-of-3 here", "d-s")
for x in (20, 210):
    signers(x, 70, 3)
    s.text(x + 100, 74, "valid", "d-s d-green d-ct")
    s.text(x, 104, "All three online", "d-s")
    signers(x, 138, 2)
    s.text(x, 172, "One offline", "d-s")
s.text(120, 142, "stuck", "d-s d-rose d-ct")
s.text(310, 142, "valid", "d-s d-green d-ct")
s.text(20, 206, "Either way, the chain sees one aggregate signature.", "d-t")
s.render()

# ── 6. A Safe spend (interactive: src/data/diagrams/multisig-safe-flow.ts) ──
s = Svg("multisig-safe-flow", 400, 340, "Owners sign EIP-712 messages off-chain and the signatures are collected. Once the threshold is met they go on-chain to the Safe, a smart contract that holds the funds, stores the owner list and threshold, and executes the transaction")
s.box(20, 14, 360, 54, "Owners", "Each signs an EIP-712 message", accent="violet", node="owners")
s.arrow([(200, 68), (200, 94)], edge="owners-signatures")
s.box(20, 96, 360, 54, "Signatures collected", "Until the threshold is met", accent="blue", node="signatures")
s.add('<line x1="20" y1="174" x2="380" y2="174" class="d-line d-faint" stroke-dasharray="3 4"/>')
s.text(380, 168, "off-chain", "d-s", "end")
s.text(380, 188, "on-chain", "d-s", "end")
s.arrow([(200, 150), (200, 196)], "one transaction", 192, 168, "end", edge="signatures-safe")
s.box(20, 198, 360, 54, "The Safe contract", "Holds the funds, checks owners and threshold", accent="green", node="safe")
s.arrow([(200, 252), (200, 278)], edge="safe-target")
s.box(20, 280, 360, 48, "The transaction runs", node="target")
s.render()

# ── 7. Same screen ──────────────────────────────────────────────
s = Svg("multisig-one-screen", 400, 240, "Three signers or nine, each one reviews the same compromised screen. Below them the signature layer works perfectly and every signature is valid, so adding signers adds nothing here")
s.box(20, 14, 360, 54, "One compromised screen", "The display layer, shared by everyone", accent="rose")
for i in range(9):
    x = 40 + i * 40
    near = i < 3
    cls = "d-line" if near else "d-line d-faint"
    s.add(f'<path d="M{x},68 V110" class="{cls}"/>')
    fill = "d-amber d-fill" if near else "d-ext"
    s.add(f'<circle cx="{x}" cy="122" r="11" class="{fill}"/>')
s.text(40 - 11, 152, "3 signers", "d-s")
s.text(371, 152, "or 9, the same screen", "d-s", "end")
s.box(20, 170, 360, 54, "The signature layer", "Held: every signature valid", accent="green")
s.render()

# ── 8. Correlated failures ──────────────────────────────────────
s = Svg("multisig-correlated", 400, 280, "Three keys look like three independent risks, but keys in one house share a fire, keys in one password manager share a breach, and keys held by three co-founders share a falling-out. One event can take them all")
s.text(20, 22, "Three keys, one event", "d-t")
s.text(20, 38, "A sketch of the failures that take all of them at once", "d-s")
rows = [("One house", "share a fire"), ("One password manager", "share a breach"), ("Three co-founders", "share a falling-out")]
for i, (place, event) in enumerate(rows):
    y = 54 + i * 72
    s.add(f'<rect x="20" y="{y}" width="360" height="62" rx="8" class="d-ext"/>')
    s.text(34, y + 25, place, "d-t")
    s.text(34, y + 43, event, "d-s d-rose d-ct")
    for k in range(3):
        key(s, 262 + k * 36, y + 31, True, "d-rose d-stroke")
s.render()

# ── 9. Choosing (interactive: src/data/diagrams/multisig-choosing.ts) ──
s = Svg("multisig-choosing", 400, 342, "If the public must verify the rules, use on-chain multisig. If not and you're an institution across many chains, use MPC. If not and you're one person, use a 2-of-3. A team or DAO uses a Safe")
s.box(20, 14, 212, 54, "Public must verify it?", "That the rules were followed", node="q1")
s.box(20, 100, 212, 54, "Institution, many chains?", "Thousands of wallets", node="q2")
s.box(20, 186, 212, 54, "Just one person?", "Meaningful savings", node="q3")
s.box(268, 14, 112, 54, "On-chain", "multisig", accent="green", node="onchain")
s.box(268, 100, 112, 54, "MPC", "audit trail lost", accent="amber", node="mpc")
s.box(268, 186, 112, 54, "2-of-3", "3 locations", accent="green", node="solo")
s.box(20, 272, 360, 54, "Safe", "Threshold matched to governance, one signer verifying", accent="green", node="safe")
s.arrow([(232, 41), (266, 41)], "yes", 249, 34, "middle", edge="q1-onchain")
s.arrow([(232, 127), (266, 127)], "yes", 249, 120, "middle", edge="q2-mpc")
s.arrow([(232, 213), (266, 213)], "yes", 249, 206, "middle", edge="q3-solo")
s.arrow([(126, 68), (126, 98)], "no", 136, 88, edge="q1-q2")
s.arrow([(126, 154), (126, 184)], "no", 136, 174, edge="q2-q3")
s.arrow([(126, 240), (126, 270)], "no", 136, 260, edge="q3-safe")
s.render()
