import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { CacheDto } from "../dto/cache.dto";

@Injectable()
export class RedisStoreService {
  private readonly logger = new Logger(RedisStoreService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async getRedisCache(key: string) {
    const value = await this.cacheManager.get<string>(key);

    if (value === undefined) {
      throw new BadRequestException("값을 찾을 수 없습니다.");
    }

    return value;
  }

  public async getRedisCacheKeys() {
    const keys = await this.cacheManager.store.keys();

    return keys;
  }

  public async resetRedisCache() {
    await this.cacheManager.store.reset().then(() => {
      this.logger.log(`Redis Cache가 성공적으로 초기화 되었습니다.`);
    });
  }

  public async setRedisCache(dto: CacheDto) {
    await this.cacheManager.store
      .set(dto.key, dto.value)
      .then(() => this.logger.log(`Redis Cache가 생성되었습니다, KEY : ${dto.key}`))
      .catch(() => {
        throw new InternalServerErrorException("Redis Cache 생성 중 오류가 발생했습니다.");
      });
  }

  public async setRedisCacheWithTTL(dto: CacheDto, ttl: number) {
    await this.cacheManager.store
      .set(dto.key, dto.value, ttl * 1000)
      .then(() => this.logger.log(`Redis Cache가 생성되었습니다, KEY : ${dto.key}, TTL : ${ttl}`))
      .catch(() => {
        throw new InternalServerErrorException("Redis Cache 생성 중 오류가 발생했습니다.");
      });
  }

  public async deleteRedisCache(key: string) {
    await this.cacheManager.store
      .del(key)
      .then(() => {
        this.logger.log(`Redis Cache가 삭제되었습니다, KEY : ${key}`);
      })
      .catch(() => {
        throw new InternalServerErrorException("Redis Cache 삭제 중 오류가 발생했습니다.");
      });
  }
}
