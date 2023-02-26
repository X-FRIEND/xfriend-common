
import { camelToSnake, getProperty } from '../transformers';
import { LogPropertiesHandler } from './logPropertiesHandler';

export interface LoggerProps {
  error?: Error;
  message: string;
  method?: string;
  service?: string;
  statusCode?: number;
  processId?: string;
  [key: string]: unknown;
}

export interface LogObject {
  application: string;
  date: Date;
  environment: string;
  errorMessage?: string;
  errorStack?: string;
  message: string;
  processId?: string;
  statusCode?: number;
  tag: string;
  [key: string]: unknown;
}

export interface logConfigProps {
  application: string
  environment: string
}

const logConfigDefault: logConfigProps  = {
  application: 'app',
  environment: 'development',
}

export const loggerHandler = (config: logConfigProps) => ({
  error,
  message,
  method = 'method',
  service = 'service',
  statusCode,
  processId,
  ...spread
}: LoggerProps,): LogObject => {
  try {
    const loggerHandlerConfig = { ...logConfigDefault, ...config }
    const tag = `[${loggerHandlerConfig.application.toUpperCase()}][${camelToSnake(
      service
    ).toUpperCase()}][${camelToSnake(method).toUpperCase()}]`;

    const logObject: LogObject = {
      application: loggerHandlerConfig.application,
      environment: loggerHandlerConfig.environment,
      date: new Date(),
      errorMessage: getProperty('message', error),
      errorStack: getProperty('stack', error),
      message,
      processId,
      statusCode,
      tag,
      ...spread,
    };

    LogPropertiesHandler.handleLogProperties(logObject);

    return logObject;
  } catch (error) {
    console.error(error);
    return {} as LogObject;
  }
};