import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { BoardHttpService } from "../../common/service/board-http.service";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { PostUpdateDto } from "../dto/post-update.dto";
import { PostReadDto } from "../dto/post-read.dto";
import { PostSaveDto } from "../dto/post-save.dto";
import { PostCommentReadDto } from "../dto/post-comment-read.dto";

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly httpService: BoardHttpService) {}

  public async findAllPost(userId?: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<PostReadDto[]>(`posts`, { params: { userId } }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findPostById(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<PostReadDto>(`posts/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findCommentsWithInPost(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<PostCommentReadDto[]>(`posts/${id}/comments`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async savePost(dto: PostSaveDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<PostReadDto>(`posts`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async updatePost(dto: PostUpdateDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<PostReadDto>(`posts/${dto.id}`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async deletePost(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`posts/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }
}
