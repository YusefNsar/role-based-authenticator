import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JWTModule, DatabaseModule, AppConfigModule } from './common/modules';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    DatabaseModule,
    JWTModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
