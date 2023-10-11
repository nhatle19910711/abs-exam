import { HttpException } from '@nestjs/common';
import { AnyExceptionFilter } from './any-exception.filter';
import { PinoLogger } from 'nestjs-pino';

describe('AnyExceptionFilter', () => {
  let exception: AnyExceptionFilter<HttpException>;

  beforeEach(async () => {
    exception = new AnyExceptionFilter<HttpException>(
      new PinoLogger(AnyExceptionFilter.name as any),
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('AnyExceptionFilter', () => {
    it('should be defined', () => {
      expect(exception).toBeDefined();
    });
    describe('catch', () => {
      it('should be called with exception and host', () => {
        const host = {
          switchToHttp: jest.fn().mockReturnThis(),
          getRequest: jest.fn().mockReturnThis(),
          getResponse: jest.fn().mockReturnValue({
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
          }),
        } as any;

        const newException = new HttpException('test', 500);

        exception.catch(newException, host);

        expect(host.switchToHttp).toBeCalledTimes(1);
        expect(host.getRequest).toBeCalledTimes(1);
        expect(host.getResponse).toBeCalledTimes(1);
      });
    });
  });
});
