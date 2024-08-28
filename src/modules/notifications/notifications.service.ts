import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findOne(id: number): Promise<Notification | undefined> {
    return this.notificationsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find();
  }

  // Add more methods as needed for your service
}
