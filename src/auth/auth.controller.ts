import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ForgotPasswordDTO, LoginUserDto, ResetPasswordDTO, VerifyOtpDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  
  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify otp of a new user' })
  async verifyOTP(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password of a user' })
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDTO);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password of a user and send OTP' })
  async forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDTO);
  }
}
