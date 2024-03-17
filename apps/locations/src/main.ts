import { NestFactory } from '@nestjs/core';
import { LocationModule } from './location.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(LocationModule);
  app.setGlobalPrefix('api');
  const locationConfigService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: locationConfigService.get('TCP_PORT'),
    },
  });
  console.log(
    'LOCATIONS SERVICE TCP PORT: ',
    locationConfigService.get('TCP_PORT'),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(locationConfigService.get('PORT'));
}
bootstrap().then(() =>
  console.log('Location service is bootstrapped amd running'),
);
