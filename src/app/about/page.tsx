import { marked } from "marked";
import { getAboutContent } from "@/data/about";

export const metadata = {
  title: "About — woza.ink",
  description: "Who's behind woza.ink, and why it exists.",
  alternates: {
    canonical: "/about",
    types: { "text/markdown": "/about.md" },
  },
};

export default async function AboutPage() {
  const about = getAboutContent();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      {about ? (
        <div
          className="prose prose-base max-w-none sm:prose-lg prose-headings:tracking-tight prose-h1:text-4xl md:prose-h1:text-5xl"
          dangerouslySetInnerHTML={{ __html: await marked(about.content) }}
        />
      ) : (
        <>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About</h1>
          <p className="py-12 text-center text-muted">Coming soon...</p>
        </>
      )}
    </article>
  );
}
