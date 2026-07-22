import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MovieGrid } from "@/components/MovieGrid";
import { getPopular, getTopRated, getNowPlaying, type Movie } from "@/lib/tmdb";

const BROWSE_CONFIG: Record<string, { title: string; fetcher: () => Promise<Movie[]> }> = {
  popular: { title: "Popular Movies", fetcher: getPopular },
  "top-rated": { title: "Top Rated Movies", fetcher: getTopRated },
  "now-playing": { title: "Now Playing", fetcher: getNowPlaying },
};

type Params = { slug: string };

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => ({
    title: `${BROWSE_CONFIG[slug]?.title ?? "Browse"} – Cinescope`,
  }));
}

export default async function BrowsePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const config = BROWSE_CONFIG[slug];
  if (!config) notFound();

  const movies = await config.fetcher();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <h1 className="mb-8 font-display text-3xl tracking-wide text-foreground">{config.title}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
