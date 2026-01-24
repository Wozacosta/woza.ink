import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

function getScreenshotUrl(url: string) {
  const encoded = encodeURIComponent(url);
  return `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`;
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <header className="py-16 px-8">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-900 transition-colors mb-8 inline-block"
        >
          &larr; Back
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 max-w-md">Things I've built</p>
      </header>

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="transition-all duration-300 ease-out group-hover:scale-[1.02]">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={getScreenshotUrl(project.url)}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                  {project.github && (
                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </span>
                  )}
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
