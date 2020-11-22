import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { CsvParser } from "nest-csv-parser";

@Module({
  controllers: [DataController],
  providers: [DataService, CsvParser]
})
export class DataModule {}
