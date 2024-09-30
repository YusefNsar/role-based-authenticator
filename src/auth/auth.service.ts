import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as sendgridMail from '@sendgrid/mail';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const password = this.generateOTP();
    const user = this.userRepository.create({
      ...createUserDto,
      password,
    });

    await this.userRepository.save(user);
    await this.sendPasswordEmail(email, password);

    return { success: true, message: 'User registered successfully, check email for password' };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    delete user.password;

    return { accessToken, user };
  }

  async sendPasswordEmail(email: string, password: string) {
    const msg = {
      to: email,
      from: 'noreply@yourapp.com',
      subject: 'Your New Account Password',
      text: `Your temporary password is: ${password}`,
    };
    await sendgridMail.send(msg);
  }

  private generateOTP(): string {
    // enhancement: use more cryptographically secure random number generator
    return Math.random().toString(10).slice(-6);
  }
}
