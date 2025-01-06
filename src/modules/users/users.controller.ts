import { Body, Controller, Get, Post, HttpException, HttpStatus, Param, Patch, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  @Patch(':id')
  async editProfile(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.usersService.editProfile(id, updateUserDto);
    } catch (error) {
      console.error('Error in editProfile controller:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }
}
