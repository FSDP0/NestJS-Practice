import { Controller, Inject, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientMqtt, MessagePattern, Payload } from "@nestjs/microservices";
import { MqttPayload } from "../interfaces/mqtt.payload";

@Controller()
export class MqttMessageController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttMessageController.name);

  constructor(@Inject("MQTT_SVC") private readonly mqttClient: ClientMqtt) {}

  @MessagePattern("sum")
  public sum(@Payload() numbers: MqttPayload) {
    const value = numbers.values.reduce((a, b) => a + b);

    this.logger.log(`Summation : ${value}`);
  }

  @MessagePattern("min")
  public min(@Payload() numbers: MqttPayload) {
    const value = Math.min(...numbers.values);

    this.logger.log(`Minimum : ${value}`);
  }

  @MessagePattern("max")
  public max(@Payload() numbers: MqttPayload) {
    const value = Math.max(...numbers.values);

    this.logger.log(`Maximum : ${value}`);
  }

  async onModuleDestroy() {
    await this.mqttClient.connect();
  }

  onModuleInit() {
    this.mqttClient.close();
  }
}
