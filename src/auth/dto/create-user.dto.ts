import { IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/common/types/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}