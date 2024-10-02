import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JWTModule, DatabaseModule, AppConfigModule } from './common/modules';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    DatabaseModule,
    JWTModule,
    AppConfigModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
