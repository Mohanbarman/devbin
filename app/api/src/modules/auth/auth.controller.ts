import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { createResponse } from '../../utils';
import { UserTransformer } from '../../transformers/user.transformer';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { TSession } from '../../types';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.authService.login(data, req.session as TSession);
    return createResponse(res, new UserTransformer(user));
  }

  @Post('register')
  async register(@Res() res: Response, @Body() data: RegisterDTO) {
    const user = await this.authService.register(data);
    return createResponse(res, new UserTransformer(user));
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req: Request, @Res() res: Response) {
    const session = req.session as TSession;
    return createResponse(res, new UserTransformer(session.user));
  }
}
