import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JWTModule, DatabaseModule } from './common/modules';

@Module({
  imports: [AuthModule, ProfileModule, DatabaseModule, JWTModule],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
