import { NestFactory } from "@nestjs/core";
import { DynamicHttpModule } from "./dynamic-http.module";
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(DynamicHttpModule);

  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  const conf = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("Dynamic Http Module Usage Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, conf);

  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
