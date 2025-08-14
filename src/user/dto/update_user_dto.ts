import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"
import { passwordRegEx, UserDto } from "./user_dto"
import { PartialType } from "@nestjs/swagger"

export class UpdateUserDto extends PartialType(UserDto) {


    @IsString()
    @MinLength(2, { message: "Username must 2 character" })
    username: string


    @IsEmail()
    @MinLength(8, { message: "Email Length Must 8 Character" })
    @IsString()
    email: string

    @IsNotEmpty({ message: "Password Must not empty" })
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
    })
    password: string
}