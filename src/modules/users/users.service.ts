import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // อัปเดตข้อมูลผู้ใช้ด้วยข้อมูลใหม่
    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }
 
}
