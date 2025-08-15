import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user_dto';
import express, { response } from 'express';
import { UpdateUserDto } from '../dto/update_user_dto';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) { }

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
    async updateUser(@Param("id") id: number, @Body() userDto: UpdateUserDto, @Res() res: express.Response) {
        const updatedUserId = await this.userService.getUserId(id)

        if (updatedUserId == null) {
            return res.status(404).json({
                message: "Pengguna Tidak Ditemukan"
            })
        }
        await this.userService.updateUserAccount(id, userDto)
        return res.status(201).json({
            message: "Pengguna Sukses diubah"
        })
    }
}
