import { Controller, Inject, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";

import { KafkaPayload } from "../interfaces/kafka.payload";

@Controller()
export class KafkaMessageController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaMessageController.name);

  constructor(@Inject("KAFKA_SVC") private readonly kafkaClient: ClientKafka) {}

  @MessagePattern("sum")
  public sum(@Payload() data: KafkaPayload) {
    const val = data.values.reduce((a, b) => a + b);

    this.logger.log(`Summation : ${val}`);
  }

  @MessagePattern("min")
  public min(@Payload() data: KafkaPayload) {
    const val = Math.min(...data.values);

    this.logger.log(`Minimum : ${val}`);
  }

  @MessagePattern("max")
  public max(@Payload() data: KafkaPayload) {
    const val = Math.max(...data.values);

    this.logger.log(`Maximum : ${val}`);
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }
}
