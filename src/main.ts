import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle('DMMHN')
    .setDescription('The DMMHN API description')
    .setVersion('1.0')
    .addTag('DMMHN')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token', in: 'header' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);
}
bootstrap();
