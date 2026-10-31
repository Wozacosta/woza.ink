import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "perpetual-futures",
  notes: [
    {
      marker: "proposed a futures contract that would never expire",
      type: "source",
      content:
        "Shiller's contract would cash settle every day, on both the change in the futures price and a dividend or rent index for that day. The paper appeared in the Journal of Finance in July 1993, alongside the index methods he needed to price things like housing.",
      url: "https://nber.org/papers/t0131",
    },
    {
      marker: "called BitMEX listed one",
      type: "context",
      content:
        "BitMEX launched XBTUSD in May 2016, but it wasn't the first. Alexey Bragin designed an inverse perpetual for the ICBIT exchange in 2011. And the Chinese Gold and Silver Exchange Society of Hong Kong had long run an \"undated futures\" market, one-day futures rolled over automatically.",
      url: "https://en.wikipedia.org/wiki/Perpetual_futures",
    },
    {
      marker: "calls this a thermostat",
      type: "note",
      content:
        "White's guide models a simplified FTX perp, a reminder of its 2021 vintage, and assumes funding of 100% of the gap per day. Real exchanges are far gentler. He also notes the size of the thermostat's effect is hard to predict, which is why the price tracks the index loosely rather than exactly.",
      url: "https://www.paradigm.xyz/writing/the-cartoon-guide-to-perps",
    },
    {
      marker: "in calm markets funding sits at that one number",
      type: "source",
      content:
        "On BitMEX, bitcoin perp funding printed exactly 0.01% for 78.19% of Q3 2025, and was positive for over 92% of the quarter. A BitMEX study of XBTUSD since 2016 found extreme funding had become 90% less common. The market has matured, or at least become more crowded with arbitrageurs.",
      url: "https://coincub.com/blog/perpetual-futures-funding-rates-78-of-a-quarter-at-0-01/",
    },
    {
      marker: "should be priced like a future expiring in 24 hours",
      type: "source",
      content:
        "The academic version: Ackerer, Hugonnier and Jermann show that a perp's price is the risk-neutral expectation of spot \"sampled at a random time\". In other words, a future whose expiry date is unknown. The strength of funding sets how soon that random date tends to arrive.",
      url: "https://ideas.repec.org/p/nbr/nberwo/32936.html",
    },
    {
      marker: "A crypto exchange runs 24/7 and doesn't wait",
      type: "quote",
      content:
        "\"For the cost of $1, a 100x bitcoin perp [...] behaves like $100 of bitcoin.\" At that leverage a 1% move against you is the whole deposit, before any maintenance margin.",
      attribution: "Dave White, Paradigm",
      url: "https://www.paradigm.xyz/writing/the-cartoon-guide-to-perps",
    },
    {
      marker: "an insurance fund, built up from liquidation profits",
      type: "context",
      content:
        "The fund was tested on March 12, 2020, when bitcoin fell by more than half in a day and BitMEX saw about $1.1 billion of liquidations. The Block reported that the fund lost about 1,627 BTC, then grew to a record 36,493 BTC. Liquidations profit the fund as well as drawing on it.",
      url: "https://www.theblock.co/post/58703/derivatives-market-liquidations-push-bitmexs-insurance-fund-to-all-time-high-cut-deribits-by-almost-half",
    },
    {
      marker: "Hyperliquid alone recorded about $10 billion",
      type: "counter",
      content:
        "These totals flatter nobody. Jeff Yan, Hyperliquid's co-founder, wrote that its \"fully onchain liquidations cannot be compared with underreported CEX liquidations\". Binance was reported to publish only one liquidation order per second. If so, the real total was above $19 billion, and more of it sat on centralized venues.",
      url: "https://forklog.com/en/hyperliquid-co-founder-says-cex-liquidation-totals-may-be-underreported-by-up-to-100x/",
    },
    {
      marker: "It holds 53–57% of on-chain open interest",
      type: "context",
      content:
        "Castle Labs had it at 57% of $13.2 billion on October 31, 2026. A Q3 report put it at 53% of about $24 billion; trackers differ on what they include. Its share of volume is lower, 45% that day on Castle Labs' count. Volume can be farmed with incentives, which open interest is harder to inflate with.",
      url: "https://castlelabs.io/research/perp-dex-rankings",
    },
    {
      marker: "settled it at $0.0095",
      type: "counter",
      content:
        "Bitget's CEO, Gracy Chen, said the handling risked making Hyperliquid \"FTX 2.0\" and called it \"immature, unethical, and unprofessional\". Hyperliquid said all users apart from flagged addresses would be made whole by the Hyper Foundation.",
      url: "https://crypto.news/bitget-ceo-says-hyperliquid-could-become-ftx-2-0-amid-jelly-incident/",
    },
    {
      marker: "the first in the country",
      type: "context",
      content:
        "Coinbase had already launched \"perpetual-style\" futures in the US on July 21, 2025, but those technically expire after five years. They use funding and trade 24/7, without being perpetual in the legal sense.",
      url: "https://bitcoinmagazine.com/news/coinbase-to-launch-us-nano-bitcoin-perpetual-style-futures-in-july",
    },
    {
      marker: "the CFTC has asked the court to dismiss the case",
      type: "source",
      content:
        "The CFTC argues CME hasn't shown competitive harm. As of late October 2026 the case hadn't been decided.",
      url: "https://coindesk.com/business/2026/10/29/stanley-druckenmiller-s-first-x-post-backs-hyperliquid-venture-after-usd23-million-indirect-investment",
    },
    {
      marker: "subject to approval",
      type: "note",
      content:
        "ICE deleted its X post about the deal on October 31, two days later, without explanation. Its press release and trade[XYZ]'s own announcement stayed up. No launch date has been given.",
      url: "https://www.tokenpost.com/news/business/45367",
    },
  ],
};
