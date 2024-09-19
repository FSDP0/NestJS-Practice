import { Module } from "@nestjs/common";
import { BoardHttpModule } from "../common/board-http.module";
import { PostController } from "./controller/post.controller";
import { PostService } from "./service/post.service";

@Module({
  imports: [BoardHttpModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
