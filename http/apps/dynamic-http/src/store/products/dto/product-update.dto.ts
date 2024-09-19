import { PickType } from "@nestjs/swagger";
import { ProductDto } from "./product.dto";

export class ProductUpdateDto extends PickType(ProductDto, ["title", "price"] as const) {}
