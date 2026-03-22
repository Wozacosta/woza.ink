import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "cmux-terminal-for-agentic-coding",
  notes: [
    {
      heading: "whats-different",
      type: "context",
      content:
        'Terminal multiplexers have a long lineage. **GNU Screen** dates to the late 1980s. **tmux** arrived in 2007, became part of OpenBSD\'s base system in 2009, and is still the default choice for most developers. **Zellij** (written in Rust, launched ~2021) modernized the UX with context-aware keybinding bars and a WebAssembly plugin system. cmux is a different kind of tool — not a multiplexer you run inside a terminal, but a terminal app itself, purpose-built for agent workflows.',
      url: "https://en.wikipedia.org/wiki/Tmux",
    },
    {
      heading: "whats-different",
      type: "source",
      content:
        "cmux launched in **February 2026** as a free, open-source native macOS terminal. It works with Claude Code, Codex, OpenCode, Gemini CLI, Kiro, Aider, and any CLI tool. The notification system picks up standard terminal escape sequences (OSC 9/99/777) and also has a dedicated `cmux notify` CLI command for agent hooks.",
      url: "https://github.com/manaflow-ai/cmux",
    },
    {
      heading: "whats-different",
      type: "note",
      content:
        "The embedded browser in cmux is not just a webview — it exposes a scriptable API where agents can snapshot the accessibility tree, get element references, click, fill forms, and evaluate JavaScript. This means an agent can interact with a PR review page or documentation site programmatically, without you switching to a browser window.",
      url: "https://cmux.com/",
    },
    {
      heading: "what-its-built-on",
      type: "context",
      content:
        "libghostty is Mitchell Hashimoto's embeddable terminal library, extracted from the Ghostty terminal emulator. The first public component, **libghostty-vt**, handles terminal sequence parsing and state maintenance with zero dependencies. Future components will cover input processing, GPU rendering, and ready-made widgets for GTK and Swift. Hashimoto transitioned Ghostty to a non-profit structure under Hack Club's fiscal sponsorship in 2025.",
      attribution: "Mitchell Hashimoto",
      url: "https://mitchellh.com/writing/libghostty-is-coming",
    },
    {
      heading: "the-tradeoff",
      type: "counter",
      content:
        "For Linux/Windows users locked out of cmux, the alternatives are: **Zellij** (Rust-based multiplexer with resizable isolated panes and a plugin system), **tmux** with custom scripts, or tools like [parallel-code](https://github.com/johannesjo/parallel-code) which runs Claude Code, Codex, and Gemini side-by-side in individual git worktrees. There is also a community [cmux-linux](https://github.com/snjax/cmux-linux) fork, though it is unofficial.",
      url: "https://github.com/zellij-org/zellij",
    },
    {
      heading: "worth-it-if",
      type: "quote",
      content:
        "\"More apps will support parallel running as a workflow in 2026, where you can execute tasks in the background and have agents work on multiple items simultaneously.\" The terminal is becoming the orchestration layer for AI agents, and MCP (Model Context Protocol) has hit **97 million monthly SDK downloads** by February 2026 — the plumbing that connects these agents to external tools.",
      url: "https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/",
    },
  ],
};
