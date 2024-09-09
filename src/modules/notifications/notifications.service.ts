// src/modules/notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../users/users.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new notification
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { user_id, message, isRead = false } = createNotificationDto;

    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationRepository.create({
      user,
      message,
      isRead,
    });

    return this.notificationRepository.save(notification);
  }

  // Get all notifications for a user
  async getUserNotifications(user_id: number): Promise<Notification[]> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.notificationRepository.find({
      where: { user },
      order: { createdAt: 'DESC' },
    });
  }

  // Mark notification as read
  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }
}
