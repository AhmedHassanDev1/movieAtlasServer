import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationHelper {
  getPagination(page = 1, limit = 20) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    const skip = (safePage - 1) * safeLimit;

    return {
      skip,
      take: safeLimit,
      page: safePage,
      limit: safeLimit,
    };
  }

  buildMeta(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page:Number(page),
      limit:Number(limit),
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}