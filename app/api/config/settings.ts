import { registerAs } from '@nestjs/config';

export default registerAs('settings', () => ({
  port: parseInt(process.env['PORT'] || '3000'),
  sessionSecret: process.env['SESSION_SECRET'],
  userPasswordSaltRounds: parseInt(
    process.env['USER_PASSWORD_SALT_ROUNDS'] || '10',
  ),
}));
