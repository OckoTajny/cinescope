import { MovieGrid } from "@/components/MovieGrid";
import { searchMovies } from "@/lib/tmdb";

type SearchParams = { q?: string };

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "" } = await searchParams;
  const movies = q ? await searchMovies(q) : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <h1 className="mb-8 font-display text-3xl tracking-wide text-foreground">
        {q ? (
          <>
            Results for <span className="text-accent">&ldquo;{q}&rdquo;</span>
          </>
        ) : (
          "Search"
        )}
      </h1>
      <MovieGrid
        movies={movies}
        emptyMessage={q ? `No movies found for "${q}".` : "Type something in the search bar above."}
      />
    </div>
  );
}
