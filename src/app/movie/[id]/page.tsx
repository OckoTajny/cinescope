import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RatingBadge } from "@/components/RatingBadge";
import { CastCard } from "@/components/CastCard";
import { getMovie, getBackdropUrl, getPosterUrl, getYear, getTrailer } from "@/lib/tmdb";

type Params = { id: string };

export const dynamic = "force-dynamic";

async function fetchMovie(id: string) {
  try {
    return await getMovie(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await fetchMovie(id);
  if (!movie) return { title: "Movie not found — Cinescope" };
  return {
    title: `${movie.title} — Cinescope`,
    description: movie.overview,
  };
}

function formatRuntime(minutes: number): string {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default async function MoviePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const movie = await fetchMovie(id);
  if (!movie) notFound();

  const backdrop = getBackdropUrl(movie.backdrop_path, "original");
  const poster = getPosterUrl(movie.poster_path, "w500");
  const trailer = getTrailer(movie.videos);
  const cast = movie.credits.cast.slice(0, 12);

  return (
    <div>
      <section className="relative flex min-h-[420px] items-end overflow-hidden pt-24">
        {backdrop && (
          <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl gap-8 px-6 pb-12 md:px-10">
          {poster && (
            <Image
              src={poster}
              alt={movie.title}
              width={220}
              height={330}
              className="hidden rounded-lg shadow-2xl shadow-black/60 sm:block"
            />
          )}
          <div className="flex flex-col justify-end">
            <h1 className="text-shadow-hero font-display text-4xl tracking-wide text-foreground md:text-6xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-2 italic text-muted">{movie.tagline}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{getYear(movie.release_date)}</span>
              <span>·</span>
              <span>{formatRuntime(movie.runtime)}</span>
              {movie.genres.length > 0 && (
                <>
                  <span>·</span>
                  <span>{movie.genres.map((g) => g.name).join(", ")}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="md:w-2/3">
            <div className="mb-8 flex items-center gap-4">
              <RatingBadge voteAverage={movie.vote_average} />
              <p className="text-sm text-muted">User Score</p>
            </div>

            <h2 className="mb-3 font-display text-2xl tracking-wide text-foreground">Overview</h2>
            <p className="max-w-2xl leading-relaxed text-foreground/90">{movie.overview}</p>

            {cast.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">Cast</h2>
                <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                  {cast.map((member) => (
                    <CastCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {trailer && (
            <div id="trailer" className="scroll-mt-24 md:w-1/3">
              <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">Trailer</h2>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-surface">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
