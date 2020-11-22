import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FileModule } from "./modules/file/file.module";
import { DataModule } from "./modules/data/data.module";

@Module({
  imports: [
    FileModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
