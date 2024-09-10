import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(PRODUCT_STATUS_ENUM, { message: 'Invalid status value' })
  status: PRODUCT_STATUS_ENUM;

  @IsNotEmpty()
  @IsNumber()
  userId: number;  // Validates user ID

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;  // Validates category ID

  image?: string;
}

