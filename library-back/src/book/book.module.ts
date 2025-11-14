import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  //nestمیاد یهrepository از entity رو برای دسترسی به جدول (در service)میسازه
  imports:[TypeOrmModule.forFeature([Book])],
 
  controllers: [BookController],
   providers:[BookService],
   exports: [TypeOrmModule],
})
export class BookModule {}
