import { NestFactory } from '@nestjs/core';

import { AppModule } from './app';
import { WinstonLoggerFactory } from './winston-logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerFactory({ name: 'App' }).create(),
  });

  await app.listen(3000);
}

bootstrap();
