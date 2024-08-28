import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Example method to find a product by ID
  async findOne(id: number): Promise<Product | undefined> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async get(id: number): Promise<Product | undefined> {
    return this.findOne(id);
  }
}
