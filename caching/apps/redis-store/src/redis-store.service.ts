import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisStoreService {
  getHello(): string {
    return 'Hello World!';
  }
}
