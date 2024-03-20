import { WinstonLoggerLevel } from './winston-logger-level.interface';

export type WinstonCreateFileName = (level: WinstonLoggerLevel) => string;
