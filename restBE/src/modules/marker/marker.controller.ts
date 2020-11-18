import { Controller, Get, Req, Res } from '@nestjs/common';
import { MarkerService } from "./marker.service";

@Controller('marker')
export class MarkerController {
  constructor(
    private markerService: MarkerService
  ) {
  }

  @Get('/')
  getAll() {
    return this.markerService.getDataFromCsv();
  }

  @Get('/meta/:path/:id')
  getMetaData(@Req() request) {
    return this.markerService.getMetaData(request.params.path, request.params.id);
  }
}
