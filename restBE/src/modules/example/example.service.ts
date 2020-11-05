import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  getString(): string {
    return 'almafa';
  }

}
