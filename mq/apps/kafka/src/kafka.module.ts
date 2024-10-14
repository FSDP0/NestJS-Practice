import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { randomUUID } from "crypto";

import { KafkaController } from "./controller/kafka.controller";
import { KafkaMessageController } from "./controller/kafka.message.controller";
import { KafkaService } from "./service/kafka.service";
import { KAFKA_CONSTANTS } from "./constants/kafka.constants";

const {
  CLIENT: { KAFKA_BROKERS },
  CONSUMER: { KAFKA_CONSUMER_GROUP_ID }
} = KAFKA_CONSTANTS;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SVC",
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
      }
    ])
  ],
  controllers: [KafkaController, KafkaMessageController],
  providers: [KafkaService]
})
export class KafkaModule {}
