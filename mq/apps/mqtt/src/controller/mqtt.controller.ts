import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

import { MqttService } from "../services/mqtt.service";

@ApiTags("[0001]. MQTT Test REST API")
@Controller("mqtt")
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @ApiOperation({ summary: "summation" })
  @ApiBody({ type: [Number] })
  @Post("sum")
  public sum(@Body() numbers: number[]) {
    this.mqttService.sum(numbers);
  }

  @ApiOperation({ summary: "minimum" })
  @ApiBody({ type: [Number] })
  @Post("min")
  public min(@Body() numbers: number[]) {
    this.mqttService.min(numbers);
  }

  @ApiOperation({ summary: "maximum" })
  @ApiBody({ type: [Number] })
  @Post("max")
  public max(@Body() numbers: number[]) {
    this.mqttService.max(numbers);
  }
}
