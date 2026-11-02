import type { InteractiveDiagramConfig } from "./types";

export const agentCommandRun: InteractiveDiagramConfig = {
  tourLabel: "Run the command",
  intro: "Tap a step to see what happens there, or run the command from top to bottom.",
  nodes: [
    {
      id: "type",
      title: "You type it",
      description: "Commands aren't always on. Nothing happens until you invoke one, and whatever follows the name is the argument.",
      links: ["read"],
    },
    {
      id: "read",
      title: "The agent reads the file",
      description: "A command is a markdown file with a prompt template, so the file is the whole definition.",
      links: ["type", "args"],
    },
    {
      id: "args",
      title: "$ARGUMENTS is filled in",
      description: "Every $ARGUMENTS in the template becomes what you typed, so one file scaffolds any component.",
      links: ["read", "run"],
    },
    {
      id: "run",
      title: "Steps run in order",
      description: "The agent executes the numbered steps: create the component, add the re-export, add a test, follow existing patterns.",
      links: ["args", "result"],
    },
    {
      id: "result",
      title: "The result",
      description: "Three files in the right folder, the same way every time. That's the point of a command: repeatable and procedural.",
      links: ["run"],
    },
  ],
  steps: [
    {
      text: "You trigger it on demand: /new-component Button.",
      nodes: ["type"],
      edges: [],
    },
    {
      text: "The agent reads .claude/commands/new-component.md.",
      nodes: ["type", "read"],
      edges: ["type-read"],
    },
    {
      text: "$ARGUMENTS becomes Button throughout the template.",
      nodes: ["read", "args"],
      edges: ["read-args"],
    },
    {
      text: "The steps run in order, imperative rather than declarative.",
      nodes: ["args", "run"],
      edges: ["args-run"],
    },
    {
      text: "You get the component, its re-export and a test, and the agent returns the result.",
      nodes: ["run", "result"],
      edges: ["run-result"],
    },
  ],
};
