import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { RedisStoreService } from "../service/redis-store.service";
import { CacheDto } from "../dto/cache.dto";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("[001] Redis Store Caching")
@Controller("redis-cache")
export class RedisStoreController {
  constructor(private readonly redisStoreService: RedisStoreService) {}

  @ApiOperation({ summary: "특정 캐시 값 조회" })
  @ApiQuery({ name: "key", example: "key", type: String, required: true })
  @Get()
  public async getCache(@Query("key") key: string) {
    return this.redisStoreService.getRedisCache(key);
  }

  @ApiOperation({ summary: "모든 키 조회" })
  @Get("keys")
  public async getCacheKeys() {
    return await this.redisStoreService.getRedisCacheKeys();
  }

  @ApiOperation({ summary: "신규 캐시 생성" })
  @Post()
  public async setCache(@Body() dto: CacheDto) {
    return await this.redisStoreService.setRedisCache(dto);
  }

  @ApiOperation({ summary: "특정 캐시 삭제" })
  @ApiQuery({ name: "key", example: "key", type: String, required: false })
  @Delete()
  public async removeCache(@Query("key") key: string) {
    return await this.redisStoreService.deleteRedisCache(key);
  }

  @ApiOperation({ summary: "캐시 초기화" })
  @Delete("reset")
  public async resetCache() {
    return await this.redisStoreService.resetRedisCache();
  }
}
