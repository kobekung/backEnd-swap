import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Follow } from '../follow/follow.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow]), // Register both User and Follow entities
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
