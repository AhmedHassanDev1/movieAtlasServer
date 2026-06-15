import { TmdbDiscoverItem } from "../types/tmdb";


export function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toMediaType(kind) {
    return kind === "movie" ? "Movie" : "TV";
}


export function mapDiscoverItem(item:TmdbDiscoverItem, kind:"movie"|"tv") {
    if (!item.id || !(kind === "movie" ? item.title : item.name)) {
        return null;
    }

    const mediaType = toMediaType(kind);

    return {
        tmdb_id: item.id,
        media_type: mediaType,
        title: kind === "movie" ? item.title : item.name,
        original_title:
            kind === "movie" ? item.original_title : item.original_name,
        original_language: item.original_language ?? null,
        overview: item.overview ?? null,
        poster_path: item.poster_path ?? null,
        backdrop_path: item.backdrop_path ?? null,
        popularity: item.popularity ?? 0,
        vote_average: item.vote_average ?? 0,
        vote_count: item.vote_count ?? 0,
        adult: item.adult ?? false,
        release_date: parseDate(
            kind === "movie" ? item.release_date : item.first_air_date
        ),
        genre_ids: item.genre_ids ?? [],
    };
}