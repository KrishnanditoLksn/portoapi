import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create_category_dto';
import { CreateCategoryResponseDto } from '../dto/create_category_response';
import { UpdateCategoryDto } from '../dto/update_category_dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) {
    }

    createCategoryDto(categoryDto: CreateCategoryDto) {
        const category: Category = new Category();
        category.nameCategory = categoryDto.nameCategory;
        return this.categoryRepository.save(category)
    }


    async getPostCategory() {
        return await this.categoryRepository.find()
    }

    async findOnePost(id: number): Promise<CreateCategoryResponseDto | null> {
        return await this.categoryRepository.findOne({ where: { id } });
    }


    async getPostById(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOneBy({ id })
    }

    async deletePostById(id: number) {
        return this.categoryRepository.delete(id)
    }

    async updateCategoryByName(id: number, updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryRepository.update(id, updateCategoryDto)
    }

}
