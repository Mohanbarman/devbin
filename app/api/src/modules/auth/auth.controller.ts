import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';

import { createResponse } from '../../core';
import { UserTransformer } from '../../transformers/user.transformer';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { TSession } from '../../types';
import { AuthGuard } from '../../guards/auth.guard';
import { GetSession, GetUser } from '../../param-decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDTO,
    @Res() res: Response,
    @GetSession() session: TSession,
  ) {
    const user = await this.authService.login(data, session);
    const transformed = new UserTransformer(user);
    return createResponse(res, await transformed.data);
  }

  @Post('register')
  async register(@Res() res: Response, @Body() data: RegisterDTO) {
    const user = await this.authService.register(data);
    const transformed = new UserTransformer(user);
    return createResponse(res, await transformed.data);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@GetUser() user: User, @Res() res: Response) {
    const transformed = new UserTransformer(user);
    return createResponse(res, await transformed.data);
  }
}
