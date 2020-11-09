import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './modules/example/example.module';
import { MarkerModule } from "./modules/marker/marker.module";

@Module({
  imports: [ExampleModule, MarkerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
