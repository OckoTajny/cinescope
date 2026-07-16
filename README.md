# Cinescope

A movie discovery site built with Next.js 16 (App Router) and the [TMDB API](https://www.themoviedb.org/documentation/api) — trending/popular/top-rated browsing, search, genre filters, and movie detail pages with cast and trailers.

Metadata only: posters, overviews, ratings, cast, and YouTube trailers via TMDB. No video streaming.

## Setup

1. Get a free TMDB API key: create an account at [themoviedb.org](https://www.themoviedb.org/signup), then generate a v3 API key under **Settings → API**.
2. Copy `.env.example` to `.env.local` and paste your key:

   ```bash
   cp .env.example .env.local
   ```

3. Install dependencies and run the dev server:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router, Server Components)
- Tailwind CSS v4
- TMDB API (server-side only — the API key never reaches the client bundle)

## Structure

- `src/lib/tmdb.ts` — typed TMDB API client (trending, popular, top rated, now playing, search, genres, movie detail)
- `src/components/` — `Hero`, `MovieCard`, `MovieRow`, `MovieGrid`, `CastCard`, `RatingBadge`, `GenrePills`, `SiteHeader`, `SiteFooter`
- `src/app/` — home, `/movie/[id]`, `/search`, `/browse/[slug]` (popular / top-rated / now-playing), `/genre/[id]`

This product uses the TMDB API but is not endorsed or certified by TMDB.
