export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 text-sm text-muted md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg tracking-wide text-foreground">
          CINE<span className="text-accent">SCOPE</span>
        </p>
        <p>
          Movie data and images provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-border underline-offset-4 transition hover:text-accent"
          >
            The Movie Database (TMDB)
          </a>
          . This product is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
}
