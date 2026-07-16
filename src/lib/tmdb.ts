const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetail extends Movie {
  tagline: string;
  runtime: number;
  genres: Genre[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
}

interface PagedResult<T> {
  page: number;
  results: T[];
  total_pages: number;
}

function posterUrl(path: string | null, size: "w342" | "w500" = "w500"): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

function backdropUrl(path: string | null, size: "w780" | "original" = "w780"): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not set. Add it to .env.local (see .env.example).");
  }

  const search = new URLSearchParams({ api_key: apiKey, ...params });
  const res = await fetch(`${API_BASE}${path}?${search.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getTrending(): Promise<Movie[]> {
  const data = await tmdbFetch<PagedResult<Movie>>("/trending/movie/day");
  return data.results;
}

export async function getPopular(): Promise<Movie[]> {
  const data = await tmdbFetch<PagedResult<Movie>>("/movie/popular");
  return data.results;
}

export async function getTopRated(): Promise<Movie[]> {
  const data = await tmdbFetch<PagedResult<Movie>>("/movie/top_rated");
  return data.results;
}

export async function getNowPlaying(): Promise<Movie[]> {
  const data = await tmdbFetch<PagedResult<Movie>>("/movie/now_playing");
  return data.results;
}

export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

export async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  const data = await tmdbFetch<PagedResult<Movie>>("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  const data = await tmdbFetch<PagedResult<Movie>>("/search/movie", { query });
  return data.results;
}

export async function getMovie(id: string): Promise<MovieDetail> {
  return tmdbFetch<MovieDetail>(`/movie/${id}`, { append_to_response: "videos,credits" });
}

export function getPosterUrl(path: string | null, size: "w342" | "w500" = "w500"): string | null {
  return posterUrl(path, size);
}

export function getBackdropUrl(path: string | null, size: "w780" | "original" = "w780"): string | null {
  return backdropUrl(path, size);
}

export function getProfileUrl(path: string | null): string | null {
  return path ? `${IMAGE_BASE}/w185${path}` : null;
}

export function getYear(dateStr: string): string {
  return dateStr ? dateStr.slice(0, 4) : "—";
}

export function getTrailer(videos: { results: Video[] }): Video | undefined {
  return (
    videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ??
    videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer")
  );
}
