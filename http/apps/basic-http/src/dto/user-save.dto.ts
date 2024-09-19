import { OmitType } from "@nestjs/swagger";
import { UserReadDto } from "./user-read.dto";

export class UserSaveDto extends OmitType(UserReadDto, ["id"] as const) {}
