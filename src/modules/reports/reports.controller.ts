import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':id')
  async getReport(@Param('id') id: number): Promise<Report> {
    return this.reportsService.findOne(id);
  }

  @Get()
  async getAllReports(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  // Add more endpoints as needed for your controller
}
