import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post('create')
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  async getOffers(): Promise<Offer[]> {
    return this.offersService.getOffers();
  }

  @Get(':id')
  async getOfferById(@Param('id') id: number): Promise<Offer> {
    return this.offersService.getOfferById(id);
  }
}
