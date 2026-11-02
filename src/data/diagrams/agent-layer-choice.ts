import type { InteractiveDiagramConfig } from "./types";

export const agentLayerChoice: InteractiveDiagramConfig = {
  tourLabel: "Sort three examples",
  intro: "Tap a box for the details, or sort three real instructions through the tree.",
  nodes: [
    {
      id: "q1",
      title: "Does it apply everywhere?",
      description:
        "Rules are unconditional and short. If it takes a paragraph to explain, it probably belongs in a skill instead.",
      links: ["rule", "q2"],
    },
    {
      id: "q2",
      title: "Is it a checklist?",
      description:
        "Commands suit anything you do more than twice that involves more than one step. A command is a checklist. A skill is a methodology.",
      links: ["q1", "command", "skill"],
    },
    {
      id: "rule",
      title: "Rule",
      description:
        "Lives in AGENTS.md or .cursorrules and loads in every session. If you'd put it in a team handbook, make it a rule. Keep the list tight: fifty rules is noise.",
      links: ["q1"],
    },
    {
      id: "command",
      title: "Command",
      description:
        "A markdown prompt template, like .claude/commands/new-component.md, that runs when you trigger it. If you'd write it in a runbook, make it a command.",
      links: ["q2"],
    },
    {
      id: "skill",
      title: "Skill",
      description:
        "A substantial context package that loads when the task type matches: a workflow with stages, templates, domain knowledge and checkpoints. If you'd send a junior developer on a course to learn it, make it a skill.",
      links: ["q2"],
    },
  ],
  steps: [
    {
      text: "\"Use pnpm, never npm or yarn.\" It applies in every session, so it's a rule.",
      nodes: ["q1", "rule"],
      edges: ["q1-rule"],
    },
    {
      text: "\"Scaffold a new component.\" Not every session, but it's the same steps each time, so it's a command.",
      nodes: ["q1", "q2", "command"],
      edges: ["q1-q2", "q2-command"],
    },
    {
      text: "\"Let's create a PRD.\" It takes discovery questions, drafts and a review with you. A checklist won't do, so it's a skill.",
      nodes: ["q1", "q2", "skill"],
      edges: ["q1-q2", "q2-skill"],
    },
  ],
};
