import { NestApplication, NestFactory } from "@nestjs/core";
import { InMemoryModule } from "./in-memory.module";
import { Logger, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger(NestApplication.name);

  const app = await NestFactory.create(InMemoryModule);

  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  const config = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("In-Memory Caching Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  const PORT = 3000;

  await app.listen(PORT, () => logger.log(`===== NestJS Serve ${PORT}`));
}
bootstrap();
