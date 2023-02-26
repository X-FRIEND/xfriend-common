import { Logger } from './logger'

jest.mock('winston-daily-rotate-file', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    stream: jest.fn(),
  })),
}));

jest.mock('winston', () => ({
  transports: {
    Console: jest.fn(),
  },
  format: {
    json: jest.fn(),
  },
  createLogger: jest.fn(() => ({
    transports: [{ dirname: 'my-app-dev', filename: '.log' }],
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    silly: jest.fn(),
    log: jest.fn(),
    verbose: jest.fn(),
    add: jest.fn(),
    close: jest.fn(),
  })),
}));

describe('Logger', () => {
  let logger: Logger

  beforeEach(() => {
    logger = new Logger({
      application: 'test',
      environment: 'test',
      logFilePath: '.'
    })
  })

  describe('error', () => {
    it('should call logger.error with the formatted log', async () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'error')

      logger.error(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('warn', () => {
    it('should call logger.warn with the formatted log', () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'warn')

      logger.warn(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('info', () => {
    it('should call logger.info with the formatted log', () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'info')

      logger.info(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('verbose', () => {
    it('should call logger.verbose with the formatted log', () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'verbose')

      logger.verbose(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('debug', () => {
    it('should call logger.debug with the formatted log', () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'debug')

      logger.debug(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('silly', () => {
    it('should call logger.silly with the formatted log', () => {
      const log = { message: 'Test log message' }
      const spy = jest.spyOn(logger, 'silly')

      logger.silly(log)

      expect(spy).toHaveBeenCalledWith(log)
    })
  })

  describe('sendFile', () => {
    it('should return the path to the log file', () => {
      const data = {
        application: 'my-app',
        environment: 'dev',
        message: 'Test log message',
        date: new Date(),
        tag: ''
      }

      const result = logger.sendFile(data)

      expect(result).toMatch(/my-app-dev\/\.log/gi);
    })
  })
})