import { ApiProperty } from "@nestjs/swagger";

export class SignInReponseDto {
  @ApiProperty()
  token: string;
}
