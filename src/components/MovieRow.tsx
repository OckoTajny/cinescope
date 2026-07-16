import Link from "next/link";
import type { Movie } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";

type Props = {
  title: string;
  movies: Movie[];
  seeAllHref?: string;
};

export function MovieRow({ title, movies, seeAllHref }: Props) {
  if (movies.length === 0) return null;

  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-wide text-foreground">{title}</h2>
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="text-sm text-muted transition hover:text-accent"
            >
              See all →
            </Link>
          )}
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {movies.map((movie) => (
            <div key={movie.id} className="w-40 shrink-0 snap-start sm:w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
