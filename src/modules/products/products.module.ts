import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { User } from '../users/users.entity';
import { ProductCategory } from '../product-categories/product-categories.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, User, ProductCategory])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
