import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "standard-site",
  notes: [
    {
      marker: "no one at Bluesky knew it was coming",
      type: "quote",
      content:
        "\"When the Standard.site project launched early this year, no one at Bluesky knew it was coming—we were as surprised and delighted as anyone to see it!\"",
      attribution: "Jim Ray, AT Protocol blog, May 27, 2026",
      url: "https://atproto.com/blog/standard-site-bluesky-timeline",
    },
    {
      marker: "they agreed on one at the end of 2025",
      type: "source",
      content:
        "The AT Protocol blog says \"at the end of last year\" for the collaboration and \"early this year\" for the launch.",
    },
    {
      marker: "anyone can write one claiming to be your site",
      type: "context",
      content:
        "The docs are direct about it: a record \"should only be considered 'valid' if the author of the material provides an accurate verification endpoint pointing to the record.\"",
      url: "https://standard.site/docs/verification/",
    },
    {
      marker: "`bskyPostRef`",
      type: "note",
      content:
        "Sequoia can post to Bluesky when you publish, link that post to the record, and show the replies with a small web component.",
      url: "https://sequoia.pub/comments",
    },
    {
      marker: "often Bluesky's servers for your PDS",
      type: "source",
      content:
        "Redowan's did:plc entry points at a host.bsky.network server, and so does mine. That's two examples, not a measurement across the network.",
    },
    {
      marker: "with an app password",
      type: "note",
      content:
        "The login also accepts your main password, without a warning. You can tell them apart in the session token: `com.atproto.appPass` is an app password, `com.atproto.access` is the whole account.",
    },
  ],
};
