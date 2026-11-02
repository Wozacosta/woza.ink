"""Diagrams for the randomness post. Run: python3 scripts/diagrams/true_randomness.py"""
import math

from diagram_lib import *

# ── 1. From physical noise to getrandom() (interactive: src/data/diagrams/rng-pipeline.ts) ──
s = Svg("rng-pipeline", 400, 254, "Interrupt timing, disk and network jitter, keyboard and mouse events, RDRAND and CPU jitter all feed one entropy pool. The pool seeds a CSPRNG, and getrandom hands its output to your code")
sources = [("interrupts", "Interrupt timing"), ("io", "Disk and network"), ("input", "Keyboard and mouse"), ("rdrand", "RDRAND"), ("jitter", "CPU jitter")]
for i, (node, name) in enumerate(sources):
    y = 16 + i * 38
    s.box(20, y, 150, 30, name, node=node)
    s.add(f'<line x1="170" y1="{y + 15}" x2="190" y2="{y + 15}" class="d-line"/>')
s.add('<line x1="190" y1="31" x2="190" y2="183" class="d-line"/>')
s.arrow([(190, 40), (218, 40)])
s.box(220, 16, 160, 48, "Entropy pool", "Mixes every source", accent="violet", node="pool")
s.arrow([(300, 64), (300, 82)], edge="pool-csprng")
s.box(220, 84, 160, 48, "CSPRNG", "Seed in, gigabytes out", accent="blue", node="csprng")
s.arrow([(300, 132), (300, 150)], edge="csprng-getrandom")
s.box(220, 152, 160, 48, "getrandom()", "What your code calls", accent="green", node="getrandom")
s.rule(216)
s.text(20, 240, "You need true randomness once. After that it's arithmetic.", "d-s")
s.render()

# ── 2. Rolls needed for a 256-bit seed ──────────────────────────
s = Svg("dice-rolls", 400, 262, "Bars to scale. Hashing the transcript needs 100 dice rolls for a 256-bit seed, rejection sampling about 192, and binary reduction 256")
s.text(20, 22, "Dice rolls for a 256-bit seed", "d-t")
s.text(20, 38, "To scale. A fair die gives about 2.585 bits per roll.", "d-s")
methods = [
    ("Hash the transcript", "SHA-256 over every roll", 100, "green"),
    ("Rejection sampling", "Keep 1–4, reject 5 and 6", 192, "amber"),
    ("Binary reduction", "1–3 is 0, 4–6 is 1", 256, "rose"),
]
for i, (name, how, rolls, acc) in enumerate(methods):
    y = 68 + i * 54
    s.text(20, y, name, "d-t")
    s.text(380, y, how, "d-s", "end")
    s.add(f'<rect x="20" y="{y + 9}" width="{rolls * 1.2}" height="18" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(20 + rolls * 1.2 + 8, y + 22, str(rolls), f"d-t d-{acc} d-ct")
s.rule(226)
s.text(20, 250, "Doubt your dice? Roll 120 and hash them.", "d-s")
s.render()

# ── 3. Which tool gives which property (interactive: src/data/diagrams/rng-properties.ts) ──
s = Svg("rng-properties", 400, 296, "Five randomness tools against three properties. dev urandom is only unpredictable. Commit-reveal is verifiable, can be made unbiasable, and is often predictable to the first participant. PREVRANDAO is verifiable, but the last proposer can bias it one bit. A VRF is unbiasable and verifiable, though the oracle sees the value first. drand offers all three, and its values are public the moment they exist")
s.text(20, 22, "Three properties, five tools", "d-t")
s.text(20, 38, "Filled: yes. Half: partly. Empty: no.", "d-s")
cols = [(212, "Unpredictable"), (288, "Unbiasable"), (354, "Verifiable")]
for x, label in cols:
    s.text(x, 66, label, "d-s", "middle")
rows = [
    ("urandom", "/dev/urandom", "Your own machine", (2, 0, 0)),
    ("commit", "Commit-reveal", "Publish a hash, reveal later", (0, 1, 2)),
    ("randao", "PREVRANDAO", "Beacon chain RANDAO", (1, 1, 2)),
    ("vrf", "VRF", "Value plus a proof", (1, 2, 2)),
    ("drand", "drand", "Threshold beacon", (2, 2, 2)),
]
for i, (node, name, sub, marks) in enumerate(rows):
    y = 76 + i * 42
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="20" y="{y}" width="360" height="36" rx="8" class="d-box"/>')
    s.text(32, y + 16, name, "d-t")
    s.text(32, y + 30, sub, "d-s")
    for (x, _), mark in zip(cols, marks):
        cy = y + 18
        if mark == 2:
            s.add(f'<circle cx="{x}" cy="{cy}" r="7" class="d-green d-fill"/>')
        elif mark == 1:
            s.add(f'<circle cx="{x}" cy="{cy}" r="6.5" class="d-line d-amber d-stroke"/>')
            s.add(f'<path d="M{x},{cy - 6.5} A6.5,6.5 0 0 0 {x},{cy + 6.5} z" class="d-amber d-fill"/>')
        else:
            s.add(f'<circle cx="{x}" cy="{cy}" r="6.5" class="d-line d-faint"/>')
    s.add("</g>")
s.render()

# ── 4. Three kinds of generator ─────────────────────────────────
s = Svg("rng-families", 400, 248, "Three kinds of generator. A TRNG harvests physical noise and is non-deterministic but slow. A PRNG is an algorithm: the same seed always gives the same stream, which suits simulations. A CSPRNG is a PRNG with an extra guarantee: output doesn't reveal the next value or the seed")
for i, (name, what, line1, line2, acc) in enumerate((
    ("TRNG", "physical noise", "Non-deterministic", "Slow, hard to verify", "amber"),
    ("PRNG", "seed plus algorithm", "Same seed, same stream", "Fast: simulations, games", "blue"),
    ("CSPRNG", "a PRNG with a guarantee", "Output won't reveal the seed", "Fast: keys, nonces", "green"),
)):
    y = 16 + i * 76
    s.add(f'<rect x="20" y="{y}" width="360" height="66" rx="8" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y + 19}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 24, name, "d-t")
    s.text(46, y + 44, what, "d-s")
    s.text(368, y + 24, line1, "d-s", "end")
    s.text(368, y + 44, line2, "d-s", "end")
s.render()

# ── 5. What blocks when ─────────────────────────────────────────
s = Svg("rng-boot", 400, 232, "What each interface does around boot on Linux 5.6 and later. Before the pool is initialized, dev random and getrandom block, while dev urandom keeps answering with weak output. After initialization all three give the same CSPRNG output and never block again")
s.text(20, 22, "Before and after the pool is ready", "d-t")
s.text(20, 38, "Linux 5.6 and later. Not to scale.", "d-s")
split = 232
for i, (name, before, acc) in enumerate((("getrandom()", "blocks", "green"), ("/dev/random", "blocks", "green"), ("/dev/urandom", "answers anyway", "rose"))):
    y = 58 + i * 42
    s.text(20, y + 21, name, "d-t d-m")
    s.add(f'<rect x="122" y="{y}" width="{split - 122 - 2}" height="32" rx="3" class="d-{acc} d-fill" opacity="{0.8 if acc == "rose" else 0.18}"/>')
    s.text(176, y + 20, before, "d-s", "middle", 'style="fill:var(--background,#faf8f5)"' if acc == "rose" else "")
    s.add(f'<rect x="{split + 2}" y="{y}" width="{380 - split - 2}" height="32" rx="3" class="d-green d-fill" opacity="0.8"/>')
    s.text(306, y + 20, "same CSPRNG", "d-s", "middle", 'style="fill:var(--background,#faf8f5)"')
s.add(f'<line x1="{split}" y1="50" x2="{split}" y2="190" class="d-line" stroke-dasharray="4 3"/>')
s.text(split, 206, "pool initialized", "d-s", "middle")
s.text(122, 206, "boot", "d-s")
s.text(380, 206, "forever after", "d-s", "end")
s.text(122, 222, "the dangerous window", "d-s d-rose d-ct")
s.render()

# ── 6. Where modulo bias comes from ─────────────────────────────
s = Svg("dice-mod4", 400, 250, "Six die faces taken as 0 to 5 and reduced mod 4. Faces 0 and 4 both give 0, faces 1 and 5 both give 1, face 2 gives 2 and face 3 gives 3. So 0 and 1 come up twice as often as 2 and 3")
s.text(20, 22, "Six faces into four boxes doesn't fit", "d-t")
s.text(20, 38, "Each face taken as 0–5, then reduced mod 4", "d-s")
face_x = [20 + i * 62 for i in range(6)]
bucket_x = [20 + i * 94 for i in range(4)]
for i, x in enumerate(face_x):
    s.add(f'<rect x="{x}" y="52" width="46" height="36" rx="6" class="d-box"/>')
    s.text(x + 23, 75, str(i), "d-t", "middle")
for i, x in enumerate(face_x):
    target = bucket_x[i % 4] + 41
    acc = "rose" if i % 4 < 2 else "green"
    s.arrow([(x + 23, 88), (target + (i - 2.5 if i % 4 < 2 else 0), 134)], faint=False)
for i, x in enumerate(bucket_x):
    acc = "rose" if i < 2 else "green"
    s.add(f'<rect x="{x}" y="136" width="82" height="36" rx="6" class="d-box"/>')
    s.text(x + 41, 159, format(i, "02b"), f"d-t d-m d-{acc} d-ct", "middle")
    height = 34 if i < 2 else 17
    s.add(f'<rect x="{x + 16}" y="{222 - height}" width="50" height="{height}" rx="2" class="d-{acc} d-fill" opacity="0.8"/>')
    s.text(x + 41, 238, "2 in 6" if i < 2 else "1 in 6", f"d-s d-{acc} d-ct", "middle")
s.render()

# ── 7. Noise against bias (widget: src/components/widgets/DiceWidget.tsx) ──
s = Svg("dice-noise", 400, 256, "How far one face of a fair die strays from one in six. After 100 rolls about 95 percent of runs fall between 9.2 and 24.1 percent, after 1,000 between 14.3 and 19.0 percent, and after 10,000 between 15.9 and 17.4 percent. A six that really lands 20 percent of the time sits inside the band at 100 rolls and well outside it at 10,000")
s.text(20, 22, "Noise shrinks slowly", "d-t")
s.text(20, 38, "Share of rolls for one fair face: about 95% of runs land in the bar", "d-s")
p = 1 / 6
x_pct = lambda pct: 20 + (pct - 5) * 360 / 25
top, bottom = 52, 208
s.add(f'<line x1="{x_pct(100 * p):.1f}" y1="{top}" x2="{x_pct(100 * p):.1f}" y2="{bottom}" class="d-line"/>')
s.add(f'<line x1="{x_pct(20):.1f}" y1="{top}" x2="{x_pct(20):.1f}" y2="{bottom}" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
for i, rolls in enumerate((100, 1000, 10000)):
    y = 70 + i * 48
    sigma = 100 * 2 * math.sqrt(p * (1 - p) / rolls)
    lo, hi = 100 * p - sigma, 100 * p + sigma
    s.text(20, y, f"{rolls:,} rolls", "d-s")
    s.text(380, y, f"{lo:.1f}–{hi:.1f}%", "d-s d-blue d-ct", "end")
    s.add(f'<rect x="{x_pct(lo):.1f}" y="{y + 7}" width="{x_pct(hi) - x_pct(lo):.1f}" height="16" rx="3" class="d-blue d-fill" opacity="0.55"/>')
s.add(f'<line x1="20" y1="{bottom}" x2="380" y2="{bottom}" class="d-line d-faint"/>')
for pct in (5, 10, 15, 20, 25, 30):
    s.text(f"{x_pct(pct):.1f}", bottom + 15, f"{pct}%", "d-s", "start" if pct == 5 else "end" if pct == 30 else "middle")
s.text(f"{x_pct(100 * p) - 4:.1f}", bottom + 32, "fair: 1 in 6", "d-s", "end")
s.text(f"{x_pct(20) + 4:.1f}", bottom + 32, "a loaded six, for example", "d-s d-rose d-ct")
s.render()

# ── 8. Commit-reveal (interactive: src/data/diagrams/rng-commit.ts) ──
s = Svg("rng-commit", 400, 306, "Provably fair commit-reveal. The operator publishes a hash of a server seed. The player supplies a client seed. Each round runs both seeds and a nonce through HMAC-SHA256. Later the operator reveals the server seed and the player recomputes every round")
s.box(20, 16, 130, 40, "Operator", accent="violet", node="operator")
s.box(250, 16, 130, 40, "Player", accent="green", node="player")
left, right = 85, 315
s.add(f'<line x1="{left}" y1="56" x2="{left}" y2="296" class="d-line d-faint"/>')
s.add(f'<line x1="{right}" y1="56" x2="{right}" y2="296" class="d-line d-faint"/>')
s.arrow([(left, 96), (right, 96)], "hash(server seed)", 200, 88, "middle", edge="operator-player")
s.arrow([(right, 146), (left, 146)], "client seed", 200, 138, "middle", edge="player-operator")
s.add(f'<g data-node="round"><rect x="110" y="166" width="180" height="48" rx="8" class="d-box"/>')
s.text(200, 186, "Each round", "d-t", "middle")
s.text(200, 203, "HMAC-SHA256, nonce + 1", "d-s", "middle")
s.add("</g>")
s.arrow([(left, 244), (right, 244)], "server seed revealed", 200, 236, "middle", edge="operator-player-reveal")
s.text(right - 8, 276, "Recompute every round", "d-s d-green d-ct", "end")
s.add(f'<circle cx="{right}" cy="272" r="5" class="d-green d-fill"/>')
s.render()

# ── 9. The last proposer's choice ───────────────────────────────
s = Svg("rng-randao", 400, 216, "The last proposer in an epoch sees what RANDAO will be with and without their contribution. They can publish, or skip their slot and give up one block reward, so they choose between two outcomes: one bit of bias")
s.text(20, 22, "The last proposer gets a choice", "d-t")
for i in range(8):
    x = 20 + i * 32
    s.add(f'<rect x="{x}" y="42" width="26" height="26" rx="4" class="d-green d-fill" opacity="0.7"/>')
s.text(20, 86, "Earlier proposers mix in their signatures", "d-s")
s.add('<rect x="284" y="36" width="96" height="38" rx="6" class="d-box"/>')
s.text(332, 60, "Last slot", "d-t", "middle")
s.arrow([(310, 74), (310, 102), (106, 102), (106, 122)], faint=True)
s.arrow([(354, 74), (354, 122)], faint=True)
s.box(20, 124, 172, 54, "Publish", "the outcome with their mix", accent="green")
s.box(208, 124, 172, 54, "Skip the slot", "the outcome without it", accent="rose")
s.text(20, 204, "They pick the better one, for one missed block reward.", "d-s")
s.render()

# ── 10. Three failures, one cause ───────────────────────────────
s = Svg("rng-failures", 400, 286, "Three randomness failures on a timeline to scale. Debian OpenSSL from 2006 to 2008 cut the seed to 15 bits. The PlayStation 3 in 2010 signed with a constant nonce. Android SecureRandom in 2013 repeated nonces. In each case the cryptography above was sound")
s.text(20, 22, "Sound cryptography, bad randomness", "d-t")
x_year = lambda year: 20 + (year - 2006) * 360 / 8
axis = 54
s.add(f'<line x1="20" y1="{axis}" x2="380" y2="{axis}" class="d-line d-faint"/>')
for year in range(2006, 2015, 2):
    s.text(f"{x_year(year):.1f}", axis - 8, str(year), "d-s", "start" if year == 2006 else "end" if year == 2014 else "middle")
    s.add(f'<line x1="{x_year(year):.1f}" y1="{axis - 3}" x2="{x_year(year):.1f}" y2="{axis + 3}" class="d-line d-faint"/>')
s.add(f'<rect x="{x_year(2006.7):.1f}" y="{axis - 4}" width="{x_year(2008.37) - x_year(2006.7):.1f}" height="8" rx="2" class="d-rose d-fill"/>')
s.add(f'<circle cx="{x_year(2010.98):.1f}" cy="{axis}" r="5" class="d-amber d-fill"/>')
s.add(f'<circle cx="{x_year(2013.6):.1f}" cy="{axis}" r="5" class="d-violet d-fill"/>')
cards = [
    ("Debian OpenSSL, 2006–2008", "Seed cut to the process ID: 15 bits", "rose"),
    ("PlayStation 3, 2010", "One nonce for every signature", "amber"),
    ("Android SecureRandom, 2013", "Repeated ECDSA nonces", "violet"),
]
for i, (title, sub, acc) in enumerate(cards):
    y = 76 + i * 66
    s.add(f'<rect x="20" y="{y}" width="360" height="54" rx="8" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y + 18}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 22, title, "d-t")
    s.text(46, y + 38, sub, "d-s")
s.render()
