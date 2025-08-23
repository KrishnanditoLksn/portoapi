import { IsNotEmpty, IsString, minLength, MinLength } from "class-validator";

export class CreateCategoryDto{
    @IsString()
    @IsNotEmpty({ message: "Category must not empty" })
    nameCategory: string 
}
