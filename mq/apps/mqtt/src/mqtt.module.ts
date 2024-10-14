import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MqttController } from "./controller/mqtt.controller";
import { MqttMessageController } from "./controller/mqtt.message.controller";
import { MqttService } from "./services/mqtt.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MQTT_SVC",
        transport: Transport.MQTT,
        options: {
          hostname: "localhost",
          port: 1883
        }
      }
    ])
  ],
  controllers: [MqttController, MqttMessageController],
  providers: [MqttService]
})
export class MqttModule {}
