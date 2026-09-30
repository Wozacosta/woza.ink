"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  const live = project.active !== false;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl
        border border-line
        bg-bg
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-xl hover:border-line-strong"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-line"
        style={{ backgroundColor: `${project.color}14` }}
      >
        {live ? (
          <Image
            src={`/projects/${project.slug}.webp`}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-muted">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          {project.category}
          {!live && (
            <span className="ml-auto rounded-full bg-surface px-2 py-0.5 normal-case tracking-normal text-muted">
              In progress
            </span>
          )}
        </div>

        <h2 className="mt-3 text-xl font-semibold text-fg">
          {live ? (
            // Stretched link: the whole card opens the site
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:underline"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className="mt-1 font-medium text-fg">
          {project.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          {live && (
            <span className="font-mono text-xs text-subtle transition-colors group-hover:text-fg">
              {hostname(project.url)} ↗
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 -my-2 py-2 font-mono text-xs text-subtle underline decoration-dotted underline-offset-2 hover:text-fg"
            >
              source
            </a>
          )}
          {project.post && (
            <Link
              href={`/blog/${project.post}`}
              className="relative z-10 -my-2 py-2 font-mono text-xs text-subtle underline decoration-dotted underline-offset-2 hover:text-fg"
            >
              read the post
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<ProjectCategory | null>(null);

  const counts = new Map<ProjectCategory, number>();
  for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const categories = PROJECT_CATEGORIES.filter((c) => counts.has(c));
  const visible = category ? projects.filter((p) => p.category === category) : projects;

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      active
        ? "bg-fg text-bg"
        : "bg-surface text-muted hover:text-fg"
    }`;

  return (
    <>
      <div
        role="group"
        aria-label="Filter by category"
        className="scroll-row -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mb-10 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          aria-pressed={category === null}
          onClick={() => setCategory(null)}
          className={chip(category === null)}
        >
          All <span className="ml-0.5 font-mono text-xs">{projects.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(category === c ? null : c)}
            className={chip(category === c)}
          >
            {c} <span className="ml-0.5 font-mono text-xs">{counts.get(c)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
