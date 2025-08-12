import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ContentController } from './content/content.controller';
import { ContentModule } from './content/content.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, ContentModule, CategoryModule],
  controllers: [AppController, UserController, ContentController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
