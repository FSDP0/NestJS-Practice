import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject("KAFKA_SVC") private readonly kafkaClient: ClientKafka) {}

  public sum(values: number[]) {
    this.kafkaClient.send("sum", { values }).subscribe();
  }

  public min(values: number[]) {
    this.kafkaClient.send("min", { values }).subscribe();
  }

  public max(values: number[]) {
    this.kafkaClient.send("max", { values }).subscribe();
  }

  async onModuleInit() {
    const topics = ["sum", "min", "max"];

    topics.forEach((topic) => this.kafkaClient.subscribeToResponseOf(topic));

    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }
}
