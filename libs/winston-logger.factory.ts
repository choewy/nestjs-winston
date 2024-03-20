import { LogLevel } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

import { WinstonLoggerFactoryCreateOptions } from './interfaces';

export class WinstonLoggerFactory {
  private static readonly LEVEL = Symbol.for('level');

  private static getFormatByLevel(level: LogLevel) {
    const format = winston.format((info) => {
      if (info[this.LEVEL] === level) {
        return info;
      } else {
        return false;
      }
    });

    return format();
  }

  private static getDailyTransportOptions(level: LogLevel, name?: string): DailyRotateFileTransportOptions {
    const dirname = './logs';
    const filename = [name, '%DATE%', level, 'log'].join('.');
    const datePattern = 'YYYY-MM-DD';
    const maxSize = '500mb';
    const maxFiles = '3d';

    return {
      level,
      dirname,
      filename,
      datePattern,
      maxSize,
      maxFiles,
      format: winston.format.combine(this.getFormatByLevel(level), winston.format.timestamp(), winston.format.json()),
    };
  }

  private static createConsoleTransports(name?: string, levels?: LogLevel[]): winston.transport[] {
    if (Array.isArray(levels) === false) {
      return [
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(name, {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      ];
    }

    const transports: winston.transport[] = [];

    for (const level of levels) {
      transports.push(
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(name, {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      );
    }

    return transports;
  }

  private static createFileTransports(name?: string, levels?: LogLevel[]): winston.transport[] {
    if (Array.isArray(levels) === false) {
      return [new DailyRotateFile(this.getDailyTransportOptions('log', name))];
    }

    const transports: winston.transport[] = [];

    for (const level of levels) {
      transports.push(new DailyRotateFile(this.getDailyTransportOptions(level, name)));
    }

    return transports;
  }

  static create(opts: WinstonLoggerFactoryCreateOptions = {}) {
    return WinstonModule.createLogger({
      transports: []
        .concat(this.createConsoleTransports(opts.name, opts.consoleLevel))
        .concat(this.createFileTransports(opts.name, opts.fileLevel)),
    });
  }
}
