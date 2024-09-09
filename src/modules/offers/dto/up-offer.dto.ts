import { IsEnum, IsOptional } from 'class-validator';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';


export class UpdateOfferDto {
  @IsEnum(OFFER_STATUS_ENUM)
  @IsOptional()
  status?: OFFER_STATUS_ENUM;
}
