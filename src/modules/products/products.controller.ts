// src/modules/products/products.controller.ts

import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
async createProduct(@Body() createProductDto: CreateProductDto) {
  return this.productsService.create(createProductDto);
}


  @Get()
  async getAllProducts() {
    return this.productsService.findAll();
  }
  @Get('user/:userId')
  async getUserProducts(@Param('userId') userId: number): Promise<Product[]> {
    return this.productsService.findByUser(userId);
  }
}
