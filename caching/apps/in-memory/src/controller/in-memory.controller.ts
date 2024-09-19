import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { InMemoryService } from "../service/in-memory.service";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CacheDto } from "../dto/cache.dto";

@ApiTags("[001]. In-Memory Caching")
@Controller("in-memory")
export class InMemoryController {
  constructor(private readonly inMemoryService: InMemoryService) {}

  @ApiOperation({ summary: "특정 캐시 값 조회" })
  @ApiQuery({ name: "key", example: "key", type: String, required: true })
  @Get()
  public async getCache(@Query("key") key: string) {
    return await this.inMemoryService.getInMemoryCache(key);
  }

  @ApiOperation({ summary: "모든 키 조회" })
  @Get("keys")
  public async getCacheKeys() {
    return await this.inMemoryService.getInMemoryCacheKeys();
  }

  @ApiOperation({ summary: "신규 캐시 생성" })
  @ApiQuery({ name: "ttl", type: Number, description: "TTL Sec.", required: false })
  @Post()
  public async setCache(@Query("ttl") ttl: number, @Body() dto: CacheDto) {
    if (ttl !== undefined) {
      await this.inMemoryService.setInMemoryCacheWithTTL(dto, ttl);
    } else {
      await this.inMemoryService.setInMemoryCache(dto);
    }
  }

  @ApiOperation({ summary: "특정 캐시 삭제" })
  @ApiQuery({ name: "key", example: "key", type: String, required: true })
  @Delete()
  public async removeCache(@Query("key") key: string) {
    await this.inMemoryService.deleteInMemoryCache(key);
  }

  @ApiOperation({ summary: "캐시 초기화" })
  @Delete("reset")
  public async resetCaches() {
    return await this.inMemoryService.resetInMemoryCache();
  }
}
