import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserDto } from './dto/user_dto';
import express, { response } from 'express';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) { }

    @Post('register')
    async registerUser(@Body() userDto: UserDto, @Res() res: express.Response) {
        if (userDto.email == null || userDto.password == null || userDto.username == null) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Salah satu kolom perlu diisi"
            });
        }
        this.userService.createUser(userDto)
        return res.status(201).send({
            message: "Pengguna Sukses Dibuat"
        })
    }

    @Post('/login/:id')
    async loginUser(@Param('id') id: number, @Res() res: express.Response) {
        const result = await this.userService.getUserId(id);
        if (result == null) {
            return res.status(404).json({
                message: 'User tidak ditemukan',
            });
        }

        return res.status(HttpStatus.OK).send({
            message: "Sukses Login"
        })
    }

    @Delete('/delete/:id')
    async deleteUser(@Param(':id') userId: number, @Res() res: express.Response) {
        const userIds = await this.userService.deleteUserAccount(userId);
        if (userIds == null) {
            return express.response.status(404).json({
                message: 'User Tidak Ditemukan'
            })
        }

        return res.status(201).json({
            message: "Pengguna Sukses dihapus"
        })
    }

    @Patch('/update/:id')
    async updateUser(@Param("id") id: number, @Body() userDto: UserDto, @Res() res: express.Response) {
        const updatedUserId = await this.userService.getUserId(id)

        if (updatedUserId == null) {
            return res.status(404).json({
                message: "Pengguna Tidak Ditemukan"
            })
        }

        return res.status(201).json({
            message: "Pengguna Sukses diubah"
        })
    }
}
