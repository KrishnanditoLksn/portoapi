import { Body, Controller, HttpStatus, Logger, Param, Post, Res } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user_dto";
import express, { response } from 'express';

@Controller("auth")
export class AuthController {
    constructor(readonly userService: UserService) { }

    @Post('/register')
    async registerUser(@Body() userDto: UserDto, @Res() res: express.Response) {
        if (userDto.email == " " || userDto.password == " " || userDto.username == " ") {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: 500,
                message: "Salah satu kolom perlu diisi"
            });
        }
        this.userService.createUser(userDto)
        return res.status(201).send({
            status: 201,
            message: "Pengguna Sukses Dibuat"
        })
    }

    @Post('/login/:id')
    async loginUser(@Param('id') id: number, @Res() res: express.Response) {
        const result = await this.userService.getUserId(id);
        if (result == undefined) {
            return res.status(404).json({
                status: 404,
                message: 'User tidak ditemukan',
            });
        }

        return res.status(HttpStatus.OK).send({
            status: 200,
            message: "Sukses Login"
        })
    }
}