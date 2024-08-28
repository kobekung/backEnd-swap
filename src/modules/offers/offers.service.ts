import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  async findOne(id: number): Promise<Offer | undefined> {
    return this.offersRepository.findOne({ where: { id } });
  }

  // Add more methods as needed for your service
}
