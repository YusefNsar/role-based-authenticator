import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDTO {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  @IsStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})
  password: string;
}
