import type { ArticleSidenotes } from "./types";

import { sidenotes as buildingPomo } from "./building-pomo";
import { sidenotes as cmux } from "./cmux-terminal-for-agentic-coding";
import { sidenotes as contextMemory } from "./context-and-memory-agentic-coding";
import { sidenotes as decentSocial } from "./decentralized-social-protocols";
import { sidenotes as dotfiles } from "./dotfiles";
import { sidenotes as erc8004 } from "./erc-8004-trustless-agents";
import { sidenotes as ercsEips } from "./ethereum-ercs-eips-that-shaped-the-chain";
import { sidenotes as x402 } from "./exploring-x402-standard";
import { sidenotes as ghostty } from "./ghostty-terminal";
import { sidenotes as gitWorktrees } from "./git-worktrees-parallel-agents";
import { sidenotes as i3Mac } from "./i3-on-mac-flashspace";
import { sidenotes as localFirst } from "./local-first-dexie";
import { sidenotes as matrix } from "./matrix-protocol";
import { sidenotes as megaeth } from "./megaeth-real-time-blockchain";
import { sidenotes as mppVsX402 } from "./mpp-vs-x402";
import { sidenotes as nestjs } from "./nestjs-framework";
import { sidenotes as onchainPub } from "./onchain-publishing-platforms";
import { sidenotes as opencode } from "./opencode-vs-claude-code";
import { sidenotes as rssSetup } from "./personal-rss-setup-2026";
import { sidenotes as privacy } from "./privacy-in-crypto";
import { sidenotes as rulesCommands } from "./rules-commands-skills-agentic-coding";
import { sidenotes as signalTelegram } from "./signal-vs-telegram";
import { sidenotes as torrentArch } from "./torrent-architecture";
import { sidenotes as whatIsRss } from "./what-is-rss";
import { sidenotes as whyIBuild } from "./why-i-build";

const all: ArticleSidenotes[] = [
  buildingPomo, cmux, contextMemory, decentSocial, dotfiles, erc8004, ercsEips, x402,
  ghostty, gitWorktrees, i3Mac, localFirst, matrix, megaeth, mppVsX402, nestjs, onchainPub,
  opencode, rssSetup, privacy, rulesCommands, signalTelegram, torrentArch, whatIsRss, whyIBuild,
];

const bySlug = new Map(all.map((s) => [s.slug, s]));

export function getSidenotes(slug: string): ArticleSidenotes | null {
  return bySlug.get(slug) ?? null;
}
