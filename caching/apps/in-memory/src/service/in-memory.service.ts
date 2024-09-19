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
export class InMemoryService {
  private readonly logger = new Logger(InMemoryService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async getInMemoryCache(key: string) {
    const value = await this.cacheManager.get<string>(key);

    if (value === undefined) {
      throw new BadRequestException("값을 찾을 수 없습니다.");
    }

    return value;
  }

  public async getInMemoryCacheKeys() {
    const keys = await this.cacheManager.store.keys();

    return keys;
  }

  public async resetInMemoryCache() {
    await this.cacheManager.reset().then(() => {
      this.logger.log(`In Memory Cache가 초기화 되었습니다.`);
    });
  }

  public async setInMemoryCache(dto: CacheDto) {
    await this.cacheManager
      .set(dto.key, dto.value)
      .then(() => this.logger.log(`In Memory Cache가 생성되었습니다, KEY : ${dto.key}`))
      .catch(() => {
        throw new InternalServerErrorException("In Memory Cache 생성 중 오류가 발생했습니다.");
      });
  }

  public async setInMemoryCacheWithTTL(dto: CacheDto, ttl: number) {
    await this.cacheManager
      .set(dto.key, dto.value, ttl * 1000)
      .then(() =>
        this.logger.log(`In Memory Cache가 생성되었습니다, KEY : ${dto.key}, TTL : ${ttl}`)
      )
      .catch(() => {
        throw new InternalServerErrorException("In Memory Cache 생성 중 오류가 발생했습니다.");
      });
  }

  public async deleteInMemoryCache(key: string) {
    await this.cacheManager
      .del(key)
      .then(() => {
        this.logger.log(`In Memory Cache가 삭제되었습니다, KEY : ${key}`);
      })
      .catch(() => {
        throw new InternalServerErrorException("In Memory Cache 삭제 중 오류가 발생했습니다.");
      });
  }
}
