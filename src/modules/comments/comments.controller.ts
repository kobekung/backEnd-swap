import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ICommented } from 'src/interface/Comments.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  async createComment(@Body() createCommentDto: ICommented) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get('product')
  async getCommentsByProduct(@Query('product_id') product_id: number) {
    return this.commentsService.getCommentsByProduct(product_id);
  }

  @Get('user')
  async getCommentsByUser(@Query('user_id') user_id: number) {
    return this.commentsService.getCommentsByUser(user_id);
  }
}
