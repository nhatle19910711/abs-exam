import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  constructor(@InjectPinoLogger(AnyExceptionFilter.name) private readonly logger: PinoLogger) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal Server Error';

    const validMessage = (exception as any)?.response?.message ?? null;
    this.logger.error({ err: exception }, 'Caught exception');

    response.status(status).json({
      statusCode: status,
      message: validMessage ?? message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
