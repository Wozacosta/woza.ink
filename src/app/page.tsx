import Link from "next/link";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          woza.ink
        </h1>

        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
