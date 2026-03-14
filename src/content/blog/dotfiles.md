---
title: "Dotfiles: Version Control Your Environment"
date: "2026-03-14"
description: "Your shell config, editor settings, and tool preferences are code. Treat them like it."
tags: ["dx", "productivity", "tools", "tutorial"]
---

# Dotfiles: Version Control Your Environment

Every time you set up a new machine, you have two options. Spend a day and a half reinstalling things, tweaking configs, and trying to remember that one zsh alias you spent twenty minutes perfecting. Or clone a repo and be back to your exact environment in ten minutes.

Dotfiles are how you get the second option.

---

## What dotfiles are

Dotfiles are the config files that live in your home directory, named with a leading dot so they stay hidden by default. `.zshrc`, `.gitconfig`, `.vimrc`, `.config/nvim/`, `.ssh/config`. Every tool you use has one.

Together they define your environment — how your shell behaves, how your editor looks, what aliases you've built up, how git formats output. They're personal infrastructure. Most developers let them accumulate on a single machine and lose them when something breaks.

Versioning them in a git repo means your environment is reproducible, diffable, and shareable.

---

## The naive approach and why it breaks

The obvious move is to make `~` a git repo. It works until it doesn't — `git status` in your home directory becomes noise, you accidentally commit things you shouldn't, and the repo scope bleeds everywhere.

The slightly better approach is symlinking: keep your dotfiles in `~/dotfiles/`, and manually `ln -s ~/dotfiles/.zshrc ~/.zshrc` for each file. This works. It's also tedious to maintain, easy to forget a file, and annoying to replicate on a new machine.

---

## stow

[GNU Stow](https://www.gnu.org/software/stow/) is the standard solution to this. It's a symlink manager — it takes a directory tree and creates symlinks into a target directory (your home folder by default), mirroring the structure exactly.

You structure your dotfiles repo like this:

```
~/dotfiles/
├── zsh/
│   └── .zshrc
├── git/
│   └── .gitconfig
├── nvim/
│   └── .config/
│       └── nvim/
│           └── init.lua
└── ghostty/
    └── .config/
        └── ghostty/
            └── config
```

Then running:

```bash
cd ~/dotfiles
stow zsh
```

Creates `~/.zshrc` → `~/dotfiles/zsh/.zshrc`. One command per package. Or `stow */` to stow everything at once.

The package structure (one folder per tool) means you can selectively stow only what you need on a given machine — a server gets `git` and `zsh` but not `nvim` or `ghostty`.

To unstow (remove the symlinks):

```bash
stow -D zsh
```

To restow (useful after moving files around):

```bash
stow -R zsh
```

That's basically the whole API.

---

## Setting up from scratch

Install stow — it's in every package manager:

```bash
# macOS
brew install stow

# Ubuntu / Debian
apt install stow
```

Create your dotfiles repo:

```bash
mkdir ~/dotfiles
cd ~/dotfiles
git init
```

Move a config file into the right package folder, then stow it:

```bash
mkdir zsh
mv ~/.zshrc zsh/.zshrc
stow zsh
# ~/.zshrc is now a symlink to ~/dotfiles/zsh/.zshrc
```

Push to GitHub. On a new machine:

```bash
git clone git@github.com:you/dotfiles.git ~/dotfiles
cd ~/dotfiles
stow zsh git nvim
```

Done.

---

## What to put in there

The obvious ones: `.zshrc` / `.bashrc`, `.gitconfig`, editor config, terminal config.

A few less obvious ones worth including:

- **`.gitignore_global`** — a global gitignore for `.DS_Store`, `.env`, editor swap files
- **`.ssh/config`** — host aliases and per-host settings (not the keys themselves, obviously)
- **shell functions and aliases** — if you've split these into separate files sourced from `.zshrc`
- **`.config/ghostty/config`** or whatever terminal you use
- **brew bundle** — a `Brewfile` that lists everything installed via Homebrew, so `brew bundle` restores your packages on a new machine

What to leave out: secrets, tokens, anything machine-specific that shouldn't roam.

---

## The compounding return

The real value isn't the setup speed, though that's real. It's the habit of treating your environment as code. You start reviewing changes before committing them. You write comments explaining why an alias exists. You see the history of how your workflow evolved.

It's also a surprisingly good signal when evaluating tools — if something doesn't have a clean, file-based config, that's worth noting.

*Dotfiles repo linked [here](#) — will update with actual link.*
