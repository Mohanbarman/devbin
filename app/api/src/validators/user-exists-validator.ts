import { PrismaClient } from '.prisma/client';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEmailExists(
  exists = false,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsEmailExists',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: exists ? "email doesn't exists" : 'email already exists',
        ...validationOptions,
      },
      validator: {
        async validate(value: any) {
          const prisma = new PrismaClient();
          return (
            !!(await prisma.user.findFirst({
              where: { email: value },
            })) === exists
          );
        },
      },
    });
  };
}
