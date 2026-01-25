import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <header className="py-16 px-8">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
        >
          &larr; Back
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          About
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-24">
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          Coming soon...
        </p>
      </section>
    </main>
  );
}
