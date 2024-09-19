import { Controller, Get } from '@nestjs/common';
import { RedisStoreService } from './redis-store.service';

@Controller()
export class RedisStoreController {
  constructor(private readonly redisStoreService: RedisStoreService) {}

  @Get()
  getHello(): string {
    return this.redisStoreService.getHello();
  }
}
