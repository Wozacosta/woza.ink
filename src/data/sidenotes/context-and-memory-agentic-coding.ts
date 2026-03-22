import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "context-and-memory-agentic-coding",
  notes: [
    {
      heading: "the-context-window-is-the-whole-model",
      type: "context",
      content:
        'As of early 2026, context windows have converged around 1M tokens for frontier models: Claude Opus 4 at 1M, GPT-5.4 at 1M, Gemini 2.5 Pro at 1M (Gemini 3 Pro pushes to 2M). Meta\'s Llama 4 Scout claims 10M. But effective capacity is typically **60-70% of advertised limits** — a model claiming 200K tokens becomes unreliable around 130K.',
      url: "https://www.elvex.com/blog/context-length-comparison-ai-models-2026",
    },
    {
      heading: "the-context-window-is-the-whole-model",
      type: "source",
      content:
        'The landmark "Lost in the Middle" paper (Liu et al., 2023) showed that LLM accuracy forms a **U-shaped curve**: over 80% when the target fact is in the first or last documents, but under 40% when buried in the middle. This held across all tested models, even those designed for long contexts. The implication for agentic coding: where information sits in the context window matters as much as whether it\'s there at all.',
      attribution: "Liu, Lin, Hewitt, Paranjape et al.",
      url: "https://arxiv.org/abs/2307.03172",
    },
    {
      heading: "1-rules-always-loaded",
      type: "note",
      content:
        "The Claude Code docs recommend keeping CLAUDE.md **under 300 lines**. Every line competes for attention with the actual work. The best rule files read like production config: short, explicit, human-readable. \"Use ES modules, prefer named exports, 2-space indentation\" beats \"format code properly.\"",
      url: "https://code.claude.com/docs/en/best-practices",
    },
    {
      heading: "2-project-context-documents-loaded-on-demand",
      type: "context",
      content:
        "Claude Code automatically merges multiple CLAUDE.md files based on directory structure — a root-level file sets global principles while subdirectory files add local constraints. This hierarchical approach lets you keep the always-loaded context lean while making deeper context available when the agent navigates into specific parts of the codebase.",
      url: "https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9",
    },
    {
      heading: "when-to-start-a-new-session",
      type: "source",
      content:
        'Research on "context rot" shows that LLM performance degrades not just from window size but from accumulated noise. As conversations grow, the signal-to-noise ratio drops and the model\'s attention mechanism — which compares each new token to every previous token — consumes more compute per token. Shorter, focused sessions are not just a UX preference; they produce measurably better outputs.',
      url: "https://www.understandingai.org/p/context-rot-the-emerging-challenge",
    },
    {
      heading: "writing-things-down",
      type: "counter",
      content:
        'The RAG vs. long-context debate is relevant here. An ICLR 2025 paper found that simply stuffing more retrieved passages into a longer context window does **not** always improve answers — it can amplify distraction and degrade output quality. The winning pattern emerging in 2025-2026 is hybrid: use retrieval to identify relevant context, then use the long window to reason across it. The same principle applies to session context: curate what goes in, don\'t dump everything.',
      url: "https://proceedings.iclr.cc/paper_files/paper/2025/file/5df5b1f121c915d8bdd00db6aac20827-Paper-Conference.pdf",
    },
    {
      heading: "practical-patterns",
      type: "quote",
      content:
        "\"Treat CLAUDE.md like production prompts. Iterate on them. Short, explicit, human-readable instructions outperform long, vague documentation. If you've ever wondered why most AI agents fail in production, bad context management is half the answer.\"",
      attribution: "Habib Mrad",
      url: "https://medium.com/@habib.mrad.83/claude-code-practical-best-practices-for-agentic-coding-2be1b62cfeff",
    },
    {
      heading: "the-underlying-principle",
      type: "note",
      content:
        "The analogy to human working memory is surprisingly precise. Psychologist George Miller's famous 1956 paper established that human working memory holds roughly 7 items (plus or minus 2). LLMs have a similar bottleneck — not in raw capacity, but in effective attention. Researchers have found that for complex reasoning, the model's effective working memory gets overloaded well before hitting context window limits.",
    },
  ],
};
