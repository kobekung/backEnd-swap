import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':id')
  async getNotification(@Param('id') id: number): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Get()
  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  // Add more endpoints as needed for your controller
}
