import { Controller, Get } from '@nestjs/common';
import { MarkerService } from "./marker.service";

@Controller('marker')
export class MarkerController {
    constructor(
        private markerService: MarkerService
    ) {}

    @Get()
    getAll() {
        return this.markerService.getDataFromCsv();
    }
}
