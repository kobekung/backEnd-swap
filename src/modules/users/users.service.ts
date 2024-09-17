import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // ตรวจสอบการมีอยู่ของผู้ใช้ที่มีอีเมลหรือหมายเลขโทรศัพท์ซ้ำ
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { phoneNumber: createUserDto.phoneNumber },
      ],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone number already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  async getAllUsers(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }
  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async editProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Check if the new email is already in use by another user
      if (updateUserDto.email) {
        const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Email already in use');
        }
      }
  
      // Update user data
      Object.assign(user, updateUserDto);
  
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }
  
  
}
