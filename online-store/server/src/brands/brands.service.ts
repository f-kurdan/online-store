import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import convertToSlug from '../utils/convertToSlug';
import { CreateBrandDto } from './dto/createBrandDto';

@Injectable()
export class BrandsService {
    constructor(private prisma: PrismaService) { }

    getAllBrands() {
        return this.prisma.brand.findMany()
    }

    getOneBrand(id: string) {
        return this.prisma.brand.findUnique({
            where: { id: +id }
        })
    }

    createBrand(dto: CreateBrandDto) {
        return this.prisma.brand.create({
            data: {
                name: dto.name,
                slug: convertToSlug(dto.name)
            }
        })
    }
}
