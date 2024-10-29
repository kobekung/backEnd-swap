import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { IChat } from 'src/interface/Chats.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async createChat(createChatDto: IChat): Promise<Chat> {
    const { from_user_id, to_user_id, message, deliveryType } = createChatDto;

    if (!message) {
      throw new Error('Message cannot be empty');
    }

    const chat = this.chatRepository.create({
      sender: { id: from_user_id },
      receiver: { id: to_user_id },
      message,
      deliveryType,
    });

    return this.chatRepository.save(chat);
  }

  async getChats(fromUserId: number, toUserId: number): Promise<Chat[]> {
    return this.chatRepository.find({
      where: [
        { sender: { id: fromUserId }, receiver: { id: toUserId } },
        { sender: { id: toUserId }, receiver: { id: fromUserId } }
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'],
    });
  }
  
}
