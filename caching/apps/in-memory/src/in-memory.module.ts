import { Module } from "@nestjs/common";
import { InMemoryController } from "./controller/in-memory.controller";
import { InMemoryService } from "./service/in-memory.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [CacheModule.register()],
  controllers: [InMemoryController],
  providers: [InMemoryService]
})
export class InMemoryModule {}
