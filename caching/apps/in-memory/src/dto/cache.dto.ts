import { ApiProperty } from "@nestjs/swagger";

export class CacheDto {
  @ApiProperty({ example: "key" })
  key: string;

  @ApiProperty({ example: "value" })
  value: string;
}
