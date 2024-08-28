import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  async findOne(id: number): Promise<Chat | undefined> {
    return this.chatsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Chat[]> {
    return this.chatsRepository.find();
  }

  // Add more methods as needed for your service
}
