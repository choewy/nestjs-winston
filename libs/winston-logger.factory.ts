import { WinstonModule, utilities } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

import { WinstonLoggerFactoryCreateOptions, WinstonLoggerLevel, WinstonLoggerFactoryOptions, WinstonCreateFileName } from './interfaces';

export class WinstonLoggerFactory {
  private readonly LEVEL = Symbol.for('level');

  private readonly name: string;
  private readonly dirname: string;
  private readonly dataPattern: string;
  private readonly createFilename: WinstonCreateFileName;
  private readonly maxSize: string;
  private readonly maxFiles: string;

  constructor(opts?: WinstonLoggerFactoryOptions) {
    this.name = opts?.name ?? 'Nest';
    this.dirname = opts?.dirname ?? './logs';
    this.dataPattern = opts?.datePattern ?? 'YYYY-MM-DD';
    this.createFilename = opts?.createFilename ?? this.createDefaultFilename.bind(this);
    this.maxSize = opts?.maxSize ?? '150mb';
    this.maxFiles = opts?.maxFiles ?? '3d';
  }

  create(opts: WinstonLoggerFactoryCreateOptions = {}) {
    return WinstonModule.createLogger({
      transports: [].concat(this.createConsoleTransports(opts.consoleLevel)).concat(this.createFileTransports(opts.fileLevel)),
    });
  }

  private createDefaultFilename(level: WinstonLoggerLevel): string {
    return [this.name, '%DATE%', level].join('.');
  }

  private getFormatByLevel(level: WinstonLoggerLevel) {
    const format = winston.format((info) => {
      if (info[this.LEVEL] === level) {
        return info;
      } else {
        return false;
      }
    });

    return format();
  }

  private getDailyTransportOptions(level: WinstonLoggerLevel): DailyRotateFileTransportOptions {
    return {
      level,
      dirname: this.dirname,
      datePattern: this.dataPattern,
      filename: this.createFilename(level),
      maxSize: this.maxSize,
      maxFiles: this.maxFiles,
      format: winston.format.combine(this.getFormatByLevel(level), winston.format.timestamp(), winston.format.json()),
    };
  }

  private createConsoleTransports(levels?: WinstonLoggerLevel[]): winston.transport[] {
    if (Array.isArray(levels) === false) {
      levels = ['silly'];
    }

    const transports: winston.transport[] = [];

    for (const level of levels) {
      transports.push(
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(this.name, {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      );
    }

    return transports;
  }

  private createFileTransports(levels?: WinstonLoggerLevel[]): winston.transport[] {
    if (Array.isArray(levels) === false) {
      levels = ['info'];
    }

    const transports: winston.transport[] = [];

    for (const level of levels) {
      transports.push(new DailyRotateFile(this.getDailyTransportOptions(level)));
    }

    return transports;
  }
}
