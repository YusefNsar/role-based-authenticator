import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../common/types';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsEnum(Role)
  @IsOptional()
  readonly role?: Role;
}
