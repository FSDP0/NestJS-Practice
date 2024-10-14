import { NestFactory } from "@nestjs/core";
import { MqttModule } from "./mqtt.module";
import { VersioningType } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(MqttModule);

  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      hostname: "localhost",
      port: 1883
    }
  });

  const conf = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("MQTT Module Usage Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, conf);

  SwaggerModule.setup("api", app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
