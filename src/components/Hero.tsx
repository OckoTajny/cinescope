import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";
import { getBackdropUrl, getYear } from "@/lib/tmdb";

type Props = {
  movie: Movie;
};

export function Hero({ movie }: Props) {
  const backdrop = getBackdropUrl(movie.backdrop_path, "original");

  return (
    <section className="relative flex h-[85vh] min-h-[560px] w-full items-end overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Trending Today
        </p>
        <h1 className="text-shadow-hero max-w-2xl font-display text-5xl leading-none tracking-wide text-foreground md:text-7xl">
          {movie.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{getYear(movie.release_date)}</span>
          <span>·</span>
          <span>{Math.round(movie.vote_average * 10)}% match</span>
        </div>
        <p className="mt-4 max-w-xl text-shadow-hero line-clamp-3 text-base text-foreground/90 md:text-lg">
          {movie.overview}
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href={`/movie/${movie.id}#trailer`}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-strong"
          >
            ▶ Watch Trailer
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="rounded-full border border-border bg-surface/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-surface-hover"
          >
            More Info
          </Link>
        </div>
      </div>
    </section>
  );
}
