import type { InteractiveDiagramConfig } from "./types";

export const ensGateway: InteractiveDiagramConfig = {
  tourLabel: "Publish, then load it",
  intro: "Tap a box to see what it does, or publish a site and then load it as a reader.",
  nodes: [
    {
      id: "publisher",
      title: "Your static site",
      description:
        "Markdown built into plain files. Updating it is manual and slow: each change is a new deploy.",
      links: ["ens", "storage"],
    },
    {
      id: "ens",
      title: "ENS name",
      description:
        "Your .eth name. Its record points at the site's content hash, so the name leads to the files.",
      links: ["publisher", "storage", "gateway"],
    },
    {
      id: "storage",
      title: "IPFS, Arweave, Swarm",
      description:
        "Where the files actually are. On IPFS they're permanent only as long as someone pins them, with Pinata, Filebase or your own node.",
      links: ["publisher", "ens", "gateway", "brave"],
    },
    {
      id: "gateway",
      title: "eth.limo gateway",
      description:
        "Free, open source and DAO-governed. It serves ENS content over TLS 1.3 to any normal browser, with no tracking or logging, and supports CCIP for L2 names. It also powers eth.link now.",
      links: ["reader", "ens", "storage"],
    },
    {
      id: "brave",
      title: "Brave, Opera",
      description:
        "ENS-native browsers. Brave resolves .eth domains itself, so these readers skip the gateway altogether.",
      links: ["reader", "storage"],
    },
    {
      id: "reader",
      title: "A reader's browser",
      description:
        "No extension, no special browser and no local setup. Adding .limo to the name is all it takes.",
      links: ["gateway", "brave"],
    },
  ],
  steps: [
    {
      text: "Write in markdown and build a static site.",
      nodes: ["publisher"],
      edges: [],
    },
    {
      text: "Deploy it to IPFS and pin it. It stays up as long as someone pins it.",
      nodes: ["publisher", "storage"],
      edges: ["publisher-storage"],
    },
    {
      text: "Point your ENS name at the content hash. The name now leads to the files.",
      nodes: ["publisher", "ens", "storage"],
      edges: ["publisher-ens", "ens-storage"],
    },
    {
      text: "A reader opens yourname.eth.limo in a normal browser.",
      nodes: ["reader", "gateway"],
      edges: ["reader-gateway"],
    },
    {
      text: "The gateway reads the ENS record to find what's behind the name.",
      nodes: ["gateway", "ens"],
      edges: ["gateway-ens"],
    },
    {
      text: "It fetches the files from IPFS and serves them as a normal web page.",
      nodes: ["gateway", "storage"],
      edges: ["gateway-storage"],
    },
    {
      text: "Readers on Brave skip the middle step: the browser resolves the .eth name itself.",
      nodes: ["reader", "brave", "storage"],
      edges: ["reader-brave", "brave-storage"],
    },
  ],
};
