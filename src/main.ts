import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: ['http://localhost:3000', 'https://alstjq.shop', 'https://dmmhn-next-js.vercel.app'],
    credentials: true,
  });
  app.use(
    //이 부분 추가
    ['/api-docs'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD, // 지정된 ID/비밀번호
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('DMMHN')
    .setDescription('The DMMHN API description')
    .setVersion('1.0')
    .addTag('DMMHN')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token', in: 'header' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8000);
}
bootstrap();
