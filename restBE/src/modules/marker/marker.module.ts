import { Module } from '@nestjs/common';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';
import { CsvModule } from "nest-csv-parser";

@Module({
  imports: [CsvModule],
  controllers: [MarkerController],
  providers: [MarkerService]
})
export class MarkerModule {}
