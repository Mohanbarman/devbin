import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import config from '../../config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BinsModule } from './bins/bins.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: config, isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    BinsModule,
  ],
})
export class AppModule {}
