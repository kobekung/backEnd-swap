import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ROLE_ENUM } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;  // Ensure this is included and validated

  @IsString()
  address: string;

  @IsOptional() // Optional because the role can default to 'user'
  @IsString()
  role?: ROLE_ENUM = ROLE_ENUM.USER;


}
