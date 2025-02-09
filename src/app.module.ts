import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurds/jwt-auth.guard';
import { TextModule } from './text/text.module';

import { AnalyzerModule } from './analyzer/analyzer.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'), // Get MongoDB URI from config
        onConnectionCreate(connection) {
          const url = configService.get<string>('database.url');
          console.log(`Connected to MongoDB: ${url}`);

          console.log(`Connection created: ${connection.id}`);
        },
        autoIndex: true,
        retryDelay: 500,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async () => {
        return {
          stores: [createKeyv('redis://localhost:6379')],
        };
      },
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1,
      },
    ]),
    AuthModule,
    TextModule,
    AnalyzerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Register AuthGuard globally
    },
  ],
})
export class AppModule {}
