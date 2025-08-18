// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController, AuthController],
    providers: [UserService]
})
export class UserModule { }
