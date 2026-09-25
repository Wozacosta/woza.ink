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

function ProjectCard({ project }: { project: Project }) {
  const live = project.active !== false;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl
        border border-gray-200 dark:border-gray-800
        bg-white/60 dark:bg-gray-900/40
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-gray-200 dark:border-gray-800"
        style={{ backgroundColor: `${project.color}14` }}
      >
        {live ? (
          <Image
            src={`/projects/${project.slug}.webp`}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className="text-3xl font-bold tracking-tight opacity-60"
              style={{ color: project.color }}
            >
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          {project.category}
          {!live && (
            <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 normal-case tracking-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              In progress
            </span>
          )}
        </div>

        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
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
        <p className="mt-1 font-medium text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          {live && (
            <span className="font-mono text-xs text-gray-400 transition-colors group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200">
              {hostname(project.url)} ↗
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 font-mono text-xs text-gray-400 underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
            >
              source
            </a>
          )}
          {project.post && (
            <Link
              href={`/blog/${project.post}`}
              className="relative z-10 font-mono text-xs text-gray-400 underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
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
    `rounded-full px-3 py-1 text-sm transition-colors ${
      active
        ? "bg-ink text-cream dark:bg-cream dark:text-ink"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
    }`;

  return (
    <>
      <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === null}
          onClick={() => setCategory(null)}
          className={chip(category === null)}
        >
          All <span className="opacity-50">{projects.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(category === c ? null : c)}
            className={chip(category === c)}
          >
            {c} <span className="opacity-50">{counts.get(c)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
