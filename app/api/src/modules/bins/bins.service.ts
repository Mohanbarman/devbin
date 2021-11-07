import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateBinDto } from './dto/create-bin.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ISettingsConfig } from '../../types';

@Injectable()
export class BinsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(data: CreateBinDto, user?: User) {
    let hashedPassword: string | null = null;

    if (data.password) {
      const config = this.config.get('settings') as ISettingsConfig;
      hashedPassword = await bcrypt.hash(
        data.password,
        config.binPasswordSaltRounds,
      );
    }

    const bin = await this.prisma.bin.create({
      data: {
        title: data.title,
        visibility: data.visibility,
        body: data.body,
        lang: data.lang,
        password: hashedPassword,
        slug: data.title,
        userId: user?.id || null,
      },
    });

    return bin;
  }

  findAll() {
    return `This action returns all bins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bin`;
  }

  update(id: number) {
    return `This action updates a #${id} bin`;
  }

  remove(id: number) {
    return `This action removes a #${id} bin`;
  }
}
