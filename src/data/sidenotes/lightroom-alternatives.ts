import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "lightroom-alternatives",
  notes: [
    {
      marker:
        "Adobe has 41 million Creative Cloud subscribers paying every single month",
      type: "source",
      content:
        "Adobe's Creative Cloud reached approximately 41 million paid subscribers by end of fiscal year 2025, up 4.24 million from the prior year. The company reported record total revenue of $23.77 billion for FY2025, an 11% year-over-year increase. Adobe's Digital Media segment (Creative Cloud + Document Cloud) contributed roughly $17.25–17.40 billion of that figure.",
      url: "https://petapixel.com/2025/12/10/adobes-revenue-breaks-yet-more-records-as-it-closes-out-2025/",
    },
    {
      marker:
        "The Photography Plan now costs $19.99/month for new customers",
      type: "source",
      content:
        "Adobe restructured Photography Plan pricing in January 2025. The 20GB plan rose from $9.99/month to $14.99/month and is no longer available to new subscribers. The default offering for new customers is the 1TB Photography Plan at $19.99/month. Existing subscribers on the legacy pre-paid annual plan ($119.88/year, or $9.99/month) were grandfathered in — for now.",
      url: "https://blog.adobe.com/en/publish/2024/12/15/all-new-photography-innovations-pricing-updates",
    },
    {
      marker:
        "Users on Adobe's own forums report lag on M4 MacBook Pros with 24GB of RAM",
      type: "source",
      content:
        "A widely-discussed thread on Adobe's community forums titled \"Lightroom (Desktop and Classic) performance crisis\" documents users experiencing sluggish performance even on modern Apple silicon hardware. Complaints include slow Develop module response, excessive RAM consumption when using AI features or brushes, and import/export bottlenecks. Some users report catalog corruption requiring rollback to backups.",
      url: "https://community.adobe.com/t5/lightroom-classic-discussions/lightroom-desktop-and-classic-performance-crisis/m-p/15402719",
    },
    {
      marker:
        "Capture One still offers a perpetual license. $299 one-time for Capture One Pro",
      type: "source",
      content:
        "Capture One Pro perpetual licenses are priced at $299 as of early 2026. The perpetual license covers the purchased major version plus all point updates within that version. Owners can upgrade to the next major release at a discount (up to 40% off depending on purchase date). Capture One also offers subscriptions starting around $15/month for those who prefer that model.",
      url: "https://www.captureone.com/en/pricing/capture-one-pro",
    },
    {
      marker:
        "**DeepPRIME XD3** is DxO's latest neural network denoising engine",
      type: "source",
      content:
        "DxO released PhotoLab 9.6 in March 2026, extending DeepPRIME XD3 to Bayer sensors (previously it was exclusive to Fujifilm X-Trans files as DeepPRIME XD3 X-Trans). DxO's own benchmarks claim two to three extra stops of equivalent ISO performance over conventional RAW processing. Independent testing at Photography Life confirmed DxO's noise reduction consistently outperforms Adobe's AI Denoise and other competitors in blind comparisons.",
      url: "https://www.prismnews.com/hobbies/photography/dxo-photolab-96-brings-smarter-ai-noise-reduction-and",
    },
    {
      marker:
        "Apple acquired the Pixelmator team in early 2025",
      type: "context",
      content:
        "Apple completed its acquisition of the Pixelmator team on February 11, 2025. The Vilnius, Lithuania-based team had been building Pixelmator apps since 2007. Apple confirmed that Photomator and Pixelmator Pro would remain available as separate App Store purchases and continue to receive updates. However, the original Pixelmator for iOS has been sunset with no further updates planned.",
      url: "https://www.neowin.net/news/apple-says-what-will-happen-to-the-original-pixelmator-and-photomator-apps/",
    },
    {
      marker:
        "darktable is the most direct open-source alternative to Lightroom",
      type: "context",
      content:
        "darktable has been in continuous development since 2009. As of March 2026, version 5.4 added base support for new cameras including Canon EOS R1, Canon EOS R5 Mark II, and several Fujifilm models. The project is released under GPL-3.0-or-later and runs on Linux, macOS, Windows, and Solaris. Its scene-referred workflow (introduced in darktable 3.0) represented a fundamental rethinking of how non-destructive RAW editing should work.",
      url: "https://github.com/darktable-org/darktable",
    },
    {
      marker:
        "Luminar Neo and Lightroom both offer these",
      type: "counter",
      content:
        "AI generative features in photo editors remain controversial among photographers. Tools like Luminar Neo's GenErase and GenSwap produce impressive quick results but raise questions about photographic integrity. Several major photography competitions, including the Sony World Photography Awards, have introduced rules specifically addressing AI-manipulated entries. The line between \"editing\" and \"generation\" is increasingly blurry, and not everyone considers that progress.",
    },
  ],
};
