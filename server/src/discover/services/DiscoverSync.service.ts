import { Injectable } from "@nestjs/common";
import { CreditType, DiscoverType, ImageType, MediaType, ReviewSource, VideoSite } from "@prisma/client";
import { INGEST } from "src/shared/constants/config/ingest.config";
import { TmdbMovieList, TmdbService } from "./tmdb-discover.service";
import { PrismaService } from "src/shared/services/prisma.service";
import { TitleService } from "src/title/title.service";
import { mapDiscoverItem, parseDate } from "../Ingestion/title";
import { TmdbCastCredit, TmdbCreditPerson, TmdbCrewCredit, TmdbMovieDetailsResponse } from "../types/tmdb";

const MOVIE_LISTS: Partial<Record<DiscoverType, TmdbMovieList>> = {
    TRENDING: "trending",
    POPULAR: "popular",
    TOP_RATED: "top_rated",
    NOW_PLAYING: "now_playing",
    UPCOMING: "upcoming",
};

export const ACTIVE_MOVIE_DISCOVER_TYPES: DiscoverType[] = [
    DiscoverType.TRENDING,
    DiscoverType.POPULAR,
    DiscoverType.TOP_RATED,
    DiscoverType.NOW_PLAYING,
    DiscoverType.UPCOMING,
];

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function imageUrl(filePath: string) {
    return `${TMDB_IMAGE_BASE_URL}${filePath}`;
}

function videoUrl(site: VideoSite, key: string) {
    if (site === VideoSite.YouTube) return `https://www.youtube.com/watch?v=${key}`;
    return `https://vimeo.com/${key}`;
}

function toVideoSite(site: string): VideoSite | null {
    if (site === "YouTube") return VideoSite.YouTube;
    if (site === "Vimeo") return VideoSite.Vimeo;
    return null;
}

@Injectable()
export class DiscoverAsyncService {
    constructor(
        private readonly tmdbService: TmdbService,
        private readonly repo: PrismaService,
        private readonly titleService: TitleService
    ) { }

    async syncMovieList(discoverType: DiscoverType) {
        const list = MOVIE_LISTS[discoverType];
        if (!list) throw new Error(`Unsupported movie discover type: ${discoverType}`);

        let rank = 1;
        let synced = 0;

        for (let page = 1; page <= INGEST.maxPages; page++) {
            const { results } = await this.tmdbService.getMovieList(list, page);

            for (const item of results) {
                const mapped = mapDiscoverItem(item, "movie");
                if (!mapped) continue;

                const existingTitle = await this.repo.title.findUnique({
                    where: {
                        tmdb_id_media_type: {
                            tmdb_id: mapped.tmdb_id,
                            media_type: MediaType.Movie,
                        },
                    },
                    select: {
                        id: true,
                        last_synced_at: true,
                    },
                });

                const title = await this.titleService.upsertTitle(mapped);
                if (!existingTitle || !existingTitle.last_synced_at) {
                    await this.enrichMovieTitle(title.id, mapped.tmdb_id);
                }

                await this.repo.discoverItem.upsert({
                    where: {
                        type_rank: {
                            type: discoverType,
                            rank,
                        },
                    },
                    create: {
                        type: discoverType,
                        rank,
                        titleId: title.id,
                    },
                    update: {
                        titleId: title.id,
                        createdAt: new Date(),
                    },
                });

                rank++;
                synced++;
            }
        }

        await this.repo.discoverItem.deleteMany({
            where: {
                type: discoverType,
                rank: {
                    gte: rank,
                },
            },
        });

        return { type: discoverType, synced };
    }

    async syncMovieDiscoverLists() {
        const results: Awaited<ReturnType<typeof this.syncMovieList>>[] = [];

        for (const discoverType of ACTIVE_MOVIE_DISCOVER_TYPES) {
            results.push(await this.syncMovieList(discoverType));
        }

        return results;
    }

    private async enrichMovieTitle(titleId: string, tmdbId: number) {
        try {
            const details = await this.tmdbService.getMovieDetails(tmdbId);

            await this.updateTitleDetails(titleId, details);
            await this.syncTitleGenres(titleId, details);
            await this.syncTitleImages(titleId, details);
            await this.syncTitleVideos(titleId, details);
            await this.syncTitleReviews(titleId, details);
            await this.syncTitleCredits(titleId, details);

            await this.repo.title.update({
                where: { id: titleId },
                data: { last_synced_at: new Date() },
            });
        } catch (error) {
            await this.repo.ingestionError.create({
                data: {
                    title_id: titleId,
                    tmdb_id: tmdbId,
                    media_type: MediaType.Movie,
                    phase: "movie_enrichment",
                    message: error?.message ?? "Movie enrichment failed.",
                    stack: error?.stack,
                },
            });
        }
    }

    private async updateTitleDetails(titleId: string, details: TmdbMovieDetailsResponse) {
        await this.repo.title.update({
            where: { id: titleId },
            data: {
                title: details.title,
                original_title: details.original_title ?? null,
                original_language: details.original_language ?? null,
                overview: details.overview ?? null,
                tagline: details.tagline ?? null,
                homepage: details.homepage ?? null,
                imdb_id: details.imdb_id ?? null,
                poster_path: details.poster_path ?? null,
                backdrop_path: details.backdrop_path ?? null,
                popularity: details.popularity ?? 0,
                vote_average: details.vote_average ?? 0,
                vote_count: details.vote_count ?? 0,
                adult: details.adult ?? false,
                release_date: parseDate(details.release_date),
                runtime: details.runtime ?? null,
                status: details.status ?? null,
            },
        });
    }

    private async syncTitleGenres(titleId: string, details: TmdbMovieDetailsResponse) {
        const genres = details.genres ?? [];

        for (const genre of genres) {
            await this.repo.genre.upsert({
                where: { tmdb_id: genre.id },
                create: {
                    tmdb_id: genre.id,
                    name: genre.name,
                },
                update: {
                    name: genre.name,
                },
            });

            await this.repo.titleGenre.upsert({
                where: {
                    title_id_genre_id: {
                        title_id: titleId,
                        genre_id: genre.id,
                    },
                },
                create: {
                    title_id: titleId,
                    genre_id: genre.id,
                },
                update: {},
            });
        }
    }

    private async syncTitleImages(titleId: string, details: TmdbMovieDetailsResponse) {
        await this.repo.titleImage.deleteMany({ where: { title_id: titleId } });

        const posters = (details.images?.posters ?? []).slice(0, INGEST.maxPosters);
        const backdrops = (details.images?.backdrops ?? []).slice(0, INGEST.maxBackdrops);
        const images = [
            ...posters.map((poster) => ({
                type: ImageType.Poster,
                file_path: poster.file_path,
                url: imageUrl(poster.file_path),
                width: poster.width ?? null,
                height: poster.height ?? null,
                aspect_ratio: poster.aspect_ratio ?? null,
                title_id: titleId,
            })),
            ...backdrops.map((backdrop) => ({
                type: ImageType.Backdrop,
                file_path: backdrop.file_path,
                url: imageUrl(backdrop.file_path),
                width: backdrop.width ?? null,
                height: backdrop.height ?? null,
                aspect_ratio: backdrop.aspect_ratio ?? null,
                title_id: titleId,
            })),
        ];

        if (!images.length) return;

        await this.repo.titleImage.createMany({
            data: images,
        });
    }

    private async syncTitleVideos(titleId: string, details: TmdbMovieDetailsResponse) {
        await this.repo.titleVideo.deleteMany({ where: { title_id: titleId } });

        const videos = (details.videos?.results ?? [])
            .map((video) => ({ ...video, site: toVideoSite(video.site) }))
            .filter((video) => video.site && video.key && video.published_at);

        if (!videos.length) return;

        await this.repo.titleVideo.createMany({
            data: videos.map((video) => ({
                url: videoUrl(video.site as VideoSite, video.key),
                name: video.name,
                size: video.size ?? null,
                site: video.site as VideoSite,
                published_at: parseDate(video.published_at) ?? new Date(),
                title_id: titleId,
            })),
        });
    }

    private async syncTitleReviews(titleId: string, details: TmdbMovieDetailsResponse) {
        await this.repo.review.deleteMany({
            where: {
                title_id: titleId,
                source: ReviewSource.TMDB,
            },
        });

        const reviews = (details.reviews?.results ?? [])
            .filter((review) => review.id && review.content)
            .slice(0, INGEST.maxReviews);

        if (!reviews.length) return;

        await this.repo.review.createMany({
            data: reviews.map((review) => ({
                tmdb_review_id: review.id,
                title_id: titleId,
                source: ReviewSource.TMDB,
                name: review.author_details?.name || review.author_details?.username || review.author || null,
                avatar_path: review.author_details?.avatar_path ?? null,
                content: review.content,
                createdAt: parseDate(review.created_at) ?? new Date(),
            })),
            skipDuplicates: true,
        });
    }

    private async syncTitleCredits(titleId: string, details: TmdbMovieDetailsResponse) {
        await this.repo.credit.deleteMany({ where: { title_id: titleId } });

        const cast = (details.credits?.cast ?? []).slice(0, INGEST.maxCast);
        const crew = (details.credits?.crew ?? []).filter((member) => INGEST.crewJobs.has(member.job ?? ""));

        for (const member of cast) {
            await this.syncPersonCredit(titleId, member, CreditType.Cast);
        }

        for (const member of crew) {
            await this.syncPersonCredit(titleId, member, CreditType.Crew);
        }
    }

    private async syncPersonCredit(
        titleId: string,
        member: TmdbCastCredit | TmdbCrewCredit,
        creditType: CreditType,
    ) {
        const person = await this.upsertPerson(member);
        const isCast = creditType === CreditType.Cast;

        await this.repo.credit.create({
            data: {
                title_id: titleId,
                person_id: person.id,
                credit_type: creditType,
                department: isCast ? "Acting" : (member as TmdbCrewCredit).department ?? "",
                job: isCast ? "Actor" : (member as TmdbCrewCredit).job ?? "",
                character: isCast ? (member as TmdbCastCredit).character ?? null : null,
                order: isCast ? (member as TmdbCastCredit).order ?? null : null,
            },
        });
    }

    private async upsertPerson(member: TmdbCreditPerson) {
        return this.repo.person.upsert({
            where: { tmdb_id: member.id },
            create: {
                tmdb_id: member.id,
                name: member.name,
                popularity: member.popularity ?? 0,
                profile_path: member.profile_path ?? null,
                known_for_department: member.known_for_department ?? null,
            },
            update: {
                name: member.name,
                popularity: member.popularity ?? 0,
                profile_path: member.profile_path ?? null,
                known_for_department: member.known_for_department ?? null,
            },
        });
    }

    async syncPopularMovies(type:"movie"|"tv") {
        for (let page = 1; page < 2; page++) {
            let { results } = await this.tmdbService.getPopular(type, page)
            for (let i = 0; i < results.length; i++) {
                try {
                    const mapped = mapDiscoverItem(results[i], type);
                    if (mapped) await this.titleService.upsertTitle(mapped);
                    
                } catch (error) {

                }
            }

        }

    }
}
