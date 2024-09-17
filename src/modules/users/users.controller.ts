import { Body, Controller, Get, Post, HttpException, HttpStatus, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';

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
  ) {
    return this.usersService.editProfile(id, updateUserDto);
  }
}
