import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";
import { getPosterUrl, getYear } from "@/lib/tmdb";

type Props = {
  movie: Movie;
  priority?: boolean;
};

export function MovieCard({ movie, priority = false }: Props) {
  const poster = getPosterUrl(movie.poster_path, "w342");

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block w-full overflow-hidden rounded-lg bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 160px, 192px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface px-3 text-center text-xs text-muted">
            {movie.title}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-medium text-foreground">{movie.title}</p>
          <p className="mt-1 text-xs text-muted">
            {getYear(movie.release_date)} · {Math.round(movie.vote_average * 10)}%
          </p>
        </div>
      </div>
    </Link>
  );
}
