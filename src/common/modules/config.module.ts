import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from  '../config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
