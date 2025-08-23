import { Body, Controller, Delete, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create_category_dto';
import express from 'express';
import { UpdateCategoryDto } from '../dto/update_category_dto';

@Controller('category')
export class CategoryController {
    constructor(
        readonly categoryService: CategoryService
    ) { }

    @Post("/create")
    async createPostCategory(@Body() createCategoryDto: CreateCategoryDto, @Res() res: express.Response) {
        if (createCategoryDto.nameCategory == "") {
            return res.status(404).send({
                message: "Category Must not empty"
            })
        }
        await this.categoryService.createCategoryDto(createCategoryDto)

        return res.status(201).send({
            message: "Porto Post Category Created"
        })
    }

    @Delete("/delete/:id")
    async deletePostCategory(@Param("id") id: number, @Res() res: express.Response) {
        const foundIds = await this.categoryService.findOnePost(id)
        if (!foundIds) {
            return res.status(404).send({
                message: "Category Not Found"
            })
        }
        await this.categoryService.deletePostById(foundIds.id)

        return res.status(201).send({
            message: "Successfull deleted Post Category"
        })
    }

    @Put("/update/:id")
    async updateCategoryByName(@Body() updateCategoryDto: UpdateCategoryDto, @Param("id") id: number, @Res() res: express.Response) {
        const categoryIds = await this.categoryService.findOnePost(id)
        if (updateCategoryDto.nameCategory == "" && categoryIds?.id == null) {
            return res.status(401).send({
                message: "Category Name Must not be Empty"
            })
        }
        await this.categoryService.updateCategoryByName(id, updateCategoryDto)

        return res.status(201).send({
            message: "Successfull updated Post Category"
        })
    }
}
