import type { InteractiveDiagramConfig } from "./types";

export const dotfilesNewMachine: InteractiveDiagramConfig = {
  tourLabel: "Set up a machine",
  intro: "Tap a box to see its part, or follow a new machine from clone to done.",
  nodes: [
    {
      id: "repo",
      title: "you/dotfiles",
      description: "One folder per tool, pushed to GitHub. It's reproducible, diffable and shareable, and it's the copy that survives when a machine doesn't.",
      links: ["laptop", "server"],
    },
    {
      id: "laptop",
      title: "Laptop",
      description: "It wants everything: stow zsh git nvim ghostty. One command per package, or stow */ for the lot.",
      links: ["repo", "links"],
    },
    {
      id: "server",
      title: "Server",
      description: "The same clone, but only git and zsh get stowed. The other packages sit in the repo and do nothing.",
      links: ["repo", "links"],
    },
    {
      id: "links",
      title: "Symlinks in ~",
      description: "~/.zshrc points at ~/dotfiles/zsh/.zshrc. Your tools read the usual paths, and the real files live in the repo.",
      links: ["laptop", "server"],
    },
  ],
  steps: [
    {
      text: "Your config lives in one repo, pushed to GitHub.",
      nodes: ["repo"],
      edges: [],
    },
    {
      text: "On a new laptop, clone it to ~/dotfiles.",
      nodes: ["repo", "laptop"],
      edges: ["repo-laptop"],
    },
    {
      text: "Stow every package. The symlinks appear in your home directory.",
      nodes: ["laptop", "links"],
      edges: ["laptop-links"],
    },
    {
      text: "A server gets the same clone, with only the packages it needs stowed.",
      nodes: ["repo", "server", "links"],
      edges: ["repo-server", "server-links"],
    },
  ],
};
