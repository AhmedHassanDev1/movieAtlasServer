import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TitleModule } from './title/title.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { minutes, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenGuard } from './shared/guard/RefreshTokenGuard.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_Access_expire } from './shared/constants/config/config';
import { AccessTokenGuard } from './shared/guard/JwtAuthGuard.guard';
import { DiscoverModule } from './discover/discover.module';
import { ReviewModule } from './review/review.module';
import { SearchModule } from './search/search.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ORIGIN: Joi.string().required(),
        CACHE_TTL: Joi.number().default(3600),
        CACHE_MAX_SIZE: Joi.number().default(1000),
      }),
    }),
    ScheduleModule.forRoot(),
 
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [{
          ttl: minutes(config.get<number>("TTL") as number),
          limit: config.get<number>("LIMIT") as number
        }]

      })
    }),
    AuthModule,
    TitleModule,
    UserModule,
    DiscoverModule,
    ReviewModule,
    SearchModule],
  controllers: [],
  providers: [
    JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AppModule { }
