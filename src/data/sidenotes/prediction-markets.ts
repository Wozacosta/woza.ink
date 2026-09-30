import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "prediction-markets",
  notes: [
    {
      marker: "Trump was over 95% to win",
      type: "counter",
      content:
        "Vitalik is careful about which part was impressive. Before the vote, Polymarket had Trump at 60/40 while other sources said 50/50, which he calls \"not too impressive by itself\". The value was in how fast the price moved on the night, while the results came in.",
      url: "https://vitalik.eth.limo/general/2024/11/09/infofinance.html",
    },
    {
      marker: "the logarithmic market scoring rule",
      type: "context",
      content:
        "The LMSR's useful property is that the market maker's worst-case loss is bounded and known in advance. Whoever sponsors a market can pay for liquidity with a fixed budget, which is why it suits questions too niche to attract traders on their own.",
    },
    {
      marker: "That's futarchy",
      type: "source",
      content:
        "Hanson first proposed futarchy around 2000, in a paper titled \"Shall We Vote on Values, But Bet on Beliefs?\". On-chain, MetaDAO on Solana has used conditional markets to make its governance decisions.",
      url: "https://mason.gmu.edu/~rhanson/futarchy.html",
    },
    {
      marker: "offset his entire position with about $60,000",
      type: "quote",
      content:
        "\"They cancelled out my $308,249 bet by throwing in a mere $60,000.\" He also blames \"intellectual underconfidence\": smart people assuming that if a price looked wrong, someone smarter must already have fixed it.",
      attribution: "Vitalik Buterin, 2021",
      url: "https://vitalik.eth.limo/general/2021/02/18/election.html",
    },
    {
      marker: "Analysts traced it to one UMA holder",
      type: "source",
      content:
        "The market's YES price went from 9% to 100% between March 24 and 25. Polymarket admitted the market had resolved too early but stood by UMA's vote as the process working as designed.",
      url: "https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves",
    },
    {
      marker: "Two traders sued in July",
      type: "source",
      content:
        "The complaint was filed on July 3, 2026 in the New York Supreme Court, alleging breach of contract and deceptive practices. The resolution had been finalized by a UMA vote on June 3.",
      url: "https://www.theblock.co/news/regulation/2026-07-07-two-traders-sue-polymarket-strategy-bitcoin-sale-407368",
    },
    {
      marker: "Kalshi handled about 82% of combined monthly volume",
      type: "context",
      content:
        "Kalshi is a US exchange regulated by the CFTC. Polymarket now runs two venues: its international exchange, which set a record of $10.8 billion in July 2026, and a separate regulated US platform, which did $3.5 billion that month.",
      url: "https://www.coindesk.com/business/2026/07/14/prediction-markets-just-crushed-traditional-sportsbooks-in-a-massive-usd50-billion-world-cup-breakout",
    },
    {
      marker: "a vault token (ERC-4626) built with Yearn",
      type: "note",
      content:
        "ERC-4626 is the standard interface for yield vaults: you deposit an asset and receive shares whose value grows as the vault earns. Because it's a standard, other contracts, like a prediction market, can hold and account for it without custom code.",
    },
    {
      marker: "11 attesters chosen at random",
      type: "note",
      content:
        "Random selection is the same trick Kleros uses for its juries. If nobody knows in advance who will decide a dispute, there's nobody to bribe ahead of time, and bribing everyone who might be picked is far more expensive.",
    },
    {
      marker: "Vitalik replied:",
      type: "source",
      content:
        "Posted on X on September 21, 2026, the day Trueo announced the move. Seven months earlier he had warned that prediction markets were drifting into what he called corposlop.",
      url: "https://www.theblock.co/news/defi/2026-09-22-trueo-ethereum-migration-415999",
    },
  ],
};
