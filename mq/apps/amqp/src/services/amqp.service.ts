import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";

@Injectable()
export class AmqpService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject("AMQP_SVC") private readonly amqpClient: ClientRMQ) {}

  public async sum(values: number[]) {
    this.amqpClient.emit("sum", { values });
  }

  public async min(values: number[]) {
    this.amqpClient.emit("min", { values });
  }

  public async max(values: number[]) {
    this.amqpClient.emit("max", { values });
  }

  async onModuleInit() {
    await this.amqpClient.connect();
  }

  onModuleDestroy() {
    this.amqpClient.close();
  }
}
