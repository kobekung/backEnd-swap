import { IsEnum, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';

export class CreateOfferDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  from_user_id: number;

  @IsNotEmpty()
  to_user_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(OFFER_STATUS_ENUM)
  status?: OFFER_STATUS_ENUM;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

