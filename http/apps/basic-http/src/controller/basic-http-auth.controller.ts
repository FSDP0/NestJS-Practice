import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BasicHttpAuthService } from "../service/basic-http-auth.service";
import { SignInRequestDto } from "../dto/sign-in-request.dto";
import { SignInReponseDto } from "../dto/sign-in-response.dto";

@ApiTags("[002]. Basic HTTP Auth REST API")
@Controller("auth")
export class BasicHttpAuthController {
  constructor(private readonly basicHttpAuthService: BasicHttpAuthService) {}

  @ApiOperation({ summary: "사용자 로그인" })
  @ApiResponse({ status: "2XX", type: SignInReponseDto })
  @Post("login")
  public async login(@Body() dto: SignInRequestDto) {
    return await this.basicHttpAuthService.signIn(dto);
  }
}
