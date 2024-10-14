import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientMqtt } from "@nestjs/microservices";

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject("MQTT_SVC") private readonly mqttClient: ClientMqtt) {}

  sum(values: number[]) {
    this.mqttClient.send("sum", { values }).subscribe();
  }

  min(values: number[]) {
    this.mqttClient.send("min", { values }).subscribe();
  }

  max(values: number[]) {
    this.mqttClient.send("max", { values }).subscribe();
  }

  async onModuleInit() {
    await this.mqttClient.connect();
  }

  onModuleDestroy() {
    this.mqttClient.close();
  }
}
