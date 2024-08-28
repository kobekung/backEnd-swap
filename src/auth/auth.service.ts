import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/users.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, firstName: string, lastName: string, phoneNumber: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.usersService.create({
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      });
      return this.generateToken(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException('User with this email or phone number already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('An error occurred during registration', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.passwordHash) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
