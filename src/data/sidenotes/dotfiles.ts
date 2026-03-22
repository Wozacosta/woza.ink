import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "dotfiles",
  notes: [
    {
      marker:
        "Together they define your environment",
      type: "note",
      content:
        'The most-starred dotfiles repo on GitHub is [mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles) with 31K+ stars. Its `.macos` script that sets "sensible hacker defaults" for macOS is legendary -- it automates hundreds of system preferences that would take hours to configure manually. Other influential repos: [holman/dotfiles](https://github.com/holman/dotfiles) (topic-based organization) and [thoughtbot/dotfiles](https://github.com/thoughtbot/dotfiles) (vim/zsh/tmux/git baseline with 8K+ stars).',
      url: "https://github.com/mathiasbynens/dotfiles",
    },
    {
      marker:
        "it takes a directory tree and creates symlinks into a target directory",
      type: "context",
      content:
        "GNU Stow was originally written in 1993 by Bob Glickstein for managing software installed from source in `/usr/local/stow/`. Its use for dotfiles management is a creative repurposing of a tool designed for a completely different problem. The entire implementation is a single Perl script with no dependencies beyond core Perl -- which is why it's available in every package manager and never breaks.",
      url: "https://www.gnu.org/software/stow/",
    },
    {
      marker:
        "a server gets `git` and `zsh` but not `nvim` or `ghostty`",
      type: "counter",
      content:
        'For more complex setups, [chezmoi](https://www.chezmoi.io/) solves problems Stow cannot: templating (different email in `.gitconfig` per machine), secrets management (integrates with 1Password, Bitwarden, etc.), and cross-OS differences. The trade-off is that chezmoi uses a source-of-truth copy rather than symlinks, so edits require `chezmoi edit` instead of editing files directly. Stow wins on simplicity; chezmoi wins on flexibility.',
      url: "https://www.chezmoi.io/comparison-table/",
    },
    {
      marker:
        "tedious to maintain, easy to forget a file, and annoying to replicate on a new machine",
      type: "note",
      content:
        "thoughtbot built [rcm](https://github.com/thoughtbot/rcm) specifically to solve the dotfile management problem without requiring the directory-mirroring structure that Stow demands. It handles host-specific and tag-based overrides natively. Their dotfiles repo is designed as a shared baseline that the whole team uses, with personal overrides layered on top via `~/.dotfiles-local`.",
      url: "https://github.com/thoughtbot/rcm",
    },
    {
      marker:
        "a `Brewfile` that lists everything installed via Homebrew",
      type: "note",
      content:
        "A `Brewfile` is one of the highest-leverage files you can add. Run `brew bundle dump` to snapshot everything currently installed, then `brew bundle` on a new machine to restore it all. Combined with Stow for configs, this covers ~90% of machine setup. The pattern: Brewfile for packages, dotfiles for configs, and a small bootstrap script to glue them together.",
    },
    {
      marker:
        "the habit of treating your environment as code",
      type: "context",
      content:
        "The next evolution beyond dotfiles + Stow is Nix with Home Manager. Instead of managing symlinks to config files, you declare your entire environment -- packages, configs, shell setup -- in a single Nix expression. Builds are reproducible down to the byte: the same `flake.lock` produces the exact same environment on any machine. The learning curve is steep, but for developers who manage multiple machines or want CI-testable environments, it is the endgame.",
      url: "https://github.com/nix-community/home-manager",
    },
    {
      marker:
        "if something doesn't have a clean, file-based config, that's worth noting",
      type: "quote",
      content:
        "Unlike dotfiles repositories, Home Manager supports specifying programs as well as their configurations. Contents are reproducible -- a home will be the exact same every time it is built, and you can have the exact same home on different hosts.",
      attribution: "Home Manager documentation",
      url: "https://nix-community.github.io/home-manager/",
    },
  ],
};
