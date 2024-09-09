import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from 'src/modules/users/dto/login.dto'; // Import the login DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(
        createUserDto.email,
        createUserDto.passwordHash,
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.phoneNumber,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      
      if (!email || !password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      const user = await this.authService.validateUser(email, password);
      
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      
      const token = await this.authService.generateToken(user);

      // ตอบกลับเมื่อเข้าสู่ระบบสำเร็จ
      return {
        message: 'Login success',
        ...token, // ส่งกลับ access_token พร้อมข้อความ success
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}
