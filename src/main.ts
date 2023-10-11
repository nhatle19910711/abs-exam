import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './config/config.provider';
import { IConfig } from 'config';
import { CORS_EXPOSED_HEADERS } from './shared/constant';
import * as cors from 'cors';
import * as express from 'express';
import { v4 as uuidV4 } from 'uuid';
import * as httpContext from 'express-http-context';
import * as responseTime from 'response-time';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { initializeSwagger } from './shared/swagger.help';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initializeApp(app);
  await initializeSwagger(app);
  const config = app.get<IConfig>(CONFIG);
  await app.listen(config.get<number>('server.port'));
}

async function initializeApp(app: INestApplication) {
  const config = app.get<IConfig>(CONFIG);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(responseTime({ header: 'x-response-time' }));
  app.use((req: express.Request, res: express.Response, next: () => void) => {
    const correlationId = uuidV4();
    httpContext.set('timestamp', Date.now());
    httpContext.set('correlationId', correlationId);
    req['id'] = correlationId;
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(config.get('service.baseUrl'));
  app.enableCors({
    exposedHeaders: CORS_EXPOSED_HEADERS,
  });
}

/* eslint no-console: 0 */
bootstrap()
  .then(() => {
    console.log('Bootstrapped ...');
  })
  .catch((e) => {
    console.error('Error on bootstrapping the app ...', e);
  });
