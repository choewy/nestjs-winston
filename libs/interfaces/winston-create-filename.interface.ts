import { WinstonLoggerLevel } from './winston-logger-factory-options.interface';

export type WinstonCreateFileName = (level: WinstonLoggerLevel) => string;
