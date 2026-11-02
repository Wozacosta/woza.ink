import type { InteractiveDiagramConfig } from "./types";

export const standardSitePublish: InteractiveDiagramConfig = {
  tourLabel: "Publish a post",
  intro: "Tap a step for the details, or follow one post from markdown to a checked page.",
  nodes: [
    {
      id: "post",
      title: "Markdown post",
      description:
        "A file in the blog. Frontmatter holds the title, date and tags. Posts marked wip are skipped.",
      links: ["sequoia"],
    },
    {
      id: "sequoia",
      title: "sequoia publish",
      description:
        "Reads the frontmatter and creates a document record per post. Vercel doesn't run it, so a new post needs a run by hand.",
      links: ["post", "repo", "aturi"],
    },
    {
      id: "repo",
      title: "Your repo",
      description:
        "The records live on your PDS, alongside your other AT Protocol data. The first run created 35.",
      links: ["sequoia", "validator"],
    },
    {
      id: "aturi",
      title: "atUri in the file",
      description: "Sequoia writes each record's address back into the post's frontmatter.",
      links: ["sequoia", "deploy"],
    },
    {
      id: "deploy",
      title: "Commit, deploy",
      description: "The new atUri lines get committed, and Vercel does the building.",
      links: ["aturi", "page"],
    },
    {
      id: "page",
      title: "Post page",
      description:
        "Because Vercel builds it, the page renders the <link> tag from atUri itself, instead of Sequoia's inject step editing built HTML.",
      links: ["deploy", "validator"],
    },
    {
      id: "validator",
      title: "Validator",
      description:
        "The Standard.site validator ran on two posts, and both passed all 16 checks. A small script then confirmed all 35 live pages.",
      links: ["page", "repo"],
    },
  ],
  steps: [
    {
      text: "A new post is a markdown file with frontmatter.",
      nodes: ["post"],
      edges: [],
    },
    {
      text: "Running sequoia publish reads it.",
      nodes: ["post", "sequoia"],
      edges: ["post-sequoia"],
    },
    {
      text: "It creates a document record in your repo.",
      nodes: ["sequoia", "repo"],
      edges: ["sequoia-repo"],
    },
    {
      text: "It also writes the record's atUri back into the file.",
      nodes: ["sequoia", "aturi"],
      edges: ["sequoia-aturi"],
    },
    {
      text: "Commit that line and deploy.",
      nodes: ["aturi", "deploy"],
      edges: ["aturi-deploy"],
    },
    {
      text: "The built page names its record in a <link> tag.",
      nodes: ["deploy", "page"],
      edges: ["deploy-page"],
    },
    {
      text: "Now the page and the record point at each other, and a validator can check both.",
      nodes: ["page", "repo", "validator"],
      edges: ["page-validator", "repo-validator"],
    },
  ],
};
