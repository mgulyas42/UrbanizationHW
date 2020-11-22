import { Controller, Get, Req } from '@nestjs/common';
import { DataService } from "./data.service";

@Controller('data')
export class DataController {
  constructor(
    private dataService: DataService
  ) {
  }

  @Get('/')
  getAll() {
    return this.dataService.getDataFromCsvs();
  }

  @Get('/meta/:path/:id')
  getMetaData(@Req() request) {
    return this.dataService.getMetaData(request.params.path, request.params.id);
  }
}
