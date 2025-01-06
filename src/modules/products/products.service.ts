// src/modules/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersService } from '../users/users.service';
import { ProductCategory } from '../product-categories/product-categories.entity';
import { Product } from './products.entity';
import { ProductCategoryService } from '../product-categories/product-categories.service';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';
import { Offer } from '../offers/offer.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    private readonly usersService: UsersService,

    private readonly productCategoryService: ProductCategoryService,  // Inject ProductCategoryService
    @InjectRepository(Offer)  // Inject Offer repository to delete related records
    private offersRepository: Repository<Offer>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.usersService.findById(createProductDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const category = await this.productCategoryService.findById(createProductDto.categoryId);  // Use findById
    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    const product = this.productsRepository.create({
      ...createProductDto,
      user,
      category,
    });

    return await this.productsRepository.save(product);
  }
  

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['user', 'category'],
    });
  }
  async findByUser(userId: number): Promise<Product[]> {
    return this.productsRepository.find({ where: { user: { id: userId } } });
  }
  async findById(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id }, relations: ['user', 'category'] });
  }
  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
  async findByName(name: string): Promise<Product> {
    return this.productsRepository.findOne({ where: { name } });
  }
  async findByStatus(status: PRODUCT_STATUS_ENUM): Promise<Product[]> {
    return this.productsRepository.find({ where: { status } });
  }
  
  async markAsCompleted(productId: number): Promise<Product> {
    const product = await this.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    // Update status to an existing enum value
    product.status = PRODUCT_STATUS_ENUM.COMPLETE; // Replace with appropriate status
    return this.productsRepository.save(product);
  }
  async checkStatus(productId: number): Promise<{ productId: number; status: string }> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    return { productId: product.id, status: product.status };
  }
  async deleteById(productId: number): Promise<{ message: string }> {
    // First, delete the related offers (or any other related data)
    await this.offersRepository.delete({ id: productId });

    // Now delete the product
    const deleteResult = await this.productsRepository.delete(productId);

    if (deleteResult.affected === 0) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    return { message: `Product with ID ${productId} has been successfully deleted.` };
}
  
}
