import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsExists } from '../../../validators';

export class LoginDTO {
  @IsEmail()
  @IsExists(false, { modelName: 'user', message: 'Wrong username or password' })
  email: string;

  @IsNotEmpty()
  password: string;
}
