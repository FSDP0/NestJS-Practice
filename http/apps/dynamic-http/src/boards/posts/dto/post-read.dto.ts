import { IntersectionType } from "@nestjs/swagger";
import { AdditionalPostInfo, PostDto } from "./post.dto";

export class PostReadDto extends IntersectionType(PostDto, AdditionalPostInfo) {}
