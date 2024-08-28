import { Controller, Get, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get(':id')
  async getOffer(@Param('id') id: number): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  // Add more endpoints as needed for your controller
}
