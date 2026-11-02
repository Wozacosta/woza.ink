import type { InteractiveDiagramConfig } from "./types";
import { arrArchitecture } from "./arr-architecture";
import { agentCliMap } from "./agent-cli-map";
import { agentLayerChoice } from "./agent-layer-choice";
import { clearSigningRender } from "./clear-signing-render";
import { cmuxWindow } from "./cmux-window";
import { contextHandoff } from "./context-handoff";
import { ensGateway } from "./ens-gateway";
import { erc4337Flow } from "./erc4337-flow";
import { erc8004Registries } from "./erc8004-registries";
import { gitWorktrees } from "./git-worktrees";
import { lightroomHalves } from "./lightroom-halves";
import { matrixFederation } from "./matrix-federation";
import { messengerFlow } from "./messenger-flow";
import { multisigBybit } from "./multisig-bybit";
import { nestLifecycle } from "./nest-lifecycle";
import { pomoTimer } from "./pomo-timer";
import { railgunShielded } from "./railgun-shielded";
import { rssFlow } from "./rss-flow";
import { rssSetup } from "./rss-setup";
import { searxngQuery } from "./searxng-query";
import { standardSiteVerify } from "./standard-site-verify";
import { torrentPeers } from "./torrent-peers";
import { x402Flow } from "./x402-flow";
import { x402Settlement } from "./x402-settlement";
import { uxTrust } from "./ux-trust";

/** Diagram name (public/diagrams/<name>.svg) → interactivity config */
export const interactiveDiagrams: Record<string, InteractiveDiagramConfig> = {
  "arr-architecture": arrArchitecture,
  "agent-cli-map": agentCliMap,
  "agent-layer-choice": agentLayerChoice,
  "clear-signing-render": clearSigningRender,
  "cmux-window": cmuxWindow,
  "context-handoff": contextHandoff,
  "ens-gateway": ensGateway,
  "erc4337-flow": erc4337Flow,
  "erc8004-registries": erc8004Registries,
  "git-worktrees": gitWorktrees,
  "lightroom-halves": lightroomHalves,
  "matrix-federation": matrixFederation,
  "messenger-flow": messengerFlow,
  "multisig-bybit": multisigBybit,
  "nest-lifecycle": nestLifecycle,
  "pomo-timer": pomoTimer,
  "railgun-shielded": railgunShielded,
  "rss-flow": rssFlow,
  "rss-setup": rssSetup,
  "searxng-query": searxngQuery,
  "standard-site-verify": standardSiteVerify,
  "torrent-peers": torrentPeers,
  "x402-flow": x402Flow,
  "x402-settlement": x402Settlement,
  "ux-trust": uxTrust,
};
