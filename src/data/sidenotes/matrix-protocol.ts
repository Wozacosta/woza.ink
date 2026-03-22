import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "matrix-protocol",
  notes: [
    {
      marker: "The spec and reference implementations are public, maintained by a non-profit foundation.",
      type: "quote",
      content:
        "The Matrix.org Foundation's stated mission is to \"empower users to control their communication data and have freedom over their communications infrastructure by creating, maintaining and promoting Matrix as an openly standardised secure decentralised communication protocol and network, open to all, and available to the public for no charge.\" It is incorporated as a non-profit UK Community Interest Company.",
      attribution: "The Matrix.org Foundation",
      url: "https://matrix.org/foundation/about/",
    },
    {
      marker: "Governments, enterprises, and open-source communities use Matrix because it's robust and auditable",
      type: "source",
      content:
        "Matrix reached 115 million users in 2023 (up ~50% in 12 months) and continues to grow. Over 25 countries now actively deploy Matrix for digital sovereignty. Notable government adoptions include France's **Tchap** (launched 2019, used across all government agencies), Germany's **BwMessenger** (100,000+ active users in the Bundeswehr), and Bavaria's **ByCS** messenger for schools sized for half a million pupils.",
      url: "https://element.io/en/case-studies/bundeswehr",
    },
    {
      marker: "Olm/Megolm are the crypto stacks for secure messaging (Signal-family primitives)",
      type: "context",
      content:
        "Matrix's Olm and Megolm encryption libraries are based on the same Double Ratchet Algorithm used by Signal. Olm handles 1:1 sessions (like Signal's protocol), while Megolm extends this to group conversations with a group ratchet that avoids the O(n) per-message cost of encrypting separately for each participant. This is what makes large encrypted rooms feasible.",
    },
    {
      marker: "Rooms: The core unit. DMs, groups, public channels — they're all rooms.",
      type: "source",
      content:
        "In 2016, NCC Group conducted a security audit of Olm and Megolm funded by the Open Technology Fund. They found 1 high-risk, 1 medium-risk, and 7 lower-risk issues. The most notable were Unknown Key Share attacks in both libraries. All issues were fixed in libolm 2.0.0. NCC found the code \"well written and without many of the common secure coding issues.\"",
      attribution: "NCC Group",
      url: "https://www.nccgroup.com/research-blog/public-report-matrix-olm-cryptographic-review/",
    },
    {
      marker: "You trade friction for freedom.",
      type: "counter",
      content:
        "The key tradeoff vs. Signal: Signal is centralized, which makes it simpler and arguably more secure (smaller attack surface, no metadata leaking to federated servers), but locks you into their infrastructure. Matrix federates, which gives you sovereignty and interop but introduces complexity and metadata exposure. XMPP federates too, but its E2EE (OMEMO) requires manual setup in many clients and lacks Matrix's built-in-by-default encryption.",
      url: "https://lukesmith.xyz/articles/matrix-vs-xmpp/",
    },
    {
      marker: "Content encryption: With E2EE enabled, message contents are secure between participants.",
      type: "note",
      content:
        "A 2023 academic paper (*Practically-exploitable Cryptographic Vulnerabilities in Matrix*) identified vulnerabilities in how some Matrix clients handled key verification and room key sharing. The Matrix team patched the issues promptly, but the paper highlighted that the security of E2EE depends heavily on correct client implementation, not just the protocol spec. Always keep your client updated.",
      url: "https://nebuchadnezzar-megolm.github.io/static/paper.pdf",
    },
    {
      marker: "Bridges are great for gradual migration",
      type: "context",
      content:
        "Mozilla's migration from IRC to Matrix in 2020 was one of the highest-profile bridge-to-native transitions. They initially bridged IRC to Matrix, let the community gradually move over, then shut down the IRC server entirely in March 2020. This gradual approach — bridge first, migrate later — has become the standard playbook for communities moving to Matrix.",
      url: "https://en.wikipedia.org/wiki/Matrix_(protocol)",
    },
    {
      marker: "Messaging platforms shape how communities form and how power flows online",
      type: "quote",
      content:
        "The Foundation defines a key objective as \"maximising the number of online servers in the open federation.\" Unlike Signal (one server, one company) or WhatsApp (one server, Meta), Matrix's value grows with every independent homeserver that joins the network. The protocol is designed so that no single entity — not even the Foundation — can control the ecosystem.",
      attribution: "The Matrix.org Foundation",
      url: "https://matrix.org/foundation/about/",
    },
  ],
};
