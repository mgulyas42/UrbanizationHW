import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private service: ExampleService) {}

  @Get('ezegyalma')
  getString() {
    return this.service.getString();
  }
}
