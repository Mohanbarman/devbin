import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailExists } from '../../../validation/custom-validators';

export class LoginDTO {
  @IsEmail()
  @IsEmailExists(true, { message: 'Wrong username or password' })
  email: string;

  @IsNotEmpty()
  password: string;
}
