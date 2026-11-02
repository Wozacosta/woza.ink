import type { InteractiveDiagramConfig } from "./types";

export const erc8004Validation: InteractiveDiagramConfig = {
  tourLabel: "Follow a validation",
  intro: "Tap a box to see its role, or follow one validation from request to score.",
  nodes: [
    {
      id: "owner",
      title: "Agent owner",
      description: "The owner or operator of the agent asks for validation, naming a validator and pointing to offchain data with everything it needs.",
      links: ["registry"],
    },
    {
      id: "registry",
      title: "Validation Registry",
      description: "It records that validation happened and what the result was. It doesn't care which mechanism was used.",
      links: ["owner", "validator"],
    },
    {
      id: "validator",
      title: "Validator",
      description: "Only the address named in the request can respond. It can respond more than once, for example soft and then hard finality.",
      links: ["registry", "check"],
    },
    {
      id: "check",
      title: "The check",
      description: "Stakers re-executing the task, a zero-knowledge proof of the model's output, or an attestation from a Trusted Execution Environment.",
      links: ["validator"],
    },
  ],
  steps: [
    {
      text: "The owner calls validationRequest. The hash of the request data also identifies the request.",
      nodes: ["owner", "registry"],
      edges: ["owner-registry"],
    },
    {
      text: "The request names one validator.",
      nodes: ["registry", "validator"],
      edges: ["registry-validator"],
    },
    {
      text: "The validator does the work offchain, with whichever method fits.",
      nodes: ["validator", "check"],
      edges: ["validator-check"],
    },
    {
      text: "It calls validationResponse with a score from 0, failed, to 100, passed.",
      nodes: ["validator", "registry"],
      edges: ["validator-registry"],
    },
  ],
};
