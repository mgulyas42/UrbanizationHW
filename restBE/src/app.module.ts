import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FileModule } from "./modules/file/file.module";
import { DataModule } from "./modules/data/data.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
  imports: [
    FileModule,
    DataModule,
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('');
  }
}
