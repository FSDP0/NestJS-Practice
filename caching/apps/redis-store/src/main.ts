import { NestApplication, NestFactory } from "@nestjs/core";
import { RedisStoreModule } from "./redis-store.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger(NestApplication.name);

  const app = await NestFactory.create(RedisStoreModule);

  const config = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("Redis Caching Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  const PORT = 3000;

  await app.listen(PORT, () => logger.log(`Serve ${PORT}`));
}
bootstrap();
