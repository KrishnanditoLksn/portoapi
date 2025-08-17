import { PartialType } from "@nestjs/swagger"
import { UpdateUserDto } from "./update_user_dto"

export class UpdateUserParamsDto extends PartialType(UpdateUserDto) {
    username: string
    email: string
}