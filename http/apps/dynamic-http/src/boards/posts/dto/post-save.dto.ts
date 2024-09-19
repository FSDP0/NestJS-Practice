import { IntersectionType, OmitType } from "@nestjs/swagger";
import { AdditionalPostInfo, PostDto } from "./post.dto";

export class PostSaveDto extends OmitType(IntersectionType(PostDto, AdditionalPostInfo), [
  "id"
] as const) {}
