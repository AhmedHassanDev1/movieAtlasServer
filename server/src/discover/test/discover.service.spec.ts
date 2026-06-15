import { Test, TestingModule } from '@nestjs/testing';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { DiscoverService } from '../services/discover.service';

describe('DiscoverService', () => {
  let service: DiscoverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscoverService,
        {
          provide: PrismaService,
          useValue: {
            discoverItem: {
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
        {
          provide: PaginationHelper,
          useValue: {
            buildMeta: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DiscoverService>(DiscoverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
