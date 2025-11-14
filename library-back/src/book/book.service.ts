import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateDto,UpdateDto } from './book.dto';



@Injectable()

export class BookService {
    constructor(
      //ریپازیتوری ک از ان تی تی (جدول) در ماژول کتاب ساختیم اینجا تزریق میکنیم
        @InjectRepository(Book)
        private readonly bookRepository:Repository<Book>,
    ){}
    create (data:CreateDto){
        const addbook=this.bookRepository.create(data);
        return this.bookRepository.save(addbook);
    }
  findAll() {
    return this.bookRepository.find();
  }
    findOne(id:number) {
    return this.bookRepository.findOne({ where: { id } });
    }
   findOne2(id:number) {
    return this.bookRepository.findOne({ where: { id } });
    }

  update(id: number, data: UpdateDto) {
    return this.bookRepository.update(id, data);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
    }

