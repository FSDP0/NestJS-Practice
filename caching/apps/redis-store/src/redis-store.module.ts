import { Module } from "@nestjs/common";
import { RedisStoreController } from "./controller/redis-store.controller";
import { RedisStoreService } from "./service/redis-store.service";
import * as redisStore from "cache-manager-redis-store";
import { CacheModule } from "@nestjs/cache-manager";
import { RedisClientOptions } from "redis";

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      username: "default",
      password: "password",
      socket: {
        host: "localhost",
        port: 6379
      },
      ttl: 3000
    })
  ],
  controllers: [RedisStoreController],
  providers: [RedisStoreService]
})
export class RedisStoreModule {}
