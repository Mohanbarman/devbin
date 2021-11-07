import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TSession } from '../types';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const session = request.session as TSession;
  return session.user;
});
