import type { InteractiveDiagramConfig } from "./types";

export const torrentHandshake: InteractiveDiagramConfig = {
  tourLabel: "Read it left to right",
  intro: "Tap a field to see what it's for, or read the handshake from the first byte to the last.",
  nodes: [
    {
      id: "len",
      title: "Length",
      description: "One byte holding the number 19, the length of the protocol name that follows.",
      links: [],
    },
    {
      id: "name",
      title: "Protocol name",
      description: "The 19 characters of \"BitTorrent protocol\". That's the protocol identifier.",
      links: [],
    },
    {
      id: "reserved",
      title: "Reserved",
      description: "Eight bytes, all zero in the original spec. Extensions use them as flags to say what a client supports.",
      links: [],
    },
    {
      id: "hash",
      title: "Infohash",
      description: "The 20-byte SHA1 hash of the torrent's info. If the two sides don't send the same value, they drop the connection.",
      links: [],
    },
    {
      id: "peer",
      title: "Peer ID",
      description: "A 20-byte ID for the client on the other end. After this comes the stream of length-prefixed messages.",
      links: [],
    },
  ],
  steps: [
    {
      text: "A length byte, then the protocol name: this is BitTorrent.",
      nodes: ["len", "name"],
      edges: [],
    },
    {
      text: "Eight reserved bytes, which is where clients flag the extensions they support.",
      nodes: ["reserved"],
      edges: [],
    },
    {
      text: "The infohash. Both sides must be talking about the same torrent, or the connection ends here.",
      nodes: ["hash"],
      edges: [],
    },
    {
      text: "The peer ID says who you're talking to. From here on it's bitfield, have, interested and the rest.",
      nodes: ["peer"],
      edges: [],
    },
  ],
};
