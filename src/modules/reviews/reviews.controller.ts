// src/modules/reviews/reviews.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Create a new review
  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  // Get all reviews for a product
  @Get('product/:productId')
  async getProductReviews(@Param('productId') productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}
