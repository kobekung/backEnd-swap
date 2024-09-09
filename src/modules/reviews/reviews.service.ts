// src/modules/reviews/reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';


@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new review
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { reviewerId, productId, rating, content } = createReviewDto;

    const user = await this.userRepository.findOneBy({ id: reviewerId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = this.reviewRepository.create({
      user,
      product,
      rating,
      content,
    });

    return this.reviewRepository.save(review);
  }

  // Get all reviews for a product
  async getProductReviews(productId: number): Promise<Review[]> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.reviewRepository.find({
      where: { product },
      order: { createdAt: 'DESC' },
    });
  }
}
