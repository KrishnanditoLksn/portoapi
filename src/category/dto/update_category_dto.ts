import { PartialType } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";
import { Category } from "../entity/category";

export class UpdateCategoryDto extends PartialType(Category) {
    @IsString()
    @MinLength(2, { message: "Username must 2 character" })
    nameCategory: string
}
