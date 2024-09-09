// src/modules/reports/reports.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new report
  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    const { user_id, reason, details } = createReportDto;

    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const report = this.reportRepository.create({
      user,
      reason,
      details,
      status: 'pending', // Default status
    });

    return this.reportRepository.save(report);
  }

  // Get all reports
  async getAllReports(): Promise<Report[]> {
    return this.reportRepository.find({ relations: ['user'] });
  }

  // Get a report by ID
  async getReportById(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  // Update report status
  async updateReportStatus(id: number, status: string): Promise<Report> {
    const report = await this.getReportById(id);
    report.status = status;
    return this.reportRepository.save(report);
  }
}
