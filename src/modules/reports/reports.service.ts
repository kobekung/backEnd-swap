import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async findOne(id: number): Promise<Report | undefined> {
    return this.reportsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Report[]> {
    return this.reportsRepository.find();
  }

  // Add more methods as needed for your service
}
