import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add global prefix
  // app.setGlobalPrefix('api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('NestJS  Intro API')
    .setDescription(
      'API documentation for the NestJS application - Kamal Kumar',
    )
    .setTermsOfService('http://localhost:4000/terms-of-service')
    .setLicense('MIT License', '')
    .addServer('http://localhost:4000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
  await app.listen(process.env.PORT ?? 4000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 4000}`);
  });
}
bootstrap();
