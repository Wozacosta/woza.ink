"""Diagrams for the BitTorrent post. Run: python3 scripts/diagrams/torrent.py"""
import math

from diagram_lib import *

# ── 1. One server vs a swarm ────────────────────────────────────
s = Svg("torrent-swarm", 400, 268, "Over HTTP one server uploads every copy of a file. In a BitTorrent swarm every peer uploads the pieces it has, so more downloaders add capacity instead of load")
s.text(20, 22, "HTTP", "d-t")
s.text(20, 38, "One server uploads every copy", "d-s")
s.box(65, 58, 80, 36, "Server", anchor="middle")
for i in range(5):
    x = 33 + i * 36
    dx, dy = x - 105, 195 - 94
    length = math.hypot(dx, dy)
    s.arrow([(105, 94), (round(x - dx / length * 13, 1), round(195 - dy / length * 13, 1))])
    s.add(f'<circle cx="{x}" cy="195" r="11" class="d-box"/>')

s.text(210, 22, "BitTorrent", "d-t")
s.text(210, 38, "Every peer uploads what it has", "d-s")
peers = [(295 + 62 * math.cos(math.radians(a)), 131 + 62 * math.sin(math.radians(a))) for a in range(-90, 270, 60)]
for i, (x1, y1) in enumerate(peers):
    for x2, y2 in peers[i + 1:]:
        s.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="d-line d-faint"/>')
for i, (x, y) in enumerate(peers):
    s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="11" class="d-box"/>')
    s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" class="d-{"green" if i == 0 else "blue"} d-fill"/>')
s.rule(226)
s.text(20, 250, "More downloaders slow a server down, and speed a swarm up.", "d-s")
s.render()

# ── 2. Rarest first ─────────────────────────────────────────────
s = Svg("torrent-rarest", 400, 262, "Bars show how many peers in the swarm hold each of ten pieces. Your client already has some of them, and fetches the rarest piece it is still missing next")
s.text(20, 22, "Copies of each piece in the swarm", "d-t")
s.text(20, 38, "Your client fetches the rarest piece it doesn't have yet", "d-s")
base, unit, width = 170, 14, 30
pieces = [(6, True), (4, False), (7, True), (3, False), (5, False), (2, True), (1, False), (4, False), (6, False), (2, False)]
for i, (copies, held) in enumerate(pieces):
    x = 23 + i * 36
    y = base - copies * unit
    if held:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-green d-fill" opacity="0.8"/>')
    elif copies == 1:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-amber d-fill"/>')
    else:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-box"/>')
    s.text(x + width / 2, y - 5, str(copies), "d-s", "middle")
    s.text(x + width / 2, base + 16, str(i + 1), "d-s", "middle")
s.add(f'<line x1="20" y1="{base}" x2="380" y2="{base}" class="d-line"/>')
s.text(200, base + 32, "Piece number", "d-s", "middle")
s.rule(214)
for x, cls, label in ((20, "d-green d-fill", "you have it"), (124, "d-box", "you need it"), (228, "d-amber d-fill", "fetch this one next")):
    s.add(f'<rect x="{x}" y="226" width="12" height="12" rx="2" class="{cls}"/>')
    s.text(x + 18, 236, label, "d-s")
s.text(20, 256, "Rare pieces spread first, so the last 10% doesn't go missing.", "d-s")
s.render()

# ── 3. From a magnet link to a download ─────────────────────────
s = Svg("torrent-magnet", 400, 392, "A magnet link holds only the infohash. Your client asks the DHT which peers are in the swarm, downloads the torrent's metadata from those peers, and then the normal transfer starts")
s.box(20, 16, 360, 54, "Magnet link", "A URI holding the 40-character infohash", accent="violet")
s.arrow([(200, 70), (200, 104)], "look up the infohash", 210, 91)
s.box(20, 106, 360, 54, "DHT", "Peers run the lookup, with no central server", accent="blue")
s.arrow([(200, 160), (200, 194)], "a list of peers", 210, 181)
s.box(20, 196, 360, 54, "Peers in the swarm", "Send the torrent's metadata over the wire protocol", accent="amber")
s.arrow([(200, 250), (200, 284)], "now you know the pieces", 210, 271)
s.box(20, 286, 360, 54, "The transfer", "Rarest first, choking, tit-for-tat", accent="green")
s.rule(358)
s.text(20, 382, "No .torrent file, no tracker, no website.", "d-t")
s.render()
