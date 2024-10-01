import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbType = configService.get('database.type');
        const isSQLite = dbType === 'sqlite';
        const dbConfig = {
          type: dbType,
          // entities: [],
        };

        if (isSQLite) {
          dbConfig['database'] = ':memory';
          dbConfig['synchronize'] = true;
        } else {
          dbConfig['host'] = configService.get('database.host');
          dbConfig['port'] = configService.get('database.port');
          dbConfig['username'] = configService.get('database.user');
          dbConfig['password'] = configService.get('database.password');
          dbConfig['database'] = configService.get('database.name');
          dbConfig['synchronize'] = true;
          dbConfig['autoLoadEntities'] = true;
          dbConfig['ssl'] = true;

          dbConfig['options'] = {
            trustServerCertificate: true,
          };
        }

        return dbConfig;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
