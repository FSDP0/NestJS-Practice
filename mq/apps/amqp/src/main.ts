import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AmqpModule } from "./amqp.module";
import { RMQ_CONSTANTS } from "./constants/amqp.constant";

const { RMQ_USERNAME, RMQ_PASSWORD, RMQ_HOSTNAME, RMQ_PORT, RMQ_QUEUE } = RMQ_CONSTANTS;

async function bootstrap() {
  const app = await NestFactory.create(AmqpModule);

  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RMQ_USERNAME}:${RMQ_PASSWORD}@${RMQ_HOSTNAME}:${RMQ_PORT}`],
      queue: RMQ_QUEUE
    }
  });

  const conf = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("AMQP Module Usage Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, conf);

  SwaggerModule.setup("api", app, document);

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
