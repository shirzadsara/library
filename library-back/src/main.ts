import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, //با این کوکی ارسال میشه
  });
  //اتصال بک اند ب فرانت اند
  //ب نست میگه
  //اجازه بده 
  // درخواست‌هایی که از یک دامنه/پورت دیگه میان 
  // (مثل فرانت‌اند React) رو قبول کنم

  await app.listen(3000);
}
bootstrap();
