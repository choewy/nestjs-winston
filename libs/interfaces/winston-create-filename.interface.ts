import { WinstonLoggerLevel } from './winston-logger-level.interface';

/**
 * Create Winston Filename Function
 *
 * @param level log | error | warn | debug | verbose | fatal |  info | silly
 *  */
export type WinstonCreateFileName = (level: WinstonLoggerLevel) => string;
