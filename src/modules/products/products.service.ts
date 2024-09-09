// src/modules/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersService } from '../users/users.service';
import { ProductCategory } from '../product-categories/product-categories.entity';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.usersService.findById(createProductDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = this.productsRepository.create({
      ...createProductDto,
      user,
    });
    
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
