import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  async getChat(@Param('id') id: number): Promise<Chat> {
    return this.chatsService.findOne(id);
  }

  @Get()
  async getAllChats(): Promise<Chat[]> {
    return this.chatsService.findAll();
  }

//   @Post()
//   async createChat(@Body() chat: Chat): Promise<Chat> {
//     // Assuming you have a method to create a chat
//     return this.chatsService.create(chat);
//   }

  // Add more endpoints as needed for your controller
}
