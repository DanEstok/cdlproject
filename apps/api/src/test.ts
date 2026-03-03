import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function test() {
  console.log('Starting test...');
  try {
    const app = await NestFactory.create(AppModule);
    console.log('App created successfully');
    await app.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
