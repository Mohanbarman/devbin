import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationFailedException extends HttpException {
  constructor(errors: Record<string, string[]>) {
    super(errors, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
