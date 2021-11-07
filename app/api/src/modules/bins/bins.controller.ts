import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '@prisma/client';

import { BinTransformer } from '../../transformers';
import { createResponse } from '../../core';
import { BinsService } from './bins.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { GetUser } from '../../param-decorators';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  async create(
    @Body() data: CreateBinDto,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const bin = await this.binsService.create(data, user);
    const transformed = new BinTransformer(bin);
    return createResponse(res, await transformed.data);
  }
}
