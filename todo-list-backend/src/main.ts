import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
    exposeHeaders: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
