import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { CommentsModule } from './modules/comments/comments.module';
import { OffersModule } from './modules/offers/offers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // Replace with your DB user
      password: '1234',  // Replace with your DB password
      database: 'swap',  // Replace with your DB name
      autoLoadEntities: true, // Automatically load entities
      synchronize: true,
    }),
    UsersModule,
    ProductCategoriesModule,
    ProductsModule,
    CommentsModule,
    OffersModule,
    NotificationsModule,
    ReportsModule,
    ReviewsModule,
    AdminsModule,
    ChatsModule,
    
  ],
})
export class MasterModule {}
