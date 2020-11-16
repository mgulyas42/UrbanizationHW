import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './modules/example/example.module';
import { MarkerModule } from "./modules/marker/marker.module";
import { UploadModule } from "./modules/upload/upload.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ExampleModule, MarkerModule, UploadModule, MongooseModule.forRoot('mongodb://test:test@localhost:27017/testDB?authSource=admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
