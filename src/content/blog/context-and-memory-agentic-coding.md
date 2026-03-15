---
title: "Memory, Context, and Sessions in Agentic Coding"
date: "2026-03-14"
description: "AI coding agents don't have memory. They have context windows. Understanding the difference changes how you work with them."
tags: ["AI", "dx", "productivity"]
---

# Memory, Context, and Sessions in Agentic Coding

The most common complaint about AI coding agents: "it forgot what we talked about." The misunderstanding underneath it: agents don't have memory. They have context windows.

This distinction matters a lot in practice. Memory is persistent and automatic — you don't manage it. Context is a temporary window of text that gets fed to the model on each request. Everything the agent "knows" about your codebase, your preferences, and your conversation is text sitting in that window. When the window resets, the agent starts from scratch.

Once you internalize this, you stop fighting the tool and start designing around it.

---

## The context window is the whole model

An agent like Claude Code operates by reading a prompt — which includes system instructions, your rules files, any loaded skills, tool outputs, and the conversation history — and producing a response. There's no database being queried. There's no long-term memory being updated. It's all one big block of text.

The practical implications:

- **Long conversations degrade.** As the window fills, earlier context gets less weight or eventually falls off. A conversation that started sharp can get fuzzy after dozens of back-and-forth exchanges.
- **What's in the window determines quality.** An agent with your `AGENTS.md`, relevant source files, and a clear task description will outperform the same agent with a blank slate and a vague question.
- **You are the memory.** The parts that need to persist across sessions — architecture decisions, conventions, preferences — have to be written down somewhere the agent can read them.

---

## The three layers of persistent context

Since agents don't remember, you have to build the infrastructure that makes relevant context available when needed.

### 1. Rules — always loaded

Your project-level rules file (`AGENTS.md`, `.cursorrules`, or whatever your tool reads) is injected into every session automatically. This is your baseline: the things that should be true in every conversation without you having to say them.

Keep it tight. Rules that are always loaded take up context budget whether they're relevant or not. Twenty sharp rules beats a hundred loose ones.

### 2. Project context documents — loaded on demand

For deeper information — architecture decisions, how authentication works in your specific codebase, the non-obvious patterns you've established — write it down in dedicated docs. Reference them explicitly when starting a session that needs them:

```
Read ARCHITECTURE.md and src/lib/auth/ before we continue.
```

This is manual, but intentional. Not every session needs to know about your database schema. Only load what's relevant.

Some teams maintain a `project-context.md` that the agent is instructed to read at session start — a curated summary of everything it needs to know to be useful immediately.

### 3. Skills — loaded by task type

Skills are larger context packages that encode how to do specific things: write a PRD, implement a feature end-to-end, do a code review. They're loaded when you trigger them, not always.

The advantage: a skill can be very detailed without burdening every session with that detail. You only pay the context cost when you're actually doing the thing the skill is for.

---

## When to start a new session

This is the question most developers get wrong. They let a single session run for hours, accumulating context, and wonder why the quality degrades.

Start a new session when:

- **The task is complete.** Don't continue in the same window for a different task. The prior task's context is noise for the next one.
- **The conversation has gone sideways.** If the agent has made bad assumptions it keeps reinforcing, a fresh session is faster than trying to correct it in-place.
- **You're switching concerns.** Debugging a production issue and then designing a new feature are different modes. Separate sessions.
- **The window feels full.** No precise signal for this, but you'll notice: responses get less precise, the agent re-asks things you've answered, suggestions stop fitting the actual codebase. Reset.

Start a new session confidently. The cost is the few seconds it takes to re-establish context. The benefit is a fresh, focused agent.

---

## Starting sessions well

The quality of a session is often determined in the first message. A strong opening:

1. **State the current state.** "We're in the middle of implementing the payments feature. The Stripe webhook handler is done; we need to write the fulfillment logic."
2. **Point to relevant files.** "The relevant code is in `src/lib/payments/` and `src/app/api/webhooks/`."
3. **State the task clearly.** "Implement `fulfillOrder()` in `src/lib/payments/fulfillment.ts` following the pattern in `src/lib/payments/refund.ts`."

Compare this to opening with "hey continue where we left off" after a reset. The first gets you working code in one pass. The second gets you five minutes of re-orientation.

---

## Writing things down

The single highest-leverage habit for working with agents: write down decisions as you make them.

Not in the chat. In a file.

When you decide "we'll use optimistic updates for this feature" or "we're not handling the edge case of X until v2" — put it in a doc. When you establish a pattern the agent should follow — write it out. When you make an architectural choice with real tradeoffs — document the tradeoff.

These aren't just notes for future you. They're the context you'll inject into the next session.

The mental model shift: instead of "I'm coding with an AI assistant," think "I'm building a system where the agent is one component, and documentation is the interface between sessions." The agent is stateless. Your docs are the state.

---

## Practical patterns

**A session-start snippet.** Some people keep a short text file they paste at the start of sessions that establishes context: current branch, what was done last session, what's next. Takes 30 seconds to update at the end of a session, saves 5 minutes at the start of the next one.

**Explicit handoffs.** Before ending a long session, ask the agent to write a brief summary of what was done and what's next. Save it. Use it to start the next session.

**Scope sessions to tasks, not time.** A session that does one complete thing — writes a feature, reviews a PR, refactors a module — is better than a session that runs for two hours across four topics. The constraint makes you clearer about what you're actually doing.

**Don't over-explain in chat.** Every message you write is context budget. Terse, precise instructions outperform long preambles. The agent doesn't need the backstory; it needs the task.

---

## The underlying principle

An agent is not a colleague who will remember your conversation tomorrow. It's a very capable function: given context, produce output. Your job is to provide good context and interpret good output.

The developers who get the most out of agentic coding aren't the ones who have the best conversations. They're the ones who've built the best context infrastructure — rules that encode their conventions, docs that capture their architecture, skills that encode their workflows — so every session starts from a strong foundation rather than a blank slate.

---

## Further reading

- [Rules, Commands, and Skills: The Three Layers of Agentic Coding](/blog/rules-commands-skills-agentic-coding) — how to structure the persistent context infrastructure
- [BMAD method](https://github.com/bmadcode/BMAD-METHOD) — a comprehensive system for agentic development workflows; worth studying for how it handles context across sessions
- [Git Worktrees for Parallel Agent Work](/blog/git-worktrees-parallel-agents) — the infrastructure side of running multiple sessions concurrently
