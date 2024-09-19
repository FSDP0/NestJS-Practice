import { OmitType } from "@nestjs/swagger";
import { UserReadDto } from "./user-read.dto";

export class UserUpdateDto extends OmitType(UserReadDto, ["id"] as const) {}
