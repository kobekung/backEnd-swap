import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { IChat } from 'src/interface/Chats.interface';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  async createChat(@Body() createChatDto: IChat) {
    if (!createChatDto.message) {
      throw new Error('Message cannot be empty');
    }
    return this.chatsService.createChat(createChatDto);
  }

  @Get('get')
  async getChats(@Query('fromUserId') fromUserId: number, @Query('toUserId') toUserId: number) {
    return this.chatsService.getChats(fromUserId, toUserId);
  }
}
