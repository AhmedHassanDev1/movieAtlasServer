import { BadRequestException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DiscoverType } from '@prisma/client';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { DiscoverService } from './services/discover.service';
import { ACTIVE_MOVIE_DISCOVER_TYPES, DiscoverAsyncService } from './services/DiscoverSync.service';

type DiscoverListParam = "trending" | "popular" | "top-rated" | "now-playing" | "upcoming";

const DISCOVER_ROUTE_TYPES: Record<DiscoverListParam, DiscoverType> = {
  "trending": DiscoverType.TRENDING,
  "popular": DiscoverType.POPULAR,
  "top-rated": DiscoverType.TOP_RATED,
  "now-playing": DiscoverType.NOW_PLAYING,
  "upcoming": DiscoverType.UPCOMING,
};

@Controller('discover')
export class DiscoverController {
  constructor(
    private readonly discoverService: DiscoverService,
    private readonly async: DiscoverAsyncService,

  ) {}

  @Public()
  @Get("/:list")
  async getMovieList(
    @Param("list") list: DiscoverListParam,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    const type = DISCOVER_ROUTE_TYPES[list];
    if (!type) throw new BadRequestException("Unsupported discover list.");

    return this.discoverService.getMovieList(type, Number(page), Number(limit));
  }

  @Post("/sync")
  async syncMovieLists() {
    return this.async.syncMovieDiscoverLists();
  }

  @Post("/sync/:list")
  async syncMovieList(@Param("list") list: DiscoverListParam) {
    const type = DISCOVER_ROUTE_TYPES[list];
    if (!type || !ACTIVE_MOVIE_DISCOVER_TYPES.includes(type)) {
      throw new BadRequestException("Unsupported discover list.");
    }

    return this.async.syncMovieList(type);
  }
}
