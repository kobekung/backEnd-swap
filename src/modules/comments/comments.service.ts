import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  // Example method to find a comment by ID
  async findOne(id: number): Promise<Comment | undefined> {
    return this.commentsRepository.findOne({ where: { id } });
  }

  // Add more methods as needed for your service
}
