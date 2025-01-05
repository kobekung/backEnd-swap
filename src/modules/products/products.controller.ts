// src/modules/products/products.controller.ts

import { Body, Controller, Post, Get, Param, UseInterceptors, HttpStatus, HttpException, UploadedFile, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';

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
  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.findById(id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Directory where files will be saved
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      },
    }),
    fileFilter: (req, file, cb) => {
      // You can add file type validation here
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('File is not uploaded', HttpStatus.BAD_REQUEST);
    }

    return {
      fileUrl: `http://localhost:3001/uploads/${file.filename}`, // Return URL of the uploaded file
    };
  }
 @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> { 
    await this.productsService.deleteProduct(id);
  }
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Product> {
    return this.productsService.findByName(name);
  }

  @Get('status')
  async findByStatus(@Query('status') status: PRODUCT_STATUS_ENUM) {
    if (!Object.values(PRODUCT_STATUS_ENUM).includes(status as PRODUCT_STATUS_ENUM)) {
      throw new NotFoundException('Invalid product status');
    }
    return await this.productsService.findByStatus(status as PRODUCT_STATUS_ENUM);
  }
  @Post('complete')
  async markAsCompleted(@Body('productId') productId: number) {
    return this.productsService.markAsCompleted(productId);
  }
  @Get('status/:productId')
async checkStatusByProductId(@Param('productId') productId: number) {
  return this.productsService.checkStatus(productId);
}

}
