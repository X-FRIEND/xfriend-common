import { loggerHandler, LogObject, LoggerProps, logConfigProps } from './loggerHandler';
import { camelToSnake, getProperty } from '../transformers';
import { LogPropertiesHandler } from './logPropertiesHandler';

jest.mock('../transformers');
jest.mock('./logPropertiesHandler');

describe('loggerHandler', () => {
  let mockConfig: logConfigProps;
  let mockError: Error;
  let mockLoggerProps: LoggerProps;

  beforeEach(() => {
    mockConfig = {
      application: 'testApp',
      environment: 'testEnv',
    };

    mockError = new Error('testError');
    mockLoggerProps = {
      error: mockError,
      message: 'testMessage',
      method: 'testMethod',
      service: 'testService',
      statusCode: 500,
      processId: 'testProcessId',
      testProp: 'testValue',
    };

  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return a log object with the correct properties', () => {
    const mockDate = new Date();
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const expectedTag = '[TESTAPP][TEST_SERVICE][TEST_METHOD]';
    const expectedLogObject: LogObject = {
      application: 'testApp',
      environment: 'testEnv',
      date: mockDate,
      errorMessage: 'testError',
      errorStack: 'testError',
      message: 'testMessage',
      statusCode: 500,
      processId: 'testProcessId',
      tag: expectedTag,
      testProp: 'testValue',
    };
    
    //@ts-ignore
    getProperty.mockImplementation(() => 'testError')

    camelToSnake
      //@ts-ignore
      .mockImplementationOnce(() => 'test_service')
      .mockImplementationOnce(() => 'test_method');


    const actualLogObject = loggerHandler(mockConfig)(mockLoggerProps);

    expect(camelToSnake).toHaveBeenCalledTimes(2);
    expect(camelToSnake).toHaveBeenCalledWith('testService');
    expect(camelToSnake).toHaveBeenCalledWith('testMethod');

    expect(LogPropertiesHandler.handleLogProperties).toHaveBeenCalledTimes(1);
    expect(LogPropertiesHandler.handleLogProperties).toHaveBeenCalledWith(expectedLogObject);

    expect(actualLogObject).toEqual(expectedLogObject);
  });

  it('should return an empty log object when an error is thrown', () => {
    jest.spyOn(console, 'error');

    (LogPropertiesHandler.handleLogProperties as jest.Mock).mockImplementation(() => {
      throw new Error('testError');
    });

    const actualLogObject = loggerHandler(mockConfig)(mockLoggerProps);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(actualLogObject).toEqual({});
  });
});