import { ApiProperty } from "@nestjs/swagger";

export class PostCommentReadDto {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  body: string;
}
