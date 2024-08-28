import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getComment(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

}
