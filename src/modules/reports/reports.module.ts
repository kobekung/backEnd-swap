import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './report.entity'; // Ensure correct path
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, User])],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
