import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as sendgridMail from '@sendgrid/mail';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  ForgotPasswordDTO,
  LoginUserDto,
  ResetPasswordDTO,
  VerifyOtpDto,
} from './dto';

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

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser && existingUser.verified) {
      throw new UnauthorizedException('User already exists');
    }

    const password = this.generateOTP();
    const user = this.userRepository.create({
      ...createUserDto,
      password,
    });

    await this.userRepository.upsert(user, ['email']);
    await this.sendNewAccountOTPEmail(email, password);

    return {
      success: true,
      message: 'User registered successfully, check email for the OTP',
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: [
        'password',
        'verified',
        'id',
        'role',
        'address',
        'name',
        'email',
      ],
    });
    
    if (
      !user ||
      !user.verified ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      ...user,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async verifyOTP(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'verified', 'id'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user.verified) {
      throw new UnauthorizedException('User already verified');
    } else if (!(await bcrypt.compare(otp, user.password))) {
      throw new UnauthorizedException('Invalid OTP');
    }

    user.verified = true;
    await this.userRepository.save(user);

    return { success: true, message: 'User verified successfully' };
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const { email, otp, password } = resetPasswordDTO;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'verified', 'id'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (!user.verified) {
      throw new UnauthorizedException('User not verified');
    } else if (!(await bcrypt.compare(otp, user.password))) {
      throw new UnauthorizedException('Invalid OTP');
    }

    user.password = password;
    await this.userRepository.save(user);

    return { success: true, message: 'Password reset successfully' };
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO) {
    const { email } = forgotPasswordDTO;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (!user.verified) {
      throw new UnauthorizedException('User not verified');
    }

    const password = this.generateOTP();

    user.password = password;
    await this.userRepository.save(user);

    await this.sendResetPasswordOTPEmail(email, password);

    return {
      success: true,
      message: 'Password reset OTP email sent successfully',
    };
  }

  private async sendNewAccountOTPEmail(email: string, password: string) {
    const msg = {
      to: email,
      from: 'yusefnsar912@gmail.com',
      subject: 'Your New Account OTP',
      text: `Your temporary password is: ${password}`,
    };
    await sendgridMail.send(msg);
  }

  private async sendResetPasswordOTPEmail(email: string, password: string) {
    const msg = {
      to: email,
      from: 'yusefnsar912@gmail.com',
      subject: 'Reset Password OTP',
      text: `Your temporary password is: ${password}`,
    };
    await sendgridMail.send(msg);
  }

  private generateOTP(): string {
    // enhancement: use more cryptographically secure random number generator
    return Math.random().toString(10).slice(-6);
  }
}
