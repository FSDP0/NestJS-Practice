import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

import { KafkaService } from "../service/kafka.service";

@ApiTags("[0001]. Kafka Test REST API")
@Controller("kafka")
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @ApiOperation({ summary: "summation" })
  @ApiBody({ type: [Number] })
  @Post("sum")
  public sum(@Body() numbers: number[]) {
    this.kafkaService.sum(numbers);
  }

  @ApiOperation({ summary: "minimum" })
  @ApiBody({ type: [Number] })
  @Post("min")
  public min(@Body() numbers: number[]) {
    this.kafkaService.min(numbers);
  }

  @ApiOperation({ summary: "maximum" })
  @ApiBody({ type: [Number] })
  @Post("max")
  public max(@Body() numbers: number[]) {
    this.kafkaService.max(numbers);
  }
}
