import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { ISettingsConfig, TSession } from '../../types';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginDTO, session: TSession): Promise<User> {
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new HttpException('Wrong username or password', 409);
    }

    const isPasswordCorrect = bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Wrong username or password', 409);
    }

    session.user = user;

    return user;
  }

  async register(data: RegisterDTO): Promise<User> {
    const settings = this.configService.get<ISettingsConfig>('settings');
    if (!settings) throw 'missing values in .env';

    const hashedPassword = await bcrypt.hash(
      data.password,
      settings.userPasswordSaltRounds,
    );

    const user = this.userService.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    return user;
  }
}
