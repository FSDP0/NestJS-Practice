import { Module } from "@nestjs/common";
import { StoreModule } from "./store/store.module";
import { BoardModule } from "./boards/board.module";

@Module({
  imports: [StoreModule, BoardModule]
})
export class DynamicHttpModule {}
