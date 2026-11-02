import type { InteractiveDiagramConfig } from "./types";

export const worktreeShared: InteractiveDiagramConfig = {
  tourLabel: "Open a linked worktree",
  intro: "Tap a box to see what lives there, or trace a linked worktree back to the main .git.",
  nodes: [
    {
      id: "files",
      title: "Working files",
      description: "The one thing every worktree gets all to itself: its own copy of the files on its branch. This is why agents don't step on each other.",
      links: [],
    },
    {
      id: "gitfile",
      title: ".git",
      description: "In a linked worktree this is a plain file, not a folder. It holds one line pointing at the worktree's private folder in the main repo.",
      links: ["private"],
    },
    {
      id: "private",
      title: "Private to one",
      description: "A folder under .git/worktrees/ with this worktree's own HEAD and index. That's why each one has its own branch and its own staged changes.",
      links: ["gitfile", "shared"],
    },
    {
      id: "shared",
      title: "Shared by all",
      description: "Objects, config and nearly all refs. Branches live here, and so does refs/stash, so every worktree sees the same stash list.",
      links: ["private"],
    },
  ],
  steps: [
    {
      text: "A linked worktree has its own working files, and a .git that's only a file.",
      nodes: ["files", "gitfile"],
      edges: [],
    },
    {
      text: "That file points at a private folder inside the main .git.",
      nodes: ["gitfile", "private"],
      edges: ["gitfile-private"],
    },
    {
      text: "The private folder holds HEAD and the index, so branch and staging stay separate.",
      nodes: ["private"],
      edges: [],
    },
    {
      text: "Everything else resolves to the shared part: history, branches, config.",
      nodes: ["private", "shared"],
      edges: ["private-shared"],
    },
    {
      text: "The stash is a ref in there too, which is why it crosses worktrees.",
      nodes: ["shared"],
      edges: [],
    },
  ],
};
