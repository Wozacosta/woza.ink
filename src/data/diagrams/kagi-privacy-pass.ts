import type { InteractiveDiagramConfig } from "./types";

export const kagiPrivacyPass: InteractiveDiagramConfig = {
  tourLabel: "Spend a token",
  intro: "Tap a box to see what Kagi can tell, or go through both phases.",
  nodes: [
    {
      id: "client",
      title: "Your browser",
      description:
        "A Kagi extension or Orion. Now and then it generates and stores a large number of tokens.",
      links: ["kagi"],
    },
    {
      id: "kagi",
      title: "Kagi, generating",
      description:
        "It sees your session cookie, so it knows a member is asking. The tokens that come out of this can't be traced back to that member.",
      links: ["client"],
    },
    {
      id: "search",
      title: "Your browser, searching",
      description: "It sends no session cookie, only a token it hasn't used before.",
      links: ["kagi2"],
    },
    {
      id: "kagi2",
      title: "Kagi, answering",
      description:
        "It can tell the token is valid, and which tokens have been spent, but not which client generated it. It still reads the query, and your IP is a separate problem.",
      links: ["search"],
    },
  ],
  steps: [
    {
      text: "Your browser proves it belongs to a member, using the session cookie.",
      nodes: ["client", "kagi"],
      edges: ["client-kagi"],
    },
    {
      text: "Together they generate tokens, which the browser stores.",
      nodes: ["kagi", "client"],
      edges: ["kagi-client"],
    },
    {
      text: "Later you search. The browser sends the query with one unused token.",
      nodes: ["search", "kagi2"],
      edges: ["search-kagi2"],
    },
    {
      text: "Kagi checks the token and answers, without knowing whose it was.",
      nodes: ["kagi2", "search"],
      edges: ["kagi2-search"],
    },
  ],
};
