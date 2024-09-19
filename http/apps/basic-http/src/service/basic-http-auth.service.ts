import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { SignInRequestDto } from "../dto/sign-in-request.dto";
import { SignInReponseDto } from "../dto/sign-in-response.dto";

@Injectable()
export class BasicHttpAuthService {
  private readonly logger = new Logger(BasicHttpAuthService.name);

  constructor(private readonly httpService: HttpService) {}

  public async signIn(dto: SignInRequestDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<SignInReponseDto>(`auth/login`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }
}
