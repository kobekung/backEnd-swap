import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './product-categories.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  // Example method to find a category by ID
  async findOne(id: number): Promise<ProductCategory | undefined> {
    return this.productCategoriesRepository.findOne({ where: { id } });
  }

  // Add more methods as needed for your service
}
