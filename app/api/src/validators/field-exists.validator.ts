import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions } from 'class-validator';

interface IValidationOptions extends ValidationOptions {
  modelName: keyof PrismaClient;
}

export function IsExists(
  exists: boolean,
  validationOptions: IValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: exists
          ? `${propertyName} already exists`
          : `${propertyName} doesn't exists`,
        ...validationOptions,
      },
      validator: {
        async validate(value: any) {
          const prisma = new PrismaClient();
          return (
            !!(await (prisma[validationOptions.modelName] as any).findFirst({
              where: { [propertyName]: value },
            })) === exists
          );
        },
      },
    });
  };
}
