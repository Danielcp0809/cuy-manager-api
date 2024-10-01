import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Cuy Manager API')
    .setDescription(
      'Platform for managing guinea pig farms, tracking animals by category, optimizing resources, and generating detailed reports',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Enable validations globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // Convert query params to their respective types
      },
    }),
  );

  const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:3000';

  app.enableCors({
    origin: ['http://localhost:3000', webAppUrl],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3030);
}
bootstrap();
