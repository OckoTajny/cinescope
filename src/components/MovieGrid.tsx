import type { Movie } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";

type Props = {
  movies: Movie[];
  emptyMessage?: string;
};

export function MovieGrid({ movies, emptyMessage = "No movies found." }: Props) {
  if (movies.length === 0) {
    return <p className="py-16 text-center text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <div key={movie.id} className="w-full">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
