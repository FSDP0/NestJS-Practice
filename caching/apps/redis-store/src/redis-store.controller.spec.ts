import { Test, TestingModule } from '@nestjs/testing';
import { RedisStoreController } from './redis-store.controller';
import { RedisStoreService } from './redis-store.service';

describe('RedisStoreController', () => {
  let redisStoreController: RedisStoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RedisStoreController],
      providers: [RedisStoreService],
    }).compile();

    redisStoreController = app.get<RedisStoreController>(RedisStoreController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(redisStoreController.getHello()).toBe('Hello World!');
    });
  });
});
