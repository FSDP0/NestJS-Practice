import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { SortTypes } from "../enum/sort.enum";
import { UserReadDto } from "../dto/user-read.dto";
import { UserSaveDto } from "../dto/user-save.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { AdditionalUserInfo } from "../dto/user.dto";

@Injectable()
export class BasicHttpService {
  private readonly logger = new Logger(BasicHttpService.name);

  constructor(private readonly httpService: HttpService) {}

  public async findAllUser(limit?: number, sort?: SortTypes) {
    const { data } = await firstValueFrom(
      this.httpService.get<UserReadDto[]>("users", { params: { limit, sort } }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findUserById(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<UserReadDto>(`users/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async saveUser(dto: UserSaveDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<AdditionalUserInfo>(`users`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async updateUser(id: number, dto: UserUpdateDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<UserReadDto>(`users/${id}`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async deleteUser(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete<UserReadDto>(`users/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }
}
