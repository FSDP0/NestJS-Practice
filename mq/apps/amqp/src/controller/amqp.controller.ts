import { Body, Controller, Post } from "@nestjs/common";
import { AmqpService } from "../services/amqp.service";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("[0001]. AMQP Test REST API")
@Controller("amqp")
export class AmqpController {
  constructor(private readonly amqpService: AmqpService) {}

  @ApiOperation({ summary: "summation" })
  @ApiBody({ type: [Number] })
  @Post("sum")
  public sum(@Body() numbers: number[]) {
    this.amqpService.sum(numbers);
  }

  @ApiOperation({ summary: "minimum" })
  @ApiBody({ type: [Number] })
  @Post("min")
  public min(@Body() numbers: number[]) {
    this.amqpService.min(numbers);
  }

  @ApiOperation({ summary: "maximum" })
  @ApiBody({ type: [Number] })
  @Post("max")
  public max(@Body() numbers: number[]) {
    this.amqpService.max(numbers);
  }
}
