import { NestFactory } from '@nestjs/core';
import { RedisStoreModule } from './redis-store.module';

async function bootstrap() {
  const app = await NestFactory.create(RedisStoreModule);
  await app.listen(3000);
}
bootstrap();
