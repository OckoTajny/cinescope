import Link from "next/link";
import type { Genre } from "@/lib/tmdb";

type Props = {
  genres: Genre[];
};

export function GenrePills({ genres }: Props) {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">Browse by Genre</h2>
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
