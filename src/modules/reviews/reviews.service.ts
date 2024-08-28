import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async findOne(id: number): Promise<Review | undefined> {
    return this.reviewsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find();
  }

  // Add more methods as needed for your service
}
