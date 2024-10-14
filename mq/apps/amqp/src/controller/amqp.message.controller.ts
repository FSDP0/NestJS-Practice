import { Controller, Inject, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientRMQ, Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { AmqpPayload } from "../interfaces/amqp.payload";

@Controller()
export class AmqpMessageController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AmqpMessageController.name);

  constructor(@Inject("AMQP_SVC") private readonly amqpClient: ClientRMQ) {}

  @MessagePattern("sum")
  public sum(@Payload() data: AmqpPayload, @Ctx() context: RmqContext) {
    const val = data.values.reduce((a, b) => a + b);

    this.logger.log(`Summation : ${val}`);
  }

  @MessagePattern("min")
  public min(@Payload() data: AmqpPayload, @Ctx() context: RmqContext) {
    const val = Math.min(...data.values);

    this.logger.log(`Minimum : ${val}`);
  }

  @MessagePattern("max")
  public max(@Payload() data: AmqpPayload, @Ctx() context: RmqContext) {
    const val = Math.max(...data.values);

    this.logger.log(`Maximum : ${val}`);
  }

  async onModuleInit() {
    await this.amqpClient.connect();
  }

  onModuleDestroy() {
    this.amqpClient.close();
  }
}
