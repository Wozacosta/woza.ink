import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "signal-vs-telegram",
  notes: [
    {
      heading: "the-default-matters",
      type: "quote",
      content:
        "Telegram is by default a cloud database with a plaintext copy of every message everyone has ever sent or received. It stores all contacts, groups, media, and every message on their servers, with the app on your phone being just a 'view' onto their servers.",
      attribution: "Moxie Marlinspike, Signal founder",
      url: "https://x.com/moxie/status/1497001286444617746",
    },
    {
      heading: "how-signals-encryption-works-at-a-glance",
      type: "source",
      content:
        "The Signal Protocol has been formally verified multiple times. A 2016 analysis proved security of the X3DH + Double Ratchet core. More recently, Signal partnered with Cryspen to formally verify the Triple Ratchet using ProVerif, running proofs in CI so every code push must pass formal verification before merging.",
      url: "https://eprint.iacr.org/2016/1013.pdf",
    },
    {
      heading: "how-telegrams-encryption-works",
      type: "source",
      content:
        'Academic researchers at ETH Zurich and Royal Holloway found four concrete attacks against MTProto 2.0, including message reordering, a timing side-channel enabling plaintext recovery in official clients, and a rekeying protocol vulnerable to unknown-key-share attacks. Their conclusion: MTProto "fell short of the cryptographic guarantees enjoyed by other widely deployed cryptographic protocols such as TLS."',
      attribution: "Albrecht, Marekov, Paterson, Stepanovs (2022)",
      url: "https://mtpsym.github.io/paper.pdf",
    },
    {
      heading: "what-the-servers-see",
      type: "quote",
      content:
        "Telegram has launched a pretty intense campaign to malign Signal as insecure, with assistance from Elon Musk. The goal seems to be to get activists to switch away from encrypted Signal to mostly unencrypted Telegram.",
      attribution: "Matthew Green, Johns Hopkins cryptographer",
      url: "https://www.schneier.com/blog/archives/2024/08/matthew-green-on-telegrams-encryption.html",
    },
    {
      heading: "who-runs-the-show",
      type: "context",
      content:
        "On August 24, 2024, Pavel Durov was arrested at Le Bourget Airport in France and indicted on 12 charges including complicity in distributing CSAM, drug trafficking, money laundering, and refusal to cooperate with law enforcement. French authorities argued Telegram's lack of moderation made it a breeding ground for criminal activity. The travel ban was fully lifted in November 2025.",
      url: "https://en.wikipedia.org/wiki/Arrest_and_indictment_of_Pavel_Durov",
    },
    {
      heading: "the-trade-offs-the-real-engineering-choices",
      type: "note",
      content:
        "The scale difference is staggering: Telegram hit 1 billion monthly active users in March 2025 (500M daily), while Signal sits at roughly 70-100 million MAU. Signal's operating costs reached ~$50M/year in 2025, funded entirely by donations and grants. Telegram monetizes through Premium subscriptions (15M paid subscribers as of May 2025, ~1% of users).",
    },
    {
      heading: "open-source-vs-trust-us",
      type: "counter",
      content:
        'A 2023 ACM study titled "On the Cryptographic Fragility of the Telegram Ecosystem" found practical replay attacks in popular third-party Telegram clients (Pyrogram, Telethon, GramJS). Since Telegram encourages the third-party client ecosystem via its open API, these vulnerabilities affect real users -- something the closed server code makes harder to audit.',
      url: "https://dl.acm.org/doi/10.1145/3579856.3582811",
    },
    {
      heading: "a-note-on-telegrams-apps",
      type: "quote",
      content:
        "It's amazing to me that after all this time, almost all media coverage of Telegram still refers to it as an 'encrypted messenger.' Telegram has a lot of compelling features, but in terms of privacy and data collection, there is no worse choice.",
      attribution: "Moxie Marlinspike",
      url: "https://x.com/moxie/status/1474067549574688768",
    },
  ],
};
