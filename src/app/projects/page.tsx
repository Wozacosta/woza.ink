import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Projects — woza.ink",
  description:
    "Small, focused web apps I've built: language learning, quitting nicotine, travel planning, productivity and more.",
};

export default function ProjectsPage() {
  const live = projects.filter((p) => p.active !== false).length;

  return (
    <main className="min-h-screen">
      <header className="mx-auto max-w-6xl px-8 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          &larr; Back
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Small, focused web apps I&apos;ve built, mostly to scratch my own
          itch: learning Chinese, quitting nicotine, planning trips, getting
          things done.
        </p>
        <p className="mt-3 font-mono text-sm text-gray-400 dark:text-gray-500">
          {live} live · {projects.length - live} in progress
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-8 pb-24">
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}
