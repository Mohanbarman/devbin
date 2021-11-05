import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ISettingsConfig } from './types/config.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const settings = configService.get<ISettingsConfig>('settings');
  if (!settings) throw 'settings are required';

  await app.listen(settings.port);
}
bootstrap();
