import { IntersectionType } from "@nestjs/swagger";
import { AdditionalPostInfo, PostDto } from "./post.dto";

export class PostUpdateDto extends IntersectionType(PostDto, AdditionalPostInfo) {}
