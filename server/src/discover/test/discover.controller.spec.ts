import { Test, TestingModule } from '@nestjs/testing';
import { DiscoverController } from '../discover.controller';
import { DiscoverAsyncService } from '../services/DiscoverSync.service';
import { DiscoverService } from '../services/discover.service';

describe('DiscoverController', () => {
  let controller: DiscoverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscoverController],
      providers: [
        {
          provide: DiscoverService,
          useValue: {
            getMovieList: jest.fn(),
          },
        },
        {
          provide: DiscoverAsyncService,
          useValue: {
            syncMovieDiscoverLists: jest.fn(),
            syncMovieList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DiscoverController>(DiscoverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
