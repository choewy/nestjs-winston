import { NestFactory } from '@nestjs/core';

import { AppModule } from './app';
import { WinstonLoggerFactory } from './winston-logger.factory';

async function bootstrap() {
  const loggerFactory = new WinstonLoggerFactory();
  const logger = loggerFactory.create();

  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(3000);
}

bootstrap();
