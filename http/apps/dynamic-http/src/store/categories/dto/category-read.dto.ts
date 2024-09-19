import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { AdditionalCategoryInfo, CategoryDto } from "./category.dto";

export class CategoryReadDto extends IntersectionType(CategoryDto, AdditionalCategoryInfo) {
  @ApiProperty()
  creationAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
