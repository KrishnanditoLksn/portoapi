import { Injectable, Logger, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user_dto';
import { UpdateUserDto } from '../dto/update_user_dto';
import { UserResponseDto } from '../dto/user_response_dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {

    }

    /**
     * create user in User Entity
     */

    createUser(createUserDto: UserDto): Promise<User> {
        const user: User = new User();
        user.username = createUserDto.username
        user.password = createUserDto.password
        user.email = createUserDto.email
        return this.userRepository.save(user)
    }

    async findOneUser(id: number): Promise<UserResponseDto> {
        const data = await this.userRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(
                {
                    statusCode: 404,
                    message: "User Tidak Ditemukan"
                }
            );
        }
        return data;
    }

    getUserId(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async deleteUser(id: number) {
        const data = await this.findOneUser(id);
        return this.userRepository.delete(data);
    }

    async updateUserAccount(id: number, userDto: UpdateUserDto) {
        return await this.userRepository.update(id, userDto);
    }
}
