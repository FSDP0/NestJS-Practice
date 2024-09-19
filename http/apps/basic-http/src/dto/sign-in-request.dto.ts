import { ApiProperty } from "@nestjs/swagger";

export class SignInRequestDto {
  @ApiProperty({ example: "mor_2314" })
  username: string;

  @ApiProperty({ example: "83r5^_" })
  password: string;
}
