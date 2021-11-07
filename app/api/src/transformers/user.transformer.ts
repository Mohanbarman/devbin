import { User } from '@prisma/client';
import { BaseTransformer } from '../core/base-transformer';

export class UserTransformer extends BaseTransformer {
  constructor(data: User | User[]) {
    super(data);
  }

  async transform(data: User): Promise<Record<string, any>> {
    return {
      id: data.uuid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
