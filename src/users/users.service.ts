import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with same email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    user.verified = true;

    await this.userRepository.save(user);
    return await this.userRepository.findOne({ where: { id: user.id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.name = updateUserDto.name
    user.address = updateUserDto.address
    user.email = updateUserDto.email
    user.password = updateUserDto.password
    user.role = updateUserDto.role || user.role

    await this.userRepository.save(user);

    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
    return { message: `User with ID ${id} deleted` };
  }
}
