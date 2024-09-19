import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BasicHttpService } from "../service/basic-http.service";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  PickType
} from "@nestjs/swagger";
import { SortEnum, SortTypes } from "../enum/sort.enum";
import { UserSaveDto } from "../dto/user-save.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { UserReadDto } from "../dto/user-read.dto";
import { AdditionalUserInfo } from "../dto/user.dto";

@ApiTags("[001]. Basic HTTP User REST API")
@Controller("users")
export class BasicHttpController {
  constructor(private readonly basicHttpService: BasicHttpService) {}

  @ApiOperation({ summary: "모든 사용자 검색" })
  @ApiQuery({ name: "limit", type: Number, required: false })
  @ApiQuery({
    name: "sort",
    enum: SortEnum,
    required: false
  })
  @ApiOkResponse({ type: UserReadDto, isArray: true })
  @Get()
  public async getAllUser(@Query("limit") limit: number, @Query("sort") sort: SortTypes) {
    return await this.basicHttpService.findAllUser(limit, sort);
  }

  @ApiOperation({ summary: "특정 사용자 조회" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ type: UserReadDto })
  @Get(":id")
  public async getUser(@Param("id") id: number) {
    return await this.basicHttpService.findUserById(id);
  }

  @ApiOperation({ summary: "새로운 사용자 정보 등록" })
  @ApiCreatedResponse({ status: "2XX", type: PickType(UserReadDto, ["id"] as const) })
  @Post()
  public async createUser(@Body() dto: UserSaveDto) {
    return await this.basicHttpService.saveUser(dto);
  }

  @ApiOperation({ summary: "기존 사용자 정보 갱신" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ type: AdditionalUserInfo })
  @Put(":id")
  public async editUser(@Param("id") id: number, @Body() dto: UserUpdateDto) {
    return await this.basicHttpService.updateUser(id, dto);
  }

  @ApiOperation({ summary: "기존 사용자 정보 삭제" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ type: UserReadDto })
  @Delete(":id")
  public async removeUser(@Param("id") id: number) {
    return await this.basicHttpService.deleteUser(id);
  }
}
