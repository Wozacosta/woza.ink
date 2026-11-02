import type { InteractiveDiagramConfig } from "./types";

export const x402Settlement: InteractiveDiagramConfig = {
  tourLabel: "Follow a payment",
  intro: "Tap a box to see what it does, or follow one payment from the first request to the data.",
  nodes: [
    {
      id: "agent",
      title: "Agent",
      description:
        "The client paying for the call. It has no account and no API key, just a wallet that can sign. On the default EVM path it only signs a message and never touches gas.",
      links: ["server"],
    },
    {
      id: "server",
      title: "Server",
      description:
        "The API being paid. A middleware usually does all of this: you declare a price per route and it answers with the 402, calls the facilitator and sets the headers.",
      links: ["agent", "facilitator"],
    },
    {
      id: "facilitator",
      title: "Facilitator",
      description:
        "An optional service that spares the server from running chain infrastructure. It never holds the money, and it can't change the amount or the destination, because the client's signature fixes both.",
      links: ["server"],
    },
    {
      id: "work",
      title: "Does the work",
      description:
        "The server produces the response before it's been paid. A payment can pass verification and still fail settlement, and the spec gives the server nothing back when that happens.",
      links: [],
    },
    {
      id: "chain",
      title: "Sends it onchain",
      description:
        "The facilitator broadcasts the signed transfer and pays the gas. The tokens move straight from payer to payee. With exact, every call waits for this confirmation.",
      links: [],
    },
  ],
  steps: [
    {
      text: "The agent asks for the data with a plain GET. No account, no API key.",
      nodes: ["agent", "server"],
      edges: ["agent-server"],
    },
    {
      text: "The server answers 402. PAYMENT-REQUIRED lists what it costs and how to pay: a menu of chains and tokens.",
      nodes: ["server", "agent"],
      edges: ["server-agent"],
    },
    {
      text: "The agent signs a payment matching one entry and resends the same request with it in PAYMENT-SIGNATURE.",
      nodes: ["agent", "server"],
      edges: ["agent-server-signed"],
    },
    {
      text: "The server calls /verify. It's read-only: signature, balance, amount, validity window, token and network, then a simulated transfer.",
      nodes: ["server", "facilitator"],
      edges: ["server-facilitator"],
    },
    {
      text: "The payment is valid, but nothing has moved yet.",
      nodes: ["facilitator", "server"],
      edges: ["facilitator-server"],
    },
    {
      text: "The server does the work. This is the exposure: it's working on a payment that hasn't settled.",
      nodes: ["server", "work"],
      edges: [],
    },
    {
      text: "The server calls /settle.",
      nodes: ["server", "facilitator"],
      edges: ["server-facilitator-settle"],
    },
    {
      text: "The facilitator puts the transaction onchain and pays the gas. The tokens go straight from payer to payee.",
      nodes: ["facilitator", "chain"],
      edges: [],
    },
    {
      text: "Once it confirms, the facilitator tells the server.",
      nodes: ["facilitator", "server"],
      edges: ["facilitator-server-confirmed"],
    },
    {
      text: "The data comes back with PAYMENT-RESPONSE, which holds the transaction hash.",
      nodes: ["server", "agent"],
      edges: ["server-agent-data"],
    },
  ],
};
