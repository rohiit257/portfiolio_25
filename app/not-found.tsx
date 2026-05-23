import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-[1.25rem] border border-border/70 bg-card/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {"//404"}
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This portfolio is intentionally small and focused. The homepage has
          the projects, experience, links, and contact route.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
