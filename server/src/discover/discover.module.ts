import { Module } from '@nestjs/common';
import { DiscoverService } from './services/discover.service';
import { DiscoverController } from './discover.controller';
import { TmdbService } from './services/tmdb-discover.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { HttpModule } from "@nestjs/axios"
import { DiscoverAsyncService } from './services/DiscoverSync.service';
import { TitleModule } from 'src/title/title.module';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { DiscoverCron } from './jobs/discover.cron';
@Module({
  imports: [
    HttpModule,
    TitleModule
  ],
  controllers: [DiscoverController],
  providers: [
    DiscoverService,
    TmdbService,
    DiscoverAsyncService,
    DiscoverCron,
    PrismaService,
    PaginationHelper
  ],
})
export class DiscoverModule { }
