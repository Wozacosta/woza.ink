import type { InteractiveDiagramConfig } from "./types";

export const torrentPeers: InteractiveDiagramConfig = {
  tourLabel: "Follow a download",
  intro: "Tap a box to meet each kind of peer, or follow a download from the first peer list to the first trade.",
  nodes: [
    {
      id: "tracker",
      title: "Tracker",
      description:
        "A coordination server. It doesn't host files, only a list of which peers are in a swarm, and it never sees the file content. Your client gets the list and connects to the peers directly.",
      links: ["you"],
    },
    {
      id: "dht",
      title: "DHT",
      description:
        "Peers themselves form a distributed lookup network, based on Kademlia. You can find the peers for an infohash with no central server, which is what makes trackerless torrents work.",
      links: ["you"],
    },
    {
      id: "you",
      title: "Your client",
      description:
        "It chokes most peers, meaning it refuses to upload to them. Every 10 seconds it unchokes the top 4 by upload rate to you, and every 30 seconds it unchokes one more at random.",
      links: ["tracker", "dht", "seeder", "leecher", "newcomer", "freerider"],
    },
    {
      id: "seeder",
      title: "Seeder",
      description: "Has the complete file and only uploads. It's where a new peer with nothing to trade can still get pieces.",
      links: ["you"],
    },
    {
      id: "leecher",
      title: "Leecher",
      description:
        "Still downloading, so it has some pieces but not all. This is tit-for-tat: upload to it and it keeps uploading to you, and you both go faster.",
      links: ["you"],
    },
    {
      id: "newcomer",
      title: "Newcomer",
      description:
        "It has nothing to trade yet, so it can't earn an unchoke. The optimistic unchoke gives it a chance to bootstrap, and also lets you discover faster peers you haven't tried.",
      links: ["you"],
    },
    {
      id: "freerider",
      title: "Free-rider",
      description:
        "Only leeches. It gets choked by everyone and ends up with terrible speeds, which is the whole incentive: if you want fast downloads, you need to upload.",
      links: ["you"],
    },
  ],
  steps: [
    {
      text: "You have an infohash. You ask a tracker or the DHT who's in the swarm, and get a list of peers.",
      nodes: ["you", "tracker", "dht"],
      edges: ["you-tracker", "you-dht"],
    },
    {
      text: "You connect to peers over TCP. The handshake carries the infohash, so both sides mean the same torrent.",
      nodes: ["you", "seeder", "leecher"],
      edges: [],
    },
    {
      text: "A bitfield message says which pieces each side has. You have none yet.",
      nodes: ["you", "seeder"],
      edges: [],
    },
    {
      text: "You say interested, the seeder unchokes you, and you request blocks.",
      nodes: ["you", "seeder"],
      edges: [],
    },
    {
      text: "With zero pieces you take the first few at random, to get them quickly.",
      nodes: ["you", "seeder"],
      edges: ["seeder-you"],
    },
    {
      text: "A have message announces each new piece. You can upload now, and you switch to rarest first.",
      nodes: ["you", "leecher"],
      edges: ["you-leecher"],
    },
    {
      text: "Every 10 seconds you unchoke the top 4 peers by upload rate to you.",
      nodes: ["you", "leecher"],
      edges: ["you-leecher", "leecher-you"],
    },
    {
      text: "A free-rider gives you nothing back, so it stays choked.",
      nodes: ["you", "freerider"],
      edges: ["you-freerider"],
    },
    {
      text: "Every 30 seconds one random peer gets an optimistic unchoke. That's how a newcomer gets started.",
      nodes: ["you", "newcomer"],
      edges: ["you-newcomer"],
    },
  ],
};
