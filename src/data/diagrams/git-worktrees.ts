import type { InteractiveDiagramConfig } from "./types";

export const gitWorktrees: InteractiveDiagramConfig = {
  tourLabel: "Follow one task",
  intro: "Tap a box to see what it holds, or follow one task from worktree to pull request.",
  nodes: [
    {
      id: "agent1",
      title: "Agent 1",
      description: "Runs in its own terminal pane, in myapp/. One pane per task, one worktree per pane, one agent per pane.",
      links: ["tree1"],
    },
    {
      id: "agent2",
      title: "Agent 2",
      description: "Runs in myapp-feat-auth/. If it shared a directory with Agent 1, one agent's file write would conflict with the other's read.",
      links: ["tree2"],
    },
    {
      id: "agent3",
      title: "Agent 3",
      description: "Runs in myapp-fix-bug-42/. It operates fully independently, and it only sees this branch's files.",
      links: ["tree3"],
    },
    {
      id: "tree1",
      title: "myapp/",
      description: "Your main working directory, on main. The other two are extra checkouts of the same repo at different paths.",
      links: ["agent1", "git"],
    },
    {
      id: "tree2",
      title: "myapp-feat-auth/",
      description: "An additional worktree on feat/auth. It's a sibling directory, so it stays out of file searches and editor indexing.",
      links: ["agent2", "git"],
    },
    {
      id: "tree3",
      title: "myapp-fix-bug-42/",
      description: "An additional worktree on fix/bug-42. Each worktree has its own index and stash, so you can't stash in one and pop in another.",
      links: ["agent3", "git"],
    },
    {
      id: "git",
      title: "One .git directory",
      description: "All three point here. History, remotes and refs are shared, working files aren't. Git won't check out the same branch in two worktrees.",
      links: ["tree1", "tree2", "tree3"],
    },
  ],
  steps: [
    {
      text: "Create a worktree for the task: git worktree add -b feat/auth ../myapp-feat-auth main. That's a new directory on a new branch.",
      nodes: ["tree2", "git"],
      edges: ["tree2-git"],
    },
    {
      text: "Open it in its own terminal tab or cmux pane, and start an agent there.",
      nodes: ["agent2", "tree2"],
      edges: ["agent2-tree2"],
    },
    {
      text: "The other agents run next door at the same time, each in its own files, with zero interference.",
      nodes: ["agent1", "agent2", "agent3", "tree1", "tree2", "tree3"],
      edges: ["agent1-tree1", "agent2-tree2", "agent3-tree3"],
    },
    {
      text: "When the agent finishes, push the branch: git push -u origin feat/auth.",
      nodes: ["tree2", "git"],
      edges: ["tree2-git"],
    },
    {
      text: "Back in the main repo, run git worktree remove ../myapp-feat-auth, then open a PR as usual.",
      nodes: ["tree1", "tree2"],
      edges: [],
    },
  ],
};
