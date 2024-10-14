import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AmqpController } from "./controller/amqp.controller";
import { AmqpService } from "./services/amqp.service";
import { AmqpMessageController } from "./controller/amqp.message.controller";

import { RMQ_CONSTANTS } from "./constants/amqp.constant";

const { RMQ_USERNAME, RMQ_PASSWORD, RMQ_HOSTNAME, RMQ_PORT, RMQ_QUEUE } = RMQ_CONSTANTS;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AMQP_SVC",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${RMQ_USERNAME}:${RMQ_PASSWORD}@${RMQ_HOSTNAME}:${RMQ_PORT}`],
          queue: RMQ_QUEUE
        }
      }
    ])
  ],
  controllers: [AmqpController, AmqpMessageController],
  providers: [AmqpService]
})
export class AmqpModule {}
