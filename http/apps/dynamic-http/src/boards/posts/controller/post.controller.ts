import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PostService } from "../service/post.service";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { PostSaveDto } from "../dto/post-save.dto";
import { PostUpdateDto } from "../dto/post-update.dto";
import { PostReadDto } from "../dto/post-read.dto";
import { PostCommentReadDto } from "../dto/post-comment-read.dto";

@ApiTags("[003]. Board EndPoint, Posts REST API")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "모든 게시글 조회" })
  @ApiQuery({ name: "userId", type: Number, required: false })
  @ApiOkResponse({ type: PostReadDto, isArray: true })
  @Get()
  public async getAll(@Query("userId") userId: number) {
    return await this.postService.findAllPost(userId);
  }

  @ApiOperation({ summary: "특정 게시글 조회" })
  @ApiOkResponse({ type: PostReadDto })
  @Get(":id")
  public async getOne(@Param("id") id: number) {
    return await this.postService.findPostById(id);
  }

  @ApiOperation({ summary: "특정 게시글 내 답변 글 조회" })
  @ApiOkResponse({ type: PostCommentReadDto, isArray: true })
  @Get(":id/comments")
  public async getCommentsWithInPost(@Param("id") id: number) {
    return await this.postService.findCommentsWithInPost(id);
  }

  @ApiOperation({ summary: "새로운 게시글 정보 등록" })
  @ApiCreatedResponse({ type: PostReadDto })
  @Post()
  public async createPost(@Body() dto: PostSaveDto) {
    return await this.postService.savePost(dto);
  }

  @ApiOperation({ summary: "기존 게시글 정보 갱신" })
  @ApiOkResponse({ type: PostReadDto })
  @Put(":id")
  public async editPost(@Body() dto: PostUpdateDto) {
    return await this.postService.updatePost(dto);
  }

  @ApiOperation({ summary: "기존 게시글 정보 삭제" })
  @ApiOkResponse({ type: Object })
  @Delete(":id")
  public async removePost(@Param("id") id: number) {
    return await this.postService.deletePost(id);
  }
}
