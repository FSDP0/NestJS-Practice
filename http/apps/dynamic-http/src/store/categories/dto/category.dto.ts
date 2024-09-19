import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ example: "example@example.com" })
  image: string;
}

export class AdditionalCategoryInfo {
  @ApiProperty()
  id: number;
}
