import { ApiProperty } from "@nestjs/swagger";
import { CategoryReadDto } from "./category-read.dto";

export class CategoryProductReadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: CategoryReadDto })
  category: CategoryReadDto;

  @ApiProperty({ type: String, isArray: true })
  images: Array<string>;
}
