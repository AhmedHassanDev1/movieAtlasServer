import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ImageAssetDTO, TitleEntity, VideoAssetDTO } from './dto/Title-response.dto';
import { GenresResponseDTO } from './dto/Genres-response.dto';
import { Prisma } from '@prisma/client';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { ReviewResponseDTO } from 'src/review/dto/Review-response.dto';



@Injectable()
export class TitleService {
    constructor(
        private readonly Repo: PrismaService,
        private readonly paginationHelper: PaginationHelper
    ) { }

    async getTitleById(id: string) {
        let title = await this.Repo.title.findUnique({ where: { id } })
        if (!title) throw new NotFoundException("not found this content.")
        return DTOMapper.toResponse(title, TitleEntity);
    }

    async getTitleGenres(id: string) {
        const genres = await this.Repo.titleGenre.findMany({
            where: {
                title_id: id,
            },
            select: {
                genre: true
            }
        })
        return genres.map(el => DTOMapper.toResponse(el.genre, GenresResponseDTO))

    }

    async getTitleCredits(
        id: string,
        job?: string,
        page: number = 1,
        limit: number = 20,
        orderBy: "job" | "created_at" = "job",
        order: "asc" | "desc" = "asc"
    ) {
        const where: Prisma.CreditWhereInput = {
            title_id: id,
        };

        if (job?.trim()) {
            where.job = {
                equals: job.trim(),
                mode: "insensitive",
            };
        }

        const skip = (page - 1) * limit;

        const [credits, total] = await Promise.all([
            this.Repo.credit.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    [orderBy]: order,
                },
                select: {
                    job: true,
                    person: {
                        select: {
                            id: true,
                            name: true,
                            profile_path: true,
                        },
                    },
                },
            }),

            this.Repo.credit.count({ where }),
        ]);
        return {
            data: credits,
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

    async upsertTitle(mapped) {
        const { genre_ids, ...data } = mapped;

        const title = await this.Repo.title.upsert({
            where: {
                tmdb_id_media_type: {
                    tmdb_id: data.tmdb_id,
                    media_type: data.media_type,
                },
            },
            create: data,
            update: data,
        });

        return title;
    }

    async getTitleImages(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.TitleImageWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [images, total] = await Promise.all([
            this.Repo.titleImage.findMany({
                where,
                skip,
                take: Number(limit),
            }),
            this.Repo.titleImage.count({ where }),
        ]);
        return {
            data: images.map(el=>DTOMapper.toResponse(el,ImageAssetDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

  async getTitleVidoes(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.TitleVideoWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [videos, total] = await Promise.all([
            this.Repo.titleVideo.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy:{
                    ["published_at"]:"desc"
                }
            }),
            this.Repo.titleVideo.count({ where }),
        ]);
        return {
            data: videos.map(el=>DTOMapper.toResponse(el,VideoAssetDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

    async getTitleReviews(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.ReviewWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [videos, total] = await Promise.all([
            this.Repo.review.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy:{
                    ["createdAt"]:"desc"
                }
            }),
            this.Repo.review.count({ where }),
        ]);
        return {
            data: videos.map(el=>DTOMapper.toResponse(el,ReviewResponseDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }
}   
