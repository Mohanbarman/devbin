import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import config from '../config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ load: config }), PrismaModule, UserModule],
})
export class AppModule {}
