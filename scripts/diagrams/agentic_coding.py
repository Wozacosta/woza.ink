"""Diagrams for the agentic coding series. Run: python3 scripts/diagrams/agentic_coding.py"""
from diagram_lib import *

# ── 1. What's in the context window ─────────────────────────────
s = Svg("context-window", 400, 372, "Hours into a session the context window is full of system instructions, rules, a skill, project docs, tool output and conversation. A fresh session starts with only system instructions, rules and what you load for the task, with the rest of the window free")


def stack(s, x, segments, top=54, width=170):
    y = top
    for label, height, acc in segments:
        if acc:
            s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{height}" class="d-{acc} d-fill" opacity="0.22"/>')
        s.text(x + width / 2, y + height / 2 + 4, label, "d-s", "middle")
        y += height
        if y < top + 264:
            s.add(f'<line x1="{x}" y1="{y}" x2="{x + width}" y2="{y}" class="d-line d-faint"/>')
    s.add(f'<rect x="{x}" y="{top}" width="{width}" height="264" rx="6" class="d-ext"/>')


s.text(20, 22, "Hours into one session", "d-t")
s.text(20, 38, "Long conversations degrade", "d-s")
stack(s, 20, [
    ("System instructions", 26, "blue"),
    ("Rules", 30, "green"),
    ("A skill", 40, "amber"),
    ("Project docs", 32, "violet"),
    ("Tool output", 62, "rose"),
    ("Conversation", 74, "rose"),
])
s.text(210, 22, "A fresh session", "d-t")
s.text(210, 38, "Back to what you wrote down", "d-s")
stack(s, 210, [
    ("System instructions", 26, "blue"),
    ("Rules", 30, "green"),
    ("Docs for this task", 32, "violet"),
    ("Room to work", 176, None),
])
s.rule(332)
s.text(20, 356, "Not to scale. There's no memory: only what's in the window.", "d-s")
s.render()

# ── 2. When each layer is active ────────────────────────────────
s = Svg("agent-layers", 400, 262, "Across one session rules are on the whole time, a command runs when you trigger it, such as create-story, and a skill such as dev-story loads when the task matches it")
s.text(20, 22, "One session, writing a feature", "d-t")
s.text(20, 38, "When each layer is in play", "d-s")
left, right = 112, 380
lanes = [("Rules", "Always on"), ("Commands", "You trigger them"), ("Skills", "Task type matches")]
for i, (name, how) in enumerate(lanes):
    y = 76 + i * 56
    s.text(20, y, name, "d-t")
    s.text(20, y + 15, how, "d-s")
    s.add(f'<line x1="{left}" y1="{y - 3}" x2="{right}" y2="{y - 3}" class="d-line d-faint"/>')
s.add(f'<rect x="{left}" y="60" width="{right - left}" height="28" rx="4" class="d-green d-fill" opacity="0.8"/>')
s.add(f'<rect x="{left + 20}" y="116" width="84" height="28" rx="4" class="d-blue d-fill" opacity="0.8"/>')
s.add(f'<rect x="{left + 116}" y="172" width="{right - left - 116}" height="28" rx="4" class="d-violet d-fill" opacity="0.8"/>')
s.text(left + 62, 134, "/create-story", "d-s d-m", "middle", 'style="fill:var(--background,#faf8f5)"')
s.text(left + 116 + (right - left - 116) / 2, 190, "dev-story", "d-s d-m", "middle", 'style="fill:var(--background,#faf8f5)"')
s.arrow([(left, 224), (right, 224)])
s.text(left, 242, "start", "d-s")
s.text(right, 242, "time", "d-s", "end")
s.render()

# ── 3. Two CLIs, one project (interactive: src/data/diagrams/agent-cli-map.ts) ──
s = Svg("agent-cli-map", 400, 300, "Claude Code talks only to Claude. OpenCode can talk to Claude, GPT-4o, Gemini or a local model through Ollama. Both sit on the same codebase and the same AGENTS.md, so you can switch between them without a migration")
s.text(20, 22, "Different models, same project", "d-t")
s.text(20, 38, "Swap the CLI and everything below it stays put", "d-s")
s.box(64, 58, 82, 36, "Claude", anchor="middle", node="claude")
s.box(166, 58, 64, 36, "GPT-4o", anchor="middle", node="gpt")
s.box(240, 58, 64, 36, "Gemini", anchor="middle", node="gemini")
s.box(314, 58, 64, 36, "Ollama", anchor="middle", node="ollama")
s.box(20, 142, 170, 52, "Claude Code", "Terminal. Proprietary", accent="violet", node="claude-code")
s.box(210, 142, 170, 52, "OpenCode", "Terminal or neovim. MIT", accent="green", node="opencode")
s.arrow([(105, 142), (105, 96)], edge="claude-code-claude")
s.arrow([(232, 142), (136, 96)], edge="opencode-claude")
s.arrow([(262, 142), (200, 96)], edge="opencode-gpt")
s.arrow([(295, 142), (272, 96)], edge="opencode-gemini")
s.arrow([(340, 142), (346, 96)], edge="opencode-ollama")
s.box(20, 236, 360, 52, "Same codebase, same AGENTS.md", "Your rules, docs and skills work under either CLI", accent="amber", node="project")
s.arrow([(105, 194), (105, 234)], edge="claude-code-project")
s.arrow([(295, 194), (295, 234)], edge="opencode-project")
s.render()

# ── 4. Claude Code's permission gate ────────────────────────────
s = Svg("claude-code-permissions", 400, 230, "A loop: the agent proposes a step, you approve it, it runs, and the result feeds the next step. For operations you've marked as trusted the approval is skipped")
s.text(20, 22, "A loop with you in it", "d-t")
s.text(20, 38, "Claude Code stops before shell commands and file writes", "d-s")
s.box(20, 58, 140, 52, "Agent", "Proposes a step", accent="violet")
s.box(240, 58, 140, 52, "You", "Approve it", accent="amber")
s.box(240, 164, 140, 52, "Runs", "Shell or file write", accent="green")
s.box(20, 164, 140, 52, "Result", "Feeds the next step", accent="blue")
s.arrow([(160, 84), (238, 84)])
s.arrow([(310, 110), (310, 162)])
s.arrow([(240, 190), (162, 190)])
s.arrow([(90, 164), (90, 112)])
s.arrow([(160, 104), (238, 170)], dashed=True)
s.text(202, 122, "if trusted", "d-s")
s.render()

# ── 5. The cmux window (interactive: src/data/diagrams/cmux-window.ts) ──
s = Svg("cmux-window", 400, 412, "A sketch of a cmux window. A sidebar lists four agents with their branch, directory and ports, and shows an unread badge for one of them. That agent's pane has a ring around it, raised by a terminal escape sequence or the cmux CLI, which can also send a macOS notification. A browser pane sits alongside. It's a Swift and AppKit app that renders terminals with libghostty")
s.add('<rect x="14" y="10" width="372" height="252" rx="8" class="d-line d-faint"/>')
for i in range(3):
    s.add(f'<circle cx="{28 + i * 12}" cy="24" r="3.5" class="d-line d-faint"/>')
s.add('<g data-node="sidebar">')
s.add('<rect x="24" y="38" width="126" height="214" rx="6" class="d-box"/>')
tabs = [("Agent 1", "branch, dir, ports", None), ("Agent 2", "Waiting for you", "blue"), ("Agent 3", "branch, dir, ports", None), ("Agent 4", "branch, dir, ports", None)]
for i, (name, note, acc) in enumerate(tabs):
    y = 38 + i * 53.5
    if i:
        s.add(f'<line x1="24" y1="{y}" x2="150" y2="{y}" class="d-line d-faint"/>')
    s.text(36, y + 23, name, "d-t")
    s.text(36, y + 39, note, f"d-s d-{acc} d-ct" if acc else "d-s")
    if acc:
        s.add(f'<circle cx="136" cy="{y + 19}" r="5" class="d-blue d-fill"/>')
s.add("</g>")
s.add('<g data-node="quiet">')
s.add('<rect x="158" y="38" width="110" height="102" rx="8" class="d-box"/>')
s.text(172, 60, "Agent 1", "d-t")
s.text(172, 76, "Still working", "d-s")
for i, w in enumerate((76, 58, 68)):
    s.add(f'<rect x="172" y="{92 + i * 12}" width="{w}" height="4" rx="1" class="d-line d-faint"/>')
s.add("</g>")
s.add('<g data-node="pane">')
s.add('<rect x="158" y="148" width="110" height="104" rx="8" class="d-box"/>')
s.add('<rect x="158" y="148" width="110" height="104" rx="8" fill="none" class="d-blue d-stroke" stroke-width="3"/>')
s.text(172, 170, "Agent 2", "d-t")
s.text(172, 186, "Needs you", "d-s d-blue d-ct")
for i, w in enumerate((64, 78)):
    s.add(f'<rect x="172" y="{202 + i * 12}" width="{w}" height="4" rx="1" class="d-line d-faint"/>')
s.add("</g>")
s.add('<g data-node="browser">')
s.add('<rect x="276" y="38" width="100" height="214" rx="8" class="d-box"/>')
s.text(290, 60, "Browser", "d-t")
s.text(290, 76, "PRs, docs and", "d-s")
s.text(290, 91, "designs beside", "d-s")
s.text(290, 106, "the code", "d-s")
s.add("</g>")
s.box(196, 288, 190, 52, "Escape sequence", "or the cmux CLI", accent="violet", node="signal")
s.box(14, 288, 136, 52, "Desktop alert", "Optional", accent="blue", node="alert")
s.arrow([(226, 288), (226, 254)], edge="signal-pane")
s.arrow([(196, 314), (152, 314)], edge="signal-alert")
s.box(14, 360, 180, 44, "libghostty", "Renders the terminal", accent="green", node="libghostty")
s.box(206, 360, 180, 44, "Swift + AppKit", "Native UI, not Electron", accent="green", node="native")
s.render()

# ── 6. What survives a reset (interactive: src/data/diagrams/context-handoff.ts) ──
s = Svg("context-handoff", 400, 262, "Two sessions side by side. When the window resets, nothing in the first session reaches the second. What crosses is what you wrote to files: the first session writes to them and the second loads them")
s.text(20, 22, "Nothing crosses a reset except files", "d-t")
s.text(20, 38, "The agent is stateless, so the state has to live on disk", "d-s")
s.box(20, 60, 150, 52, "Session 1", "Chat and decisions", accent="violet", node="session1")
s.box(230, 60, 150, 52, "Session 2", "Starts from scratch", accent="blue", node="session2")
s.add('<line x1="200" y1="50" x2="200" y2="168" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(200, 184, "window resets", "d-s d-rose d-ct", "middle")
s.add('<path d="M170,86 L194,86" class="d-line d-faint" data-edge="session1-session2"/>')
s.text(200, 90, "✗", "d-t d-rose d-ct", "middle", 'data-edge="session1-session2"')
s.box(20, 198, 360, 52, "Files on disk", "AGENTS.md, ARCHITECTURE.md, a handoff summary", accent="amber", node="docs")
s.arrow([(95, 112), (95, 196)], "write it down", 103, 150, edge="session1-docs")
s.arrow([(305, 196), (305, 114)], "load at the start", 297, 150, "end", edge="docs-session2")
s.render()

# ── 7. Which layer (interactive: src/data/diagrams/agent-layer-choice.ts) ──
s = Svg("agent-layer-choice", 400, 310, "A decision tree. If an instruction applies in every session it's a rule. If not, and it's a checklist of steps, it's a command. Otherwise it needs depth and judgment, so it's a skill")
s.text(20, 22, "Rule, command or skill?", "d-t")
s.text(20, 38, "Where a new instruction belongs", "d-s")
s.box(20, 58, 196, 52, "Applies in every session?", "Short and unconditional", node="q1")
s.box(20, 152, 196, 52, "A checklist of steps?", "Done more than twice", node="q2")
s.box(256, 58, 124, 52, "Rule", "Team handbook", accent="green", node="rule")
s.box(256, 152, 124, 52, "Command", "Runbook", accent="blue", node="command")
s.box(256, 246, 124, 52, "Skill", "Training course", accent="violet", node="skill")
s.arrow([(216, 84), (254, 84)], "yes", 235, 77, "middle", edge="q1-rule")
s.arrow([(118, 110), (118, 150)], "no", 126, 134, edge="q1-q2")
s.arrow([(216, 178), (254, 178)], "yes", 235, 171, "middle", edge="q2-command")
s.arrow([(118, 204), (118, 272), (254, 272)], "no: it needs judgment", 126, 264, edge="q2-skill")
s.render()

# ── 8. Watching versus being called ─────────────────────────────
s = Svg("cmux-attention", 400, 234, "A sketch of one agent run twice. Without rings you keep switching tabs to check on it. With rings you look once, when it calls for you")
s.text(20, 22, "One agent run, two ways to wait", "d-t")
s.text(20, 38, "A sketch, not a measurement", "d-s")
x0, done = 20, 300
for y, name in ((76, "Without rings"), (168, "With rings")):
    s.text(20, y - 12, name, "d-t")
    s.add(f'<rect x="{x0}" y="{y}" width="{done - x0}" height="14" rx="3" class="d-box"/>')
    s.add(f'<rect x="{done + 2}" y="{y}" width="{380 - done - 2}" height="14" rx="3" class="d-amber d-fill" opacity="0.8"/>')
s.text(160, 87, "Agent working", "d-s", "middle")
s.text(160, 179, "Agent working", "d-s", "middle")
for x in range(44, 300, 42):
    s.add(f'<line x1="{x}" y1="96" x2="{x}" y2="108" class="d-rose d-stroke" stroke-width="2" stroke-linecap="round"/>')
s.text(20, 124, "You keep switching tabs to check", "d-s d-rose d-ct")
s.add(f'<line x1="{done}" y1="188" x2="{done}" y2="200" class="d-green d-stroke" stroke-width="2" stroke-linecap="round"/>')
s.text(done + 6, 216, "Ring: look once", "d-s d-green d-ct", "end")
s.text(380, 68, "Needs you", "d-s", "end")
s.render()

# ── 9. Side by side ─────────────────────────────────────────────
s = Svg("opencode-compare", 400, 262, "A table of Claude Code and OpenCode. Claude Code is from Anthropic, proprietary, Claude-only and driven from the terminal. OpenCode is MIT licensed, supports many models through providers, and runs in the terminal or neovim. Claude Code keeps commands in .claude/commands and OpenCode keeps config in opencode.json")
s.text(20, 22, "The two CLIs, side by side", "d-t")
s.text(112, 56, "Claude Code", "d-t")
s.text(236, 56, "OpenCode", "d-t")
s.add('<line x1="20" y1="66" x2="380" y2="66" class="d-line d-faint"/>')
rows = [
    ("From", "Anthropic", "The SST team"),
    ("Source", "Proprietary", "MIT, on GitHub"),
    ("Models", "Claude only", "Claude, GPT, Gemini, local"),
    ("Runs in", "The terminal", "The terminal or neovim"),
    ("Rules", "AGENTS.md", "AGENTS.md"),
    ("Project config", ".claude/", "opencode.json"),
]
for i, (name, a, b) in enumerate(rows):
    y = 88 + i * 30
    s.text(20, y, name, "d-s")
    s.text(112, y, a, "d-s d-m" if a.startswith((".", "AGENTS")) else "d-s")
    s.text(236, y, b, "d-s d-m" if b.startswith(("opencode", "AGENTS")) else "d-s")
    if i < len(rows) - 1:
        s.add(f'<line x1="20" y1="{y + 11}" x2="380" y2="{y + 11}" class="d-line d-faint"/>')
s.render()

# ── 10. Where the answer sits ───────────────────────────────────
s = Svg("context-lost-middle", 400, 286, "Accuracy of GPT-3.5-Turbo on 20 documents by where the answer sits: 75.8 percent in the first document, 57.2 in the fifth, 53.8 in the tenth, 55.4 in the fifteenth and 63.2 in the last. With no documents at all it scores 56.1 percent")
s.text(20, 22, "Lost in the middle", "d-t")
s.text(20, 38, "GPT-3.5-Turbo on 20 documents, Liu et al. 2023, table G.2", "d-s")
left, right, top, bottom = 48, 372, 60, 232
y_of = lambda v: round(bottom - (v - 50) / 30 * (bottom - top), 1)
x_of = lambda pos: round(left + (pos - 1) / 19 * (right - left), 1)
for v in (50, 60, 70, 80):
    s.add(f'<line x1="{left}" y1="{y_of(v)}" x2="{right}" y2="{y_of(v)}" class="d-line d-faint"/>')
    s.text(left - 6, y_of(v) + 4, f"{v}%", "d-s", "end")
s.add(f'<line x1="{left}" y1="{y_of(56.1)}" x2="{right}" y2="{y_of(56.1)}" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(300, y_of(56.1) - 6, "No documents: 56.1%", "d-s", "end")
points = [(1, 75.8), (5, 57.2), (10, 53.8), (15, 55.4), (20, 63.2)]
path = " L".join(f"{x_of(p)},{y_of(v)}" for p, v in points)
s.add(f'<path d="M{path}" fill="none" stroke-width="2" stroke-linejoin="round" class="d-blue d-stroke"/>')
for p, v in points:
    s.add(f'<circle cx="{x_of(p)}" cy="{y_of(v)}" r="4" class="d-blue d-fill"/>')
    label = {1: (10, -6, "start"), 5: (8, -8, "start"), 10: (0, 18, "middle"), 15: (0, 18, "middle"), 20: (0, -10, "end")}[p]
    s.text(x_of(p) + label[0], y_of(v) + label[1], f"{v}%", "d-t" if p in (1, 10, 20) else "d-s", label[2])
s.text(left, bottom + 18, "First", "d-s")
s.text((left + right) / 2, bottom + 18, "Middle", "d-s", "middle")
s.text(right, bottom + 18, "Last", "d-s", "end")
s.text((left + right) / 2, bottom + 36, "Where the answer sits", "d-s", "middle")
s.render()

# ── 11. New session? (interactive: src/data/diagrams/context-new-session.ts) ──
s = Svg("context-new-session", 400, 368, "Four checks in a row. If the task is complete, the conversation has gone sideways, you're switching concerns, or the window feels full, start a new session. If none apply, keep going")
s.text(20, 22, "Start fresh, or keep going?", "d-t")
s.text(20, 38, "Any yes means a new session", "d-s")
checks = [("done", "Task complete?"), ("sideways", "Gone sideways?"), ("switching", "Switching concerns?"), ("full", "Window feels full?")]
for i, (node, label) in enumerate(checks):
    y = 54 + i * 62
    s.box(20, y, 200, 44, label, anchor="start", node=node)
    s.arrow([(220, y + 22), (272, y + 22)], "yes", 246, y + 15, "middle", edge=f"{node}-fresh")
    if i < 3:
        s.arrow([(120, y + 44), (120, y + 60)], edge=f"{node}-{checks[i + 1][0]}")
s.add('<g data-node="fresh">')
s.add('<rect x="274" y="54" width="106" height="230" rx="8" class="d-box"/>')
s.add('<circle cx="327" cy="146" r="4" class="d-green d-fill"/>')
s.text(327, 170, "New", "d-t", "middle")
s.text(327, 186, "session", "d-t", "middle")
s.add("</g>")
s.box(20, 312, 200, 44, "Keep going", accent="blue", node="keep")
s.arrow([(120, 286), (120, 310)], "no to all", 128, 303, edge="full-keep")
s.render()

# ── 12. The first message ───────────────────────────────────────
s = Svg("context-opening", 400, 252, "Two opening messages. A vague one, hey continue where we left off, costs five minutes of re-orientation. A strong one states where things are, which files matter and the exact task, and gets working code in one pass")
s.text(20, 22, "Two ways to open a session", "d-t")
s.add('<rect x="20" y="36" width="360" height="50" rx="8" class="d-box"/>')
s.text(34, 57, "hey continue where we left off", "d-s d-m")
s.text(34, 75, "Five minutes of re-orientation", "d-s d-rose d-ct")
s.add('<rect x="20" y="98" width="360" height="140" rx="8" class="d-box"/>')
parts = [
    ("State", "blue", "Webhook handler done, fulfillment next."),
    ("Files", "violet", "src/lib/payments/, src/app/api/webhooks/"),
    ("Task", "amber", "Implement fulfillOrder() like refund.ts."),
]
for i, (tag, acc, line) in enumerate(parts):
    y = 124 + i * 30
    s.add(f'<circle cx="38" cy="{y - 4}" r="4" class="d-{acc} d-fill"/>')
    s.text(50, y, tag, "d-t")
    s.text(100, y, line, "d-s")
s.text(34, 222, "Working code in one pass", "d-s d-green d-ct")
s.render()

# ── 13. Where each layer lives ──────────────────────────────────
s = Svg("agent-file-map", 400, 214, "A file tree of a project. AGENTS.md at the root is always loaded. A file in .claude/commands runs when you trigger it. A SKILL.md in a skills folder loads when the task type matches")
s.text(20, 22, "The three layers on disk", "d-t")
s.text(20, 38, "Paths from the examples below", "d-s")
tree = [
    (0, "myapp/", None, None),
    (1, "AGENTS.md", "Always loaded", "green"),
    (1, ".claude/commands/", None, None),
    (2, "new-component.md", "You trigger it", "blue"),
    (1, "skills/create-prd/", None, None),
    (2, "SKILL.md", "Task type matches", "violet"),
]
for i, (depth, line, tag, acc) in enumerate(tree):
    y = 66 + i * 24
    x = 20 + depth * 18
    if depth:
        s.add(f'<path d="M{x - 12},{y - 16} L{x - 12},{y - 4} L{x - 3},{y - 4}" class="d-line d-faint"/>')
    s.text(x, y, line, "d-s d-m")
    if tag:
        s.add(f'<line x1="196" y1="{y - 4}" x2="256" y2="{y - 4}" class="d-line d-faint"/>')
        s.add(f'<circle cx="264" cy="{y - 4}" r="4" class="d-{acc} d-fill"/>')
        s.text(276, y, tag, "d-t")
s.render()

# ── 14. A command, step by step (interactive: src/data/diagrams/agent-command-run.ts) ──
s = Svg("agent-command-run", 400, 358, "You type a slash command with an argument. The agent reads the command's markdown file, fills in the argument, runs the steps in order and returns the result: a component, an index file and a test")
s.text(20, 22, "What /new-component Button does", "d-t")
s.text(20, 38, "The markdown file is the program", "d-s")
steps = [
    ("type", "You type it", "/new-component Button", "blue"),
    ("read", "The agent reads the file", ".claude/commands/new-component.md", "violet"),
    ("args", "$ARGUMENTS is filled in", "Every $ARGUMENTS becomes Button", "amber"),
    ("run", "Steps run in order", "Create, re-export, test, follow patterns", "green"),
]
for i, (node, title, sub_, acc) in enumerate(steps):
    y = 54 + i * 66
    s.box(20, y, 360, 48, title, sub_, accent=acc, node=node)
    target = steps[i + 1][0] if i < 3 else "result"
    s.arrow([(200, y + 48), (200, y + 64)], edge=f"{node}-{target}")
s.add('<g data-node="result">')
s.add('<rect x="20" y="318" width="360" height="30" rx="6" class="d-box"/>')
s.text(200, 338, "Button.tsx, index.ts, Button.test.tsx", "d-s d-m", "middle")
s.add("</g>")
s.render()

# ── 15. What each session pays for ──────────────────────────────
s = Svg("context-layers-load", 400, 232, "A sketch grid of four sessions against three layers. Rules load in all four. Docs load in the two sessions that need them. A skill loads only in the session whose task matches it")
s.text(20, 22, "What each session pays for", "d-t")
s.text(20, 38, "A sketch of four sessions", "d-s")
sessions = ["Feature", "Bug fix", "PRD", "Review"]
for i, name in enumerate(sessions):
    s.text(146 + i * 68, 66, name, "d-s", "middle")
layers = [("Rules", "Always", "green", (1, 1, 1, 1)), ("Docs", "On demand", "violet", (1, 1, 0, 0)), ("Skills", "By task", "amber", (0, 0, 1, 1))]
for r, (name, how, acc, cells) in enumerate(layers):
    y = 78 + r * 46
    s.text(20, y + 16, name, "d-t")
    s.text(20, y + 31, how, "d-s")
    for i, on in enumerate(cells):
        x = 116 + i * 68
        if on:
            s.add(f'<rect x="{x}" y="{y}" width="60" height="38" rx="4" class="d-{acc} d-fill" opacity="0.7"/>')
        else:
            s.add(f'<rect x="{x}" y="{y}" width="60" height="38" rx="4" class="d-ext"/>')
s.render()
