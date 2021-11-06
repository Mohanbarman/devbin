import { Response } from 'express';
import { BaseTransformer } from './base-transformer';

export const createResponse = <T extends BaseTransformer>(
  res: Response,
  data: T,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    data: data.data || data,
  });
};
