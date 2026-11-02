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
tabs = [("Agent 1", "branch, dir, ports", None), ("Agent 2", "Waiting for you", "amber"), ("Agent 3", "branch, dir, ports", None), ("Agent 4", "branch, dir, ports", None)]
for i, (name, note, acc) in enumerate(tabs):
    y = 38 + i * 53.5
    if i:
        s.add(f'<line x1="24" y1="{y}" x2="150" y2="{y}" class="d-line d-faint"/>')
    s.text(36, y + 23, name, "d-t")
    s.text(36, y + 39, note, f"d-s d-{acc} d-ct" if acc else "d-s")
    if acc:
        s.add(f'<circle cx="136" cy="{y + 19}" r="5" class="d-amber d-fill"/>')
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
s.add('<rect x="158" y="148" width="110" height="104" rx="8" fill="none" class="d-amber d-stroke" stroke-width="3"/>')
s.text(172, 170, "Agent 2", "d-t")
s.text(172, 186, "Needs you", "d-s d-amber d-ct")
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
