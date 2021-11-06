import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env['DB_URL'],
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT'] || '3306'),
  user: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
}));
