import { NestFactory } from "@nestjs/core";
import { randomUUID } from "crypto";
import { VersioningType } from "@nestjs/common";
import { KafkaOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { KafkaModule } from "./kafka.module";
import { KAFKA_CONSTANTS } from "./constants/kafka.constants";

const {
  CLIENT: { KAFKA_BROKERS },
  CONSUMER: { KAFKA_CONSUMER_GROUP_ID }
} = KAFKA_CONSTANTS;

async function bootstrap() {
  const app = await NestFactory.create(KafkaModule);

  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `client-${randomUUID()}`,
        brokers: KAFKA_BROKERS
      },
      consumer: {
        groupId: KAFKA_CONSUMER_GROUP_ID
      }
    }
  });

  const conf = new DocumentBuilder()
    .setTitle("NestJS Practice")
    .setDescription("Kafka Module Usage Example")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, conf);

  SwaggerModule.setup("api", app, document);

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
