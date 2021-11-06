import { ValidationError } from '@nestjs/common';
import { ValidationFailedException } from '../exceptions/validation-failed-exception';

export const transformExceptionFactory = (errors: ValidationError[]) => {
  const _errors: Record<string, string[]> = {};

  for (const error of errors) {
    _errors[error.property] = Object.values(error.constraints || {});
  }

  return new ValidationFailedException(_errors);
};
