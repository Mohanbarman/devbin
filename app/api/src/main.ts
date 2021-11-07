import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { IDatabaseConfig, ISettingsConfig } from './types/config.types';
import { createSession } from './session-store';
import { transformExceptionFactory, HttpExceptionFilter } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const settings = configService.get<ISettingsConfig>('settings');
  const dbConfig = configService.get<IDatabaseConfig>('database');

  if (!settings || !dbConfig) throw 'missing config values in .env';

  app.use(createSession(settings, dbConfig));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: transformExceptionFactory,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(settings.port);
}
bootstrap();
