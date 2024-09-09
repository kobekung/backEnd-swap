import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { from_user_id, to_user_id, product_id, description, status, image, price } = createOfferDto;

    const fromUser = await this.userRepository.findOne({ where: { id: from_user_id } });
    if (!fromUser) {
      throw new NotFoundException('Sender user not found');
    }

    const toUser = await this.userRepository.findOne({ where: { id: to_user_id } });
    if (!toUser) {
      throw new NotFoundException('Receiver user not found');
    }

    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const offer = this.offerRepository.create({
      description,
      status: status || OFFER_STATUS_ENUM.PENDING,
      image,
      price,
      fromUser,
      toUser,
      product,
    });

    return this.offerRepository.save(offer);
  }

  async getOfferById(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async getOffers(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['fromUser', 'toUser', 'product'],
    });
  }

  async acceptOffer(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id: id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OFFER_STATUS_ENUM.ACCEPTED;
    return this.offerRepository.save(offer);
  }

  async rejectOffer(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id: id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OFFER_STATUS_ENUM.REJECTED;
    return this.offerRepository.save(offer);
  }
}
