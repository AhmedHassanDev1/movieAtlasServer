import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

@Module({
  controllers: [TitleController],
  providers: [TitleService,PrismaService,PaginationHelper],
  exports:[TitleService]
})
export class TitleModule {}
