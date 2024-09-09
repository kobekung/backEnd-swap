import { IsEnum, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsEnum(OFFER_STATUS_ENUM)
  @IsOptional()
  status?: OFFER_STATUS_ENUM;  // Optional status, will default to PENDING

  @IsNotEmpty()
  @IsNumber()
  from_user_id: number;

  @IsNotEmpty()
  @IsNumber()
  to_user_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
