import { WinstonCreateFileName } from './winston-create-filename.interface';
import { WinstonLoggerLevel } from './winston-logger-level.interface';

export interface WinstonLoggerFactoryOptions {
  name?: string;
  dirname?: string;
  datePattern?: string;
  createFilename?: WinstonCreateFileName;
  maxSize?: string;
  maxFiles?: string;
}

export interface WinstonLoggerFactoryCreateOptions {
  consoleLevel?: WinstonLoggerLevel[];
  fileLevel?: WinstonLoggerLevel[];
}
