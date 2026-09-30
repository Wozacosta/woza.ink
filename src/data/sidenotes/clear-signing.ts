import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "clear-signing",
  notes: [
    {
      marker: "In February 2025 that gap cost Bybit $1.44 billion",
      type: "context",
      content:
        "The attackers never touched Bybit's keys. They compromised a Safe developer's machine, reached Safe's cloud infrastructure and injected JavaScript that only activated for Bybit's signers, showing a routine transfer while sending different calldata to their devices.",
      url: "https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/",
    },
    {
      marker: "Gasless \"permit\" signatures",
      type: "note",
      content:
        "A permit is an EIP-712 message, so no transaction appears on-chain and nothing costs gas when you sign it. The attacker submits it later. By the time the approval shows up on a block explorer, the tokens are usually gone.",
    },
    {
      marker: "Fetch the contract's ABI from a verified source",
      type: "context",
      content:
        "Sourcify verifies contracts by recompiling the published source and checking that the bytecode matches what's deployed, so the ABI you get is the one the contract was built from. It's also one of the teams contributing to ERC-7730.",
      url: "https://docs.sourcify.dev/blog/intro-to-erc7730/",
    },
    {
      marker: "and never to apply some unrelated format that happens to be nearby",
      type: "quote",
      content:
        "\"Never fallback to presenting untrusted information as if it was trusted and verified.\"",
      attribution: "ERC-7730, security considerations",
      url: "https://eips.ethereum.org/EIPS/eip-7730",
    },
    {
      marker: "a delegatecall, which runs another contract's code inside the Safe's own storage",
      type: "context",
      content:
        "A Safe proxy keeps the address of its implementation in storage slot 0. Code run through delegatecall writes to the Safe's storage, so the attacker's contract only had to overwrite that slot to make the Safe run their code from then on.",
    },
    {
      marker: "A draft standard, ERC-8176",
      type: "source",
      content:
        "ERC-8176, \"Descriptor Attestations for ERC-7730\", was opened as a pull request to the ERCs repository on 26 February 2026 and is still under review. Another open proposal would put the descriptor registry itself on-chain.",
      url: "https://github.com/ethereum/ERCs/pull/1576",
    },
    {
      marker: "Certificate Transparency and package signing work the same way",
      type: "note",
      content:
        "Certificate Transparency makes every TLS certificate public in append-only logs that anyone can monitor, so a mis-issued certificate for your domain can't stay hidden. Browsers require proof of logging before trusting a certificate.",
      url: "https://certificate.transparency.dev/",
    },
    {
      marker: "Trezor said it would ship full human-readable signing",
      type: "quote",
      content:
        "Trezor's CTO said decoding into readable formats would ship early in Q2 2026, with full human-readable signing later in the quarter.",
      attribution: "Tomáš Sušánka, Trezor",
      url: "https://unchainedcrypto.com/ethereum-foundation-launches-clear-signing-standard-to-end-blind-signing-exploits/",
    },
    {
      marker: "proposed in October 2025 and still a draft",
      type: "source",
      content:
        "Proposed by Tiago Carvalho on 27 October 2025. Participants in the discussion argue for wallet-curated allowlists of programs and better rendering of multi-instruction transactions before it's finalized.",
      url: "https://github.com/solana-foundation/SRFCs/discussions/4",
    },
  ],
};
