
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { CacheService } from '../services/cache.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(process.env.CACHE_URL as string);
      },
    },
    CacheService,
  ],
  exports: ["REDIS_CLIENT",CacheService],
})
export class RedisModule {}