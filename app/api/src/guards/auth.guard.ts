import { PrismaClient } from '.prisma/client';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TSession } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const session = req.session as TSession;

    if (!session.user) {
      throw new UnauthorizedException();
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      session.destroy(() => {});
      throw new UnauthorizedException();
    }

    session.user = user;

    return true;
  }
}
