import type { InteractiveDiagramConfig } from "./types";
import { agentCliMap } from "./agent-cli-map";
import { agentCommandRun } from "./agent-command-run";
import { agentLayerChoice } from "./agent-layer-choice";
import { agentPaymentsChoice } from "./agent-payments-choice";
import { agentPaymentsL402 } from "./agent-payments-l402";
import { agentPaymentsStack } from "./agent-payments-stack";
import { arrArchitecture } from "./arr-architecture";
import { arrKeys } from "./arr-keys";
import { arrReconcile } from "./arr-reconcile";
import { buildCompound } from "./build-compound";
import { buildExperiment } from "./build-experiment";
import { cameraBuy } from "./camera-buy";
import { cameraDof } from "./camera-dof";
import { cameraExposure } from "./camera-exposure";
import { cameraMounts } from "./camera-mounts";
import { clearSigningRender } from "./clear-signing-render";
import { clearSigningTrust } from "./clear-signing-trust";
import { cmuxWindow } from "./cmux-window";
import { contextHandoff } from "./context-handoff";
import { contextNewSession } from "./context-new-session";
import { dexieConflict } from "./dexie-conflict";
import { dotfilesNewMachine } from "./dotfiles-new-machine";
import { ensGateway } from "./ens-gateway";
import { erc20ApproveFlow } from "./erc20-approve-flow";
import { erc4337Flow } from "./erc4337-flow";
import { erc8004Feedback } from "./erc8004-feedback";
import { erc8004Identity } from "./erc8004-identity";
import { erc8004Registries } from "./erc8004-registries";
import { erc8004Validation } from "./erc8004-validation";
import { ethStandardsTimeline } from "./eth-standards-timeline";
import { flashspaceSwitch } from "./flashspace-switch";
import { gitWorktrees } from "./git-worktrees";
import { kagiFilters } from "./kagi-filters";
import { kagiPrivacyPass } from "./kagi-privacy-pass";
import { kohakuLeaks } from "./kohaku-leaks";
import { kohakuWithdraw } from "./kohaku-withdraw";
import { libghosttyStack } from "./libghostty-stack";
import { lightroomDam } from "./lightroom-dam";
import { lightroomHalves } from "./lightroom-halves";
import { lightroomRecipe } from "./lightroom-recipe";
import { lightroomTriage } from "./lightroom-triage";
import { localFirstFlow } from "./local-first-flow";
import { matrixFederation } from "./matrix-federation";
import { matrixMetadata } from "./matrix-metadata";
import { matrixStack } from "./matrix-stack";
import { megaethPath } from "./megaeth-path";
import { megaethRoles } from "./megaeth-roles";
import { messengerFlow } from "./messenger-flow";
import { messengerThreats } from "./messenger-threats";
import { multisigBybit } from "./multisig-bybit";
import { multisigChoosing } from "./multisig-choosing";
import { multisigSafeFlow } from "./multisig-safe-flow";
import { nestDi } from "./nest-di";
import { nestLifecycle } from "./nest-lifecycle";
import { perpsCascade } from "./perps-cascade";
import { perpsJelly } from "./perps-jelly";
import { perpsWaterfall } from "./perps-waterfall";
import { pmDecision } from "./pm-decision";
import { pmUma } from "./pm-uma";
import { pomoData } from "./pomo-data";
import { pomoScreen } from "./pomo-screen";
import { pomoTimer } from "./pomo-timer";
import { privacyP2p } from "./privacy-p2p";
import { publishingDecision } from "./publishing-decision";
import { publishingParagraphLayers } from "./publishing-paragraph-layers";
import { publishingSteemFork } from "./publishing-steem-fork";
import { railgunShielded } from "./railgun-shielded";
import { rngCommit } from "./rng-commit";
import { rngPipeline } from "./rng-pipeline";
import { rngProperties } from "./rng-properties";
import { rssAnatomy } from "./rss-anatomy";
import { rssFlow } from "./rss-flow";
import { rssReaders } from "./rss-readers";
import { rssSetup } from "./rss-setup";
import { searxngBreakage } from "./searxng-breakage";
import { searxngQuery } from "./searxng-query";
import { socialAtmosphere } from "./social-atmosphere";
import { socialCustomFeeds } from "./social-custom-feeds";
import { socialLens } from "./social-lens";
import { socialNostr } from "./social-nostr";
import { socialProtocols } from "./social-protocols";
import { standardSitePublish } from "./standard-site-publish";
import { standardSiteVerify } from "./standard-site-verify";
import { torrentHandshake } from "./torrent-handshake";
import { torrentPeers } from "./torrent-peers";
import { trueoEscalation } from "./trueo-escalation";
import { uxTrust } from "./ux-trust";
import { worktreeShared } from "./worktree-shared";
import { x402Flow } from "./x402-flow";
import { x402PaymentAnatomy } from "./x402-payment-anatomy";
import { x402Settlement } from "./x402-settlement";

/** Diagram name (public/diagrams/<name>.svg) → interactivity config */
export const interactiveDiagrams: Record<string, InteractiveDiagramConfig> = {
  "agent-cli-map": agentCliMap,
  "agent-command-run": agentCommandRun,
  "agent-layer-choice": agentLayerChoice,
  "agent-payments-choice": agentPaymentsChoice,
  "agent-payments-l402": agentPaymentsL402,
  "agent-payments-stack": agentPaymentsStack,
  "arr-architecture": arrArchitecture,
  "arr-keys": arrKeys,
  "arr-reconcile": arrReconcile,
  "build-compound": buildCompound,
  "build-experiment": buildExperiment,
  "camera-buy": cameraBuy,
  "camera-dof": cameraDof,
  "camera-exposure": cameraExposure,
  "camera-mounts": cameraMounts,
  "clear-signing-render": clearSigningRender,
  "clear-signing-trust": clearSigningTrust,
  "cmux-window": cmuxWindow,
  "context-handoff": contextHandoff,
  "context-new-session": contextNewSession,
  "dexie-conflict": dexieConflict,
  "dotfiles-new-machine": dotfilesNewMachine,
  "ens-gateway": ensGateway,
  "erc20-approve-flow": erc20ApproveFlow,
  "erc4337-flow": erc4337Flow,
  "erc8004-feedback": erc8004Feedback,
  "erc8004-identity": erc8004Identity,
  "erc8004-registries": erc8004Registries,
  "erc8004-validation": erc8004Validation,
  "eth-standards-timeline": ethStandardsTimeline,
  "flashspace-switch": flashspaceSwitch,
  "git-worktrees": gitWorktrees,
  "kagi-filters": kagiFilters,
  "kagi-privacy-pass": kagiPrivacyPass,
  "kohaku-leaks": kohakuLeaks,
  "kohaku-withdraw": kohakuWithdraw,
  "libghostty-stack": libghosttyStack,
  "lightroom-dam": lightroomDam,
  "lightroom-halves": lightroomHalves,
  "lightroom-recipe": lightroomRecipe,
  "lightroom-triage": lightroomTriage,
  "local-first-flow": localFirstFlow,
  "matrix-federation": matrixFederation,
  "matrix-metadata": matrixMetadata,
  "matrix-stack": matrixStack,
  "megaeth-path": megaethPath,
  "megaeth-roles": megaethRoles,
  "messenger-flow": messengerFlow,
  "messenger-threats": messengerThreats,
  "multisig-bybit": multisigBybit,
  "multisig-choosing": multisigChoosing,
  "multisig-safe-flow": multisigSafeFlow,
  "nest-di": nestDi,
  "nest-lifecycle": nestLifecycle,
  "perps-cascade": perpsCascade,
  "perps-jelly": perpsJelly,
  "perps-waterfall": perpsWaterfall,
  "pm-decision": pmDecision,
  "pm-uma": pmUma,
  "pomo-data": pomoData,
  "pomo-screen": pomoScreen,
  "pomo-timer": pomoTimer,
  "privacy-p2p": privacyP2p,
  "publishing-decision": publishingDecision,
  "publishing-paragraph-layers": publishingParagraphLayers,
  "publishing-steem-fork": publishingSteemFork,
  "railgun-shielded": railgunShielded,
  "rng-commit": rngCommit,
  "rng-pipeline": rngPipeline,
  "rng-properties": rngProperties,
  "rss-anatomy": rssAnatomy,
  "rss-flow": rssFlow,
  "rss-readers": rssReaders,
  "rss-setup": rssSetup,
  "searxng-breakage": searxngBreakage,
  "searxng-query": searxngQuery,
  "social-atmosphere": socialAtmosphere,
  "social-custom-feeds": socialCustomFeeds,
  "social-lens": socialLens,
  "social-nostr": socialNostr,
  "social-protocols": socialProtocols,
  "standard-site-publish": standardSitePublish,
  "standard-site-verify": standardSiteVerify,
  "torrent-handshake": torrentHandshake,
  "torrent-peers": torrentPeers,
  "trueo-escalation": trueoEscalation,
  "ux-trust": uxTrust,
  "worktree-shared": worktreeShared,
  "x402-flow": x402Flow,
  "x402-payment-anatomy": x402PaymentAnatomy,
  "x402-settlement": x402Settlement,
};
