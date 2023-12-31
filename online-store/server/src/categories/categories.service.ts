import { Injectable } from '@nestjs/common';
import convertToSlug from '../utils/convertToSlug';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    getAllCategories() {
        return this.prisma.category.findMany()
    }

    getOneCategory(id: string) {
        return this.prisma.category.findUnique({
            where: { id: +id }
        })
    }

    async createCategory(dto: CreateCategoryDto, file: Express.Multer.File) {
        return await this.prisma.category.create({
            data: {
                name: dto.name,
                slug: convertToSlug(dto.name),
                image: `${file.destination}/${file.originalname}`,
            }
        }).catch((error) => { throw new Error(error) })
    }

    updateCategory(id: string, dto: CreateCategoryDto) {
        return this.prisma.category.update({
            where: { id: +id },
            data: {
                name: dto.name,
            }
        })
    }

    deleteCategory(id: string) {
        return this.prisma.category.delete({
            where: { id: +id }
        })
    }
}
