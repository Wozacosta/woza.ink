import type { Sidenote } from "@/data/sidenotes/types";

export const typeLabel: Record<Sidenote["type"], string> = {
  quote: "Quote",
  source: "Source",
  context: "Context",
  counter: "Counter",
  note: "Note",
};

export const typeDot: Record<Sidenote["type"], string> = {
  quote: "bg-amber-400",
  source: "bg-blue-400",
  context: "bg-emerald-400",
  counter: "bg-rose-400",
  note: "bg-gray-400",
};
