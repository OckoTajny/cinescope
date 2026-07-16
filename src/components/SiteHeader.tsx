import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-foreground"
        >
          CINE<span className="text-accent">SCOPE</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/browse/popular" className="transition hover:text-foreground">
            Popular
          </Link>
          <Link href="/browse/top-rated" className="transition hover:text-foreground">
            Top Rated
          </Link>
          <Link href="/browse/now-playing" className="transition hover:text-foreground">
            Now Playing
          </Link>
        </nav>

        <form action="/search" method="GET" className="ml-auto w-full max-w-xs">
          <input
            type="search"
            name="q"
            placeholder="Search movies…"
            className="w-full rounded-full border border-border bg-surface/80 px-4 py-2 text-sm text-foreground placeholder:text-muted outline-none backdrop-blur transition focus:border-accent"
          />
        </form>
      </div>
    </header>
  );
}
