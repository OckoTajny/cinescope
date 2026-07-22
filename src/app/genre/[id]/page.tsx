import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MovieGrid } from "@/components/MovieGrid";
import { getGenres, getMoviesByGenre } from "@/lib/tmdb";

type Params = { id: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const genres = await getGenres();
  const genre = genres.find((g) => String(g.id) === id);
  return { title: `${genre?.name ?? "Genre"} Movies – Cinescope` };
}

export default async function GenrePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [genres, movies] = await Promise.all([getGenres(), getMoviesByGenre(id)]);
  const genre = genres.find((g) => String(g.id) === id);
  if (!genre) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <h1 className="mb-8 font-display text-3xl tracking-wide text-foreground">
        {genre.name} Movies
      </h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
