import { Injectable } from '@nestjs/common';
import { DiscoverType, Prisma } from '@prisma/client';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TitleEntity } from 'src/title/dto/Title-response.dto';

@Injectable()
export class DiscoverService {
    constructor(
        private readonly repo: PrismaService,
        private readonly paginationHelper: PaginationHelper,
    ) { }

    async getMovieList(
        type: DiscoverType,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.DiscoverItemWhereInput = { type };
        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            this.repo.discoverItem.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    rank: "asc",
                },
                include: {
                    title: true,
                },
            }),
            this.repo.discoverItem.count({ where }),
        ]);

        return {
            data: items.map((item) => ({
                rank: item.rank,
                title: DTOMapper.toResponse(item.title, TitleEntity),
            })),
            meta: this.paginationHelper.buildMeta(total, Number(page), Number(limit)),
        };
    }
}
