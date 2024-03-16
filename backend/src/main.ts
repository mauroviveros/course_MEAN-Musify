import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoErrorFilter } from '@filter/mongo-error.filter';
import { MongooseErrorFilter } from '@filter/mongoose-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new MongooseErrorFilter(), new MongoErrorFilter());
  await app.listen(3000);
}
bootstrap();
