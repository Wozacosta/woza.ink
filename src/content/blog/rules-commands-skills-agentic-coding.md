---
title: "Rules, Commands, and Skills: The Three Layers of Agentic Coding"
date: "2026-03-14"
description: "Most developers use AI coding assistants as fancy autocomplete. The ones getting 10x more out of them understand the difference between rules, commands, and skills — and use all three deliberately."
tags: ["AI", "dx", "productivity", "tutorial"]
---

# Rules, Commands, and Skills: The Three Layers of Agentic Coding

Most developers use AI coding assistants as fancy autocomplete. Ask a question, get an answer, copy-paste. Repeat.

The developers getting an order of magnitude more out of them understand something different: an AI coding agent is a programmable collaborator. And like any collaborator, it works best when you give it **persistent context**, **repeatable workflows**, and **domain-specific expertise**.

That's what rules, commands, and skills are. Three distinct layers. Three different jobs. Most people only use one of them.

---

## The mental model

Think of it like onboarding a new engineer to your team.

- **Rules** are the things you'd put in the team handbook. "We use tabs not spaces. PRs require tests. Never commit secrets." They don't need to be repeated every conversation — they're always on.
- **Commands** are the SOPs (standard operating procedures). "To deploy, run these steps in this order." Repeatable, triggerable, procedural.
- **Skills** are the deep domain knowledge you'd send someone to a course for. "Here's how to handle authentication in our system. Here's our architecture. Here's the full workflow for writing a feature end to end."

Rules govern behavior. Commands automate tasks. Skills encode expertise.

---

## Rules — always-on constraints

Rules are instructions the agent follows in every single session, without you having to ask. They live in a project-level config file (like `AGENTS.md` or `.cursorrules`) and get injected into context automatically.

Good rules are:
- **Unconditional.** They apply everywhere, always. "Use TypeScript strict mode." "Never use `any`."
- **Short.** Rules aren't documentation — they're constraints. If it takes a paragraph to explain, it probably belongs in a skill instead.
- **Behavioral.** They shape *how* the agent works, not *what* it knows. Tone, formatting preferences, safety guardrails, commit message style.

```markdown
# AGENTS.md
- Use pnpm, never npm or yarn
- Prefer editing existing files over creating new ones
- Never commit .env files
- All components go in src/components/
```

The failure mode with rules is over-stuffing them. Fifty rules is noise — the agent starts ignoring them the same way you'd ignore a style guide with 200 items. Keep it tight. Ruthlessly prune anything you could handle by convention instead.

> Rules are your defaults. They shouldn't surprise you — they should just quietly enforce the things you'd correct anyway.

---

## Commands — repeatable, triggerable workflows

Commands (sometimes called slash commands or custom commands) are procedures you trigger on demand. They're not always-on — you invoke them when you need them.

The core use case: **anything you do more than twice** that involves more than one step.

- `/review` — run a code review with a specific checklist
- `/commit` — stage changes, write a commit message following your conventions, push
- `/new-component` — scaffold a new component with the right folder structure, index file, and test file
- `/sprint-status` — summarize what's done, what's blocked, what's at risk

Commands are defined as markdown files with a prompt template. The agent reads the file, executes the steps in order, and returns the result.

```markdown
# .claude/commands/new-component.md
Create a new React component named $ARGUMENTS.

Steps:
1. Create src/components/$ARGUMENTS/$ARGUMENTS.tsx
2. Create src/components/$ARGUMENTS/index.ts that re-exports the component
3. Add a basic test file at src/components/$ARGUMENTS/$ARGUMENTS.test.tsx
4. Follow existing component patterns in the codebase
```

The key distinction from rules: **commands are imperative, rules are declarative**. A rule says "always do X." A command says "when I say so, do these steps."

The failure mode with commands is trying to make them too general. A `/help-me-code` command is useless. A `/scaffold-api-route` command that knows exactly which folder to use, which middleware to apply, and which test pattern to follow — that's leverage.

> Commands are the things you used to keep in a Notion doc that nobody ever read. Now they're executable.

---

## Skills — deep, loaded expertise

Skills are the most powerful and least understood of the three. They're substantial context packages — detailed instructions, workflows, domain knowledge, and reference material — that get loaded into the agent's context when needed.

Unlike rules (always on) and commands (triggered procedurally), skills are triggered by **task type recognition**. When you say "let's create a PRD" or "implement this story" or "run a code review," the agent loads the matching skill and suddenly has deep expertise on how to do that specific thing in your context.

A skill might include:
- A full workflow with stages and decision points
- Templates and examples
- Domain knowledge specific to your stack or process
- Checkpoints and validation criteria
- Edge cases and how to handle them

The difference between a command and a skill is depth and intelligence. A command is a checklist. A skill is a methodology.

```markdown
# skills/create-prd/SKILL.md
You are acting as a product manager helping to create a PRD.

## Workflow
1. Start by asking 5 discovery questions about the feature
2. Draft the problem statement and success metrics
3. Break down into user stories with acceptance criteria
4. Identify technical constraints and open questions
5. Review with the user before finalizing

## Format
Use this template: [template follows...]

## Quality bar
A good PRD answers: who is this for, what problem does it solve,
how do we know when it's done, what are we explicitly not building.
```

Skills are what take an AI assistant from "fast search engine" to "actual collaborator who knows what it's doing."

> The rule of thumb: if you'd send a junior developer to a training course to learn it, encode it as a skill. If you'd put it in a team handbook, make it a rule. If you'd write it in a runbook, make it a command.

---

## How they work together

The three layers compound. Rules set the baseline. Commands handle the repetitive. Skills handle the complex.

A concrete example — writing a new feature:

1. **Rules** silently enforce that the agent uses your stack, your file structure, your commit format — without you saying anything.
2. You trigger a **command** like `/create-story` to scaffold the feature spec in the right format.
3. You invoke a **skill** like `dev-story` to actually implement it — the skill knows your architecture, your patterns, when to ask for clarification, and how to validate its own work.

Without rules, every session starts from scratch. Without commands, you repeat yourself constantly. Without skills, complex tasks get shallow, inconsistent results.

---

## The practical takeaway

Start with rules. They're the lowest effort, highest leverage entry point. Five good rules beat fifty mediocre ones.

Then identify the two or three workflows you run most often and turn them into commands. The goal isn't to automate everything — it's to make the common things frictionless.

Skills come last, and only where you need real depth. They're expensive to write well and they need maintenance as your codebase evolves. But when you have a skill that truly encodes how you do something — architecture decisions, code review standards, onboarding a new feature — it's the closest thing to cloning your own judgment.

Most developers treat AI as a conversation partner. The ones shipping faster treat it as a programmable system. Rules, commands, and skills are how you build that system.

---

---

*If you're using Claude Code specifically, the [BMAD method](https://github.com/bmadcode/BMAD-METHOD) is one of the most complete implementations of this pattern I've seen — worth digging into if you want to see all three layers working together in practice.*
