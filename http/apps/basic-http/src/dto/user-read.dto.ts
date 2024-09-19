import { IntersectionType } from "@nestjs/swagger";
import { AdditionalUserInfo, UserDto } from "./user.dto";

export class UserReadDto extends IntersectionType(UserDto, AdditionalUserInfo) {}
