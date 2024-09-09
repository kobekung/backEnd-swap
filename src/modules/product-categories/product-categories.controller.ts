import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoryService } from './product-categories.service';

@Controller('categories')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Post()
  async createCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createCategory(createProductCategoryDto);
  }

  @Get()
  async getAllCategories() {
    return this.productCategoryService.findAllCategories();
  }

  @Post(':categoryId/products/:productId')
  async linkProductToCategory(
    @Param('categoryId') categoryId: number,
    @Param('productId') productId: number,
  ) {
    return this.productCategoryService.linkProductToCategory(productId, categoryId);
  }
}
