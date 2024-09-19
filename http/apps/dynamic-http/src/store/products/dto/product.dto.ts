import { ApiProperty } from "@nestjs/swagger";

class Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: Array<string>;
}

export class AddintionalProductInfo {
  @ApiProperty()
  category: Category;
}
