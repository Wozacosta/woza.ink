import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "ethereum-ercs-eips-that-shaped-the-chain",
  notes: [
    {
      marker:
        "Fabian Vogelsteller and Vitalik Buterin proposed ERC-20 as a minimal, shared interface",
      type: "source",
      content:
        "Vogelsteller opened the original GitHub issue (#20, hence the name) in November 2015. The standard took nearly two years to finalize — not because the interface was controversial, but because edge cases around `approve` race conditions and zero-value transfers generated lengthy debate. The final spec explicitly notes the `approve` front-running vulnerability but chose not to fix it to avoid breaking already-deployed contracts.",
      url: "https://eips.ethereum.org/EIPS/eip-20",
    },
    {
      marker:
        "Users have been approving infinite allowances since 2017 and getting drained by exploits since 2018",
      type: "counter",
      content:
        "**ERC-2612** (2020) partially addressed this by adding `permit` — a gasless approval via EIP-712 signed messages. Instead of two transactions (approve + transferFrom), users sign a message off-chain and the spender submits it. USDC, DAI, and most modern tokens support it. But the original `approve` pattern persists across thousands of older contracts. Revoke.cash and similar tools exist specifically to clean up stale infinite approvals.",
      url: "https://eips.ethereum.org/EIPS/eip-2612",
    },
    {
      marker:
        "When Ethereum Classic forked from Ethereum after the DAO hack in July 2016",
      type: "context",
      content:
        "The DAO hack drained ~3.6 million ETH (~$60M at the time) through a reentrancy exploit. The community hard-forked to recover the funds, creating Ethereum (the fork) and Ethereum Classic (the original chain). The replay attack problem was an unintended consequence — nobody had anticipated that the same address would hold value on both chains with identical transaction formats. EIP-155 was a reactive fix to a crisis, not a planned upgrade.",
    },
    {
      marker:
        "CryptoKitties launched in late 2017 using a proto-721 interface and famously congested the entire Ethereum network",
      type: "source",
      content:
        "At peak CryptoKitties mania in December 2017, the game accounted for ~25% of all Ethereum transactions. Pending transactions hit 30,000+. Gas prices spiked 6x. The incident was a major catalyst for scaling research — Vitalik himself cited it as evidence that Ethereum needed sharding and L2 solutions. The ERC-721 standard was finalized six months later, incorporating lessons from CryptoKitties' ad-hoc implementation.",
    },
    {
      marker:
        "ERC-721 has no mechanism to enforce creator fees on secondary sales",
      type: "counter",
      content:
        "The royalty enforcement debate reached its peak in late 2022 when Blur launched with optional royalties, undercutting OpenSea's marketplace. OpenSea responded with an **operator filter registry** — a blocklist that prevented NFTs from trading on royalty-skipping marketplaces. This was controversial: it meant creators were restricting where owners could sell, undermining the \"ownership\" premise of NFTs. Most projects eventually dropped enforcement. The market settled on ~0-2.5% voluntary royalties, down from the 5-10% that was standard in 2021.",
    },
    {
      marker:
        "Witek Radomski (Enjin) proposed ERC-1155 to solve a practical problem",
      type: "note",
      content:
        "Radomski was also the author of the first known NFT code — the token contract for Enjin Coin in 2017. ERC-1155's design was heavily influenced by real game economy requirements: Enjin's platform needed to manage millions of items across thousands of games without deploying a separate contract for each token type. The gas savings from batch operations were not theoretical — they were measured against actual gaming workloads.",
    },
    {
      marker:
        "More ETH is burned than is issued to validators — making ETH deflationary",
      type: "context",
      content:
        "The \"ultrasound money\" meme emerged from this dynamic. Post-merge (September 2022), ETH issuance dropped ~90% (from ~13,000 ETH/day to ~1,700 ETH/day). Combined with 1559 burns, ETH's net supply has decreased by over 450,000 ETH since the merge. Whether this makes ETH a better monetary asset or just an interesting tokenomic property is one of crypto's ongoing debates — Bitcoin maximalists argue that predictable fixed supply beats dynamic deflation.",
      url: "https://ultrasound.money/",
    },
    {
      marker:
        "L2 transaction fees dropped 10-100x overnight",
      type: "source",
      content:
        "Concrete numbers from the first week post-Dencun: Arbitrum average transaction cost went from $0.25 to $0.01. Optimism from $0.18 to sub-$0.01. Base from $0.12 to effectively zero for simple transfers. The blob fee market started at essentially zero cost and only rises when blob demand exceeds the target of 3 per block. As of early 2026, blob fees remain extremely cheap — the capacity ceiling hasn't been meaningfully tested yet.",
    },
    {
      marker:
        "it laid the groundwork for full danksharding",
      type: "context",
      content:
        "Full danksharding (sometimes called \"PeerDAS\" in its current form) aims to scale blob count from 6 per block to 64-256+ through **data availability sampling** — a technique where nodes verify data availability by randomly sampling small portions rather than downloading everything. This is the endgame for Ethereum's rollup-centric roadmap: enough cheap data space for hundreds of rollups to post simultaneously. Timeline is uncertain but actively researched.",
    },
    {
      marker:
        "a signed statement saying \"for this transaction, treat my EOA as if it were this contract.\"",
      type: "note",
      content:
        "EIP-7702 replaced the earlier **EIP-3074** proposal, which used `AUTH` and `AUTHCALL` opcodes to let EOAs delegate to \"invoker\" contracts. 3074 was controversial because it gave invoker contracts permanent, broad authority over EOAs — a security surface that made many core devs uncomfortable. 7702's per-transaction delegation is more conservative: the smart wallet behavior only applies for the specific transaction that includes the authorization, reducing the blast radius of bugs or exploits.",
    },
    {
      marker:
        "A game character NFT can carry its inventory",
      type: "source",
      content:
        "Sapienz (by Stapleverse) was one of the first major NFT collections to adopt ERC-6551. Each character NFT has a token-bound account that accumulates wearables, accessories, and rewards. The key UX insight: when you buy a Sapienz on a marketplace, you get the character *and* everything it owns. The collection proved the \"NFT as backpack\" mental model works commercially — secondary sales reflect the value of the token-bound inventory, not just the base NFT.",
    },
  ],
};
