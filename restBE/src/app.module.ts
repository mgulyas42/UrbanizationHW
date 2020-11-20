import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { MarkerModule } from "./modules/marker/marker.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
  imports: [
    MarkerModule,
    UploadModule,
    //MongooseModule.forRoot('mongodb://test:test@localhost:27017/testDB?authSource=admin')
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
