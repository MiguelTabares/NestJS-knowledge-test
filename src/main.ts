import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API: Torneos - Van Rossum')
    .setDescription(
      'API para la gestión de torneos de videojuegos(esports) a nivel Colombia',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(
    `API application running on: http://localhost:${process.env.PORT}`,
  );
}
bootstrap();
