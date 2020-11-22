import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MarkerModule } from "./modules/marker/marker.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
  imports: [
    MarkerModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
