"use client";

import Link from "next/link";

interface ProjectLayoutProps {
  title: string;
  children: React.ReactNode;
  backColor?: string;
}

export default function ProjectLayout({
  title,
  children,
  backColor = "#1a1a1a",
}: ProjectLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
          style={{ color: backColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">{title}</span>
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
