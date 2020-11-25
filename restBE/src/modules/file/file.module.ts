import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { DataModule } from "../data/data.module";

@Module({
  imports: [DataModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
