import { Module } from "@nestjs/common";
import { StoreHttpModule } from "../common/store-http.module";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";

@Module({
  imports: [StoreHttpModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
