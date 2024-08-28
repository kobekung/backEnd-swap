import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':id')
  async getReview(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Get()
  async getAllReviews(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  // Add more endpoints as needed for your controller
}
