import Express from 'express';
import { User } from '@prisma/client';

export type TSession = Express.Request['session'] & {
  user?: User;
};
