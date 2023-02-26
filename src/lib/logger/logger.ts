import winston from 'winston'
import WinstonDailyRotateFile from 'winston-daily-rotate-file'

import { stringFormatter } from '../transformers'
import { loggerHandler, LoggerProps, LogObject } from './loggerHandler'

interface loggerConfig {
  application: string,
  environment: string,
  logFilePath: string
}

/**
 * Classe que encapsula o logger do Winston.
 */
export class Logger {
  logger: winston.Logger
  config: loggerConfig
  
  /**
   * Cria uma instância do logger do Winston.
   */
  constructor(config: loggerConfig) {
    this.config = config
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [new winston.transports.Console()]
    })
  }

  private getApplicationWithEnvironment(application: string, environment: string): string {
    return stringFormatter('%@-%@', application, environment)
  }

  private getLogFilePath(data: LogObject): string {
    const loggerWinston = winston.createLogger({})

    loggerWinston.add(new WinstonDailyRotateFile({
      filename: stringFormatter('%@/%@.log', this.config.logFilePath, this.getApplicationWithEnvironment(data.application, data.environment)),
      maxSize: '100m'
    }))

    loggerWinston.info('', data)
    loggerWinston.close()

    //@ts-ignore
    return `${loggerWinston.transports[0].dirname}/${loggerWinston.transports[0].filename}`
  }

  public error(log: LoggerProps): void {
    this.logger.error(loggerHandler(this.config)(log))
  }

  public warn(log: LoggerProps): void {
    this.logger.warn(loggerHandler(this.config)(log))
  }

  public info(log: LoggerProps): void {
    this.logger.info(loggerHandler(this.config)(log))
  }

  public verbose(log: LoggerProps): void {
    this.logger.verbose(loggerHandler(this.config)(log))
  }

  public debug(log: LoggerProps): void {
    this.logger.debug(loggerHandler(this.config)(log))
  }

  public silly(log: LoggerProps): void {
    this.logger.silly(loggerHandler(this.config)(log))
  }

  public sendFile(log: LogObject): string {
    return this.getLogFilePath(log)
  }
}