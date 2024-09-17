import { Controller, Post, Body, Get, Param, Patch, Put, Req, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

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

  @Get('user/:user_id')
  async getOffersByUserId(@Param('user_id') user_id: number): Promise<Offer[]> {
    return this.offersService.getOffersByUserId(user_id);
  }
  @Post('accept')
  async acceptOffer(@Body() body: { offerId: number }) {
    return this.offersService.acceptOffer(body.offerId);
  }

  @Post('reject')
  async rejectOffer(@Body() body: { offerId: number }) {
    return this.offersService.rejectOffer(body.offerId);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}${extname(file.originalname)}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    // Return the file URL
    return { url: `http://localhost:3001/uploads/${file.filename}` };
  }
  
}
