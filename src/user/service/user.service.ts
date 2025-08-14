import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user_dto';
import { UpdateUserDto } from '../dto/update_user_dto';

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


    getUserId(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }


    deleteUserAccount(id: number): Promise<{ affected?: number | null }> {
        return this.userRepository.delete(id);
    }

    updateUserAccount(id: number, userDto: UpdateUserDto): Promise<User | null> {
        const user: User = new User();
        user.username = userDto.username
        user.password = userDto.password
        user.email = userDto.email
        user.id = id
        return this.userRepository.save(user)
    }
}
