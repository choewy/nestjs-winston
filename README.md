# NestJS Winston

## Installing

```bash
npm i @choewy/nestjs-winston
```

## Uses

```ts
async function bootstrap() {
  // Creates an instance of WinstonLoggerFactory
  const loggerFactory = new WinstonLoggerFactory();

  // Creates an LoggerService with WinstonLogger
  const logger = loggerFactory.create();
  const app = await NestFactory.create(AppModule, { logger });

  await app.listen(3000);
}

bootstrap();
```
