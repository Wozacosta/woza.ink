import type { InteractiveDiagramConfig } from "./types";

export const publishingSteemFork: InteractiveDiagramConfig = {
  tourLabel: "Follow the takeover",
  intro: "Tap a step for the details, or follow the takeover from start to fork.",
  nodes: [
    {
      id: "steemit",
      title: "Steemit",
      description:
        "The original blockchain blogging platform, launched in 2016. It pioneered earning crypto for creating and curating content.",
      links: ["sun"],
    },
    {
      id: "sun",
      title: "Justin Sun buys Steemit Inc.",
      description: "In 2020 he acquired the company along with its 70M STEEM, about 20% of supply.",
      links: ["steemit", "witnesses"],
    },
    {
      id: "witnesses",
      title: "Top 20 witnesses seized",
      description:
        "Exchanges staked user funds, 42M Steem Power in total, to vote out the community's witnesses and install his own. They pulled support only after a public backlash.",
      links: ["sun", "steem", "hive"],
    },
    {
      id: "steem",
      title: "Steem",
      description:
        "Still running under Tron and Justin Sun's control, with about 2,600 new articles a day. But the soul of the community left.",
      links: ["witnesses"],
    },
    {
      id: "hive",
      title: "Hive",
      description:
        "The community's response: a fork with no single controlling entity, and several competing frontends.",
      links: ["witnesses"],
    },
  ],
  steps: [
    {
      text: "Steemit launches in 2016 and proves people will blog for crypto.",
      nodes: ["steemit"],
      edges: [],
    },
    {
      text: "In 2020 Justin Sun buys Steemit Inc.",
      nodes: ["steemit", "sun"],
      edges: ["steemit-sun"],
    },
    {
      text: "He uses exchange-held user funds to take over the top 20 witnesses, which control governance.",
      nodes: ["sun", "witnesses"],
      edges: ["sun-witnesses"],
    },
    {
      text: "The community forks the chain to Hive and leaves Steem to him.",
      nodes: ["witnesses", "steem", "hive"],
      edges: ["witnesses-steem", "witnesses-hive"],
    },
  ],
};
