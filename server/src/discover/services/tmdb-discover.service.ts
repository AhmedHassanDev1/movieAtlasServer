import { HttpService } from "@nestjs/axios";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosInstance } from "axios";
import { INGEST } from "src/shared/constants/config/ingest.config";
import { TmdbDiscoverResponse, TmdbMovieDetailsResponse, TmdbPersonDetailsResponse } from "../types/tmdb";

export type TmdbMovieList = "trending" | "popular" | "top_rated" | "now_playing" | "upcoming";

const MOVIE_LIST_ENDPOINTS: Record<TmdbMovieList, string> = {
    trending: "trending/movie/day",
    popular: "movie/popular",
    top_rated: "movie/top_rated",
    now_playing: "movie/now_playing",
    upcoming: "movie/upcoming",
};

@Injectable()
export class TmdbService implements OnModuleInit {
    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) { }

    private tmdb: AxiosInstance
    private params
    onModuleInit() {
        this.tmdb = this.httpService.axiosRef.create({
            baseURL: "https://api.themoviedb.org/3/",
            timeout: 10000,
            headers: {
                Authorization: `Bearer ${this.config.get<string>("TMDB_ACCESS_TOKEN")}`
            }
        })
        this.params = {
            page: 1,
            include_adult: INGEST.includeAdult,
            sort_by: INGEST.sortBy,
            "vote_average.gte": INGEST.minVoteAverage,
            "primary_release_date.gte": INGEST.releaseDateFrom,
            language: INGEST.language
        }

    }

    async getMovieList(list: TmdbMovieList, page: number): Promise<TmdbDiscoverResponse> {
        const endpoint = MOVIE_LIST_ENDPOINTS[list];
        const params = {
            page,
            language: INGEST.language,
            include_adult: INGEST.includeAdult,
        };

        const movies = await this.tmdb.get(endpoint, { params });
        return movies.data;
    }

    async getMovieDetails(tmdbId: number): Promise<TmdbMovieDetailsResponse> {
        const movie = await this.tmdb.get(`movie/${tmdbId}`, {
            params: {
                language: INGEST.language,
                append_to_response: "images,videos,reviews,credits",
                include_image_language: `${INGEST.language.split("-")[0]},null`,
            },
        });

        return movie.data;
    }

    async getPersonDetails(tmdbId: number): Promise<TmdbPersonDetailsResponse> {
        const person = await this.tmdb.get(`person/${tmdbId}`, {
            params: {
                language: INGEST.language,
            },
        });

        return person.data;
    }

    async getPopular(type: "movie" | "tv", page: number): Promise<TmdbDiscoverResponse> {
        let movies = await this.tmdb.get(`${type}/popular`,
            {
                params: {
                    ...this.params,
                    "vote_count.gte": INGEST.minVoteCount[type],
                    page
                }
            }
        )
        return movies.data
    }
} 
