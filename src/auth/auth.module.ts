import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JWTModule } from '../common/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JWTModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}