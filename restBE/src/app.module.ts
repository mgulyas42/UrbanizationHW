import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FileModule } from "./modules/file/file.module";
import { DataModule } from "./modules/data/data.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
  imports: [
    FileModule,
    DataModule,
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
