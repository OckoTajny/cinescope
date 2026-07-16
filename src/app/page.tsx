import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { GenrePills } from "@/components/GenrePills";
import {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getGenres,
} from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [trending, popular, topRated, nowPlaying, genres] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getNowPlaying(),
    getGenres(),
  ]);

  const [featured, ...restTrending] = trending;

  return (
    <>
      {featured && <Hero movie={featured} />}

      <div className="flex flex-col gap-12 py-12">
        <MovieRow title="Trending Today" movies={restTrending} />
        <MovieRow title="Popular" movies={popular} seeAllHref="/browse/popular" />
        <MovieRow title="Top Rated" movies={topRated} seeAllHref="/browse/top-rated" />
        <MovieRow title="Now Playing" movies={nowPlaying} seeAllHref="/browse/now-playing" />
        <GenrePills genres={genres} />
      </div>
    </>
  );
}
