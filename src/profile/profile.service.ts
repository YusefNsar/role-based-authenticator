import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    delete user.password;

    return user;
  }

  async updateProfile(email: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    user.name = updateProfileDto.name;
    user.address = updateProfileDto.address;

    await this.userRepository.save(user);
  
    delete user.password;

    return user;
  }
}
