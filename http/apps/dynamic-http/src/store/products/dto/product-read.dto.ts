import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { AddintionalProductInfo, ProductDto } from "./product.dto";

export class ProductReadDto extends IntersectionType(ProductDto, AddintionalProductInfo) {
  @ApiProperty()
  creationAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
