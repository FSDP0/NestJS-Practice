import { Module } from "@nestjs/common";
import { StoreHttpModule } from "../common/store-http.module";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";

@Module({
  imports: [StoreHttpModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
