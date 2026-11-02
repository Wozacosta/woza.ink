import type { InteractiveDiagramConfig } from "./types";

export const agentCliMap: InteractiveDiagramConfig = {
  tourLabel: "Switch CLIs mid-project",
  intro: "Tap a box to see what it does, or follow a project from one CLI to the other.",
  nodes: [
    {
      id: "claude",
      title: "Claude",
      description:
        "Anthropic's models. Both tools run on them, and new model capabilities tend to show up in Claude Code first.",
      links: ["claude-code", "opencode"],
    },
    {
      id: "gpt",
      title: "GPT-4o",
      description: "Available in OpenCode through its provider abstraction. Claude Code doesn't support it.",
      links: ["opencode"],
    },
    {
      id: "gemini",
      title: "Gemini",
      description: "Another provider behind OpenCode's abstraction, so you can switch based on task type.",
      links: ["opencode"],
    },
    {
      id: "ollama",
      title: "Ollama",
      description: "Runs local models. If you want a local Mistral model for cost reasons, OpenCode is designed for that.",
      links: ["opencode"],
    },
    {
      id: "claude-code",
      title: "Claude Code",
      description:
        "Anthropic's official CLI, and Claude-only. It asks before running shell commands or writing files, and its rules, commands and skills are well documented. It's proprietary: you can extend it, but you can't fork it or self-host it.",
      links: ["claude", "project"],
    },
    {
      id: "opencode",
      title: "OpenCode",
      description:
        "MIT licensed and model agnostic. The whole orchestration layer is on GitHub, so you can read it, fork it or run it yourself. A neovim plugin lets you drive the agent from inside your editor.",
      links: ["claude", "gpt", "gemini", "ollama", "project"],
    },
    {
      id: "project",
      title: "Your project",
      description:
        "Both tools read the same codebase and respect the same AGENTS.md. Your rules, docs and skills work whichever CLI you run, which makes them the better investment.",
      links: ["claude-code", "opencode"],
    },
  ],
  steps: [
    {
      text: "You start in Claude Code. It reads your codebase and AGENTS.md, and it runs on Claude.",
      nodes: ["claude-code", "claude", "project"],
      edges: ["claude-code-claude", "claude-code-project"],
    },
    {
      text: "You want a quick edit without leaving neovim, so you open OpenCode on the same project.",
      nodes: ["opencode", "project"],
      edges: ["opencode-project"],
    },
    {
      text: "OpenCode can stay on Claude or use another provider: GPT-4o, Gemini, or a local model through Ollama.",
      nodes: ["opencode", "claude", "gpt", "gemini", "ollama"],
      edges: ["opencode-claude", "opencode-gpt", "opencode-gemini", "opencode-ollama"],
    },
    {
      text: "Nothing had to move. Same codebase, same AGENTS.md, no migration cost.",
      nodes: ["claude-code", "opencode", "project"],
      edges: ["claude-code-project", "opencode-project"],
    },
  ],
};
