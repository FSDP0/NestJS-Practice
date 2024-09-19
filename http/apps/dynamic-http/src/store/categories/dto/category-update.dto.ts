import { PickType } from "@nestjs/swagger";
import { CategoryDto } from "./category.dto";

export class CategoryUpdateDto extends PickType(CategoryDto, ["name"] as const) {}
