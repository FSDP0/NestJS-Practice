import { ApiProperty, OmitType } from "@nestjs/swagger";
import { ProductDto } from "./product.dto";

export class ProductSaveDto extends OmitType(ProductDto, ["id"] as const) {
  @ApiProperty()
  categoryId: number;
}
