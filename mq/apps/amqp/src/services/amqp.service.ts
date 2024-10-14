import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";

@Injectable()
export class AmqpService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject("AMQP_SVC") private readonly amqpClient: ClientRMQ) {}

  public async sum(values: number[]) {
    this.amqpClient.send("sum", { values }).subscribe();
  }

  public async min(values: number[]) {
    this.amqpClient.send("min", { values }).subscribe();
  }

  public async max(values: number[]) {
    this.amqpClient.send("max", { values }).subscribe();
  }

  async onModuleInit() {
    await this.amqpClient.connect();
  }

  async onModuleDestroy() {
    this.amqpClient.close();
  }
}
