import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "onchain-publishing-platforms",
  notes: [
    {
      heading: "mirrorxyz-the-pioneer-that-didnt-survive",
      type: "context",
      content:
        "Mirror founder Denis Nazarov (ex-a16z crypto partner) sold Mirror to Paragraph in May 2024 and pivoted to building Kiosk, a Farcaster-based social commerce app. Paragraph raised $5M led by Union Square Ventures and Coinbase Ventures as part of the deal. All Mirror content, blogs, and subscribers were auto-migrated by November 2025.",
      url: "https://www.coindesk.com/tech/2024/05/02/web3-publishing-platform-mirror-sells-to-paragraph-pivots-to-social-app-kiosk",
    },
    {
      heading: "mirrorxyz-the-pioneer-that-didnt-survive",
      type: "note",
      content:
        'Author Emily Segal used Mirror to crowdfund her novel "Burn Alpha," raising 25 ETH (~$64K) directly from readers who received partial ownership via a first-edition NFT. John Palmer was the first person to crowdfund writing on Mirror. These experiments showed genuine product innovation -- the problem was always distribution, not the primitives.',
    },
    {
      heading: "paragraph-the-one-thats-actually-working",
      type: "counter",
      content:
        "For context on the distribution gap: Substack hit $45M in annualized revenue by July 2025, with 5M paid subscriptions and ~$450M in gross writer revenue. Paragraph has raised $6.7M total and has 5 employees. The scale difference is not just a rounding error -- it reflects how much distribution matters over ownership in practice.",
      url: "https://sacra.com/c/substack/",
    },
    {
      heading: "paragraph-the-one-thats-actually-working",
      type: "note",
      content:
        "Substack takes 10% of subscription revenue plus Stripe fees (2.9% + $0.30 per transaction). Medium distributes from a shared pool based on reading time and engagement -- notoriously unpredictable, where earnings can swing from $500 to $50 month-over-month without any change in output. Paragraph's 3% onchain membership fee is the lowest cut in the space.",
    },
    {
      heading: "the-ogs-hive-and-steemit",
      type: "context",
      content:
        "The Steemit takeover was one of crypto's most dramatic governance failures. Justin Sun acquired Steemit Inc and its 70M STEEM tokens (~20% of supply), then coordinated with Binance, Huobi, and Poloniex to stake exchange-held user funds -- 42M Steem Power total -- to vote out the top community witnesses and install his own. The exchanges pulled support only after massive public backlash. The community hard-forked to Hive 18 days later.",
      url: "https://decrypt.co/38050/steem-steemit-tron-justin-sun-cryptocurrency-war",
    },
    {
      heading: "the-access-layer-ens-gateways-and-decentralized-hosting",
      type: "note",
      content:
        "Vitalik Buterin hosts his personal blog at vitalik.eth.limo -- a real-world example of the ENS + decentralized hosting stack described here. The site resolves his ENS name through the eth.limo gateway to content stored on decentralized infrastructure. It works, it's censorship-resistant, and it loads reasonably fast.",
      url: "https://vitalik.eth.limo/",
    },
    {
      heading: "so-should-you-publish-onchain",
      type: "counter",
      content:
        'The "own your content" argument has a practical rebuttal: Substack already lets you export all posts and your full subscriber list as CSV at any time. For most writers, "ownership" means portability of audience and content -- which Substack provides without any blockchain. The onchain advantage only kicks in when you need censorship resistance or permanent, tamper-proof archival.',
    },
  ],
};
