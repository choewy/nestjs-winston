import { LogLevel } from '@nestjs/common';

export interface WinstonLoggerFactoryCreateOptions {
  name?: string;
  consoleLevel?: LogLevel[];
  fileLevel?: LogLevel[];
}
