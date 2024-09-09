// src/modules/notifications/dto/create-notification.dto.ts
export class CreateNotificationDto {
    user_id: number;
    message: string;
    isRead?: boolean;
  }
  