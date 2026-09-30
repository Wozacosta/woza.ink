import { projects } from "@/data/projects";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Projects — woza.ink",
  description:
    "Small, focused web apps I've built: language learning, quitting nicotine, travel planning, productivity and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const live = projects.filter((p) => p.active !== false).length;

  return (
    <>
      <PageHeader
        width="max-w-6xl"
        title="Projects"
        description="Small, focused web apps I've built, mostly to scratch my own itch: learning Chinese, quitting nicotine, planning trips, getting things done."
        meta={`${live} live · ${projects.length - live} in progress`}
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
