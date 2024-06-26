import { WinstonCreateFileName } from './winston-create-filename.interface';
import { WinstonLoggerLevel } from './winston-logger-level.interface';

/**
 * Winston Logger Factory Cconstructor Options
 *
 * @param name logger context name
 * @param dirname log directory name
 * @param dataPattern log file date format
 * @param createFilename create log filename function
 * @param maxSize max size of log file
 * @param maxFiles max days of log file
 */
export interface WinstonLoggerFactoryOptions {
  name?: string;
  dirname?: string;
  datePattern?: string;
  createFilename?: WinstonCreateFileName;
  maxSize?: string;
  maxFiles?: string;
}

/**
 * Create Logger Service(Winston Logger) Options
 *
 * @param consoleLevel Array of ["log", "error", "warn", "debug", "verbose", "fatal", "info", "silly"]
 * @param fileLevel Array of ["log", "error", "warn", "debug", "verbose", "fatal", "info", "silly"]
 *  */
export interface WinstonLoggerFactoryCreateOptions {
  consoleLevel?: WinstonLoggerLevel[];
  fileLevel?: WinstonLoggerLevel[];
}
