import type { InteractiveDiagramConfig } from "./types";

export const standardSiteVerify: InteractiveDiagramConfig = {
  tourLabel: "Follow a check",
  intro: "Tap a box to see what it holds, or follow an app as it checks a record against the site.",
  nodes: [
    {
      id: "wellknown",
      title: "Well-known file",
      description: "Your domain serves the publication's AT-URI at /.well-known/site.standard.publication. Only someone who controls the domain can put it there.",
      links: ["publication"],
    },
    {
      id: "link",
      title: "<link> tag",
      description: "Each post's HTML names its record in a <link rel=\"site.standard.document\"> tag. On this site the post page renders it from the atUri frontmatter.",
      links: ["document"],
    },
    {
      id: "publication",
      title: "Publication record",
      description: "A site.standard.publication record in your repo. It describes the blog: its URL and name.",
      links: ["wellknown", "document"],
    },
    {
      id: "document",
      title: "Document record",
      description:
        "One site.standard.document per post: its title, path, date and tags. Its site field points at the publication. Anyone can write one claiming to be your site, so on its own it proves nothing.",
      links: ["link", "publication", "app"],
    },
    {
      id: "app",
      title: "An app",
      description: "A reader, search engine or Bluesky itself. There's no registry and nobody to apply to, so the app does the checking.",
      links: ["document"],
    },
  ],
  steps: [
    {
      text: "An app finds a document record. Anyone could have written it, so it proves nothing yet.",
      nodes: ["app", "document"],
      edges: ["app-document"],
    },
    {
      text: "Its site field points at the publication record.",
      nodes: ["document", "publication"],
      edges: ["document-publication"],
    },
    {
      text: "That record's URL plus the document's path gives the post's real address.",
      nodes: ["publication", "document", "link"],
      edges: ["document-link"],
    },
    {
      text: "The app fetches that page. Its <link> tag has to name this same record.",
      nodes: ["link", "document"],
      edges: ["link-document"],
    },
    {
      text: "It fetches the well-known file from the site's URL. That has to name the publication.",
      nodes: ["publication", "wellknown"],
      edges: ["publication-wellknown", "wellknown-publication"],
    },
    {
      text: "Both directions match, so the record counts. Controlling the domain and the repo is the proof.",
      nodes: ["wellknown", "link", "publication", "document"],
      edges: ["wellknown-publication", "link-document"],
    },
  ],
};
