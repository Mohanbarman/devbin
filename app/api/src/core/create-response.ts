import { Response } from 'express';

export const createResponse = <T>(res: Response, data: T, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    data: data,
  });
};
