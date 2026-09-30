import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getReadTime } from "@/data/blog";
import { projects } from "@/data/projects";
import { formatDate } from "@/lib/format";
import { AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

const LATEST_POSTS = 5;
const FEATURED_PROJECTS = 4;

function SectionHeading({
  id,
  title,
  href,
  cta,
}: {
  id: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-mono text-xs uppercase tracking-widest text-subtle">
        {title}
      </h2>
      <Link href={href} className="text-sm text-muted transition-colors hover:text-fg">
        {cta} →
      </Link>
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, LATEST_POSTS);
  const featured = projects.filter((p) => p.active !== false).slice(0, FEATURED_PROJECTS);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_TITLE,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          author: { "@type": "Person", name: AUTHOR.name, url: `${SITE_URL}/about`, sameAs: [AUTHOR.github] },
        }}
      />

      <section className="mx-auto max-w-3xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
        <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          Hey, I&apos;m Samy.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          I build small, focused web apps, mostly to scratch my own itch, and
          write about crypto protocols, AI-assisted coding and the tools I use
          every day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Read the blog
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface"
          >
            See projects
          </Link>
        </div>
      </section>

      <section aria-labelledby="latest-posts" className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <SectionHeading id="latest-posts" title="Latest writing" href="/blog" cta="All posts" />
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-xs uppercase tracking-wide text-subtle sm:w-28"
                >
                  {formatDate(post.date)}
                </time>
                <span className="font-medium text-fg underline-offset-4 group-hover:underline">
                  {post.title}
                </span>
                <span className="font-mono text-xs text-subtle sm:ml-auto sm:shrink-0">
                  {getReadTime(post.content)} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-projects" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-none">
          <SectionHeading
            id="featured-projects"
            title="Things I've built"
            href="/projects"
            cta="All projects"
          />
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-line transition-colors hover:border-line-strong"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
                  <Image
                    src={`/projects/${project.slug}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-fg">{project.title}</p>
                  <p className="mt-1 text-sm text-muted">{project.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
