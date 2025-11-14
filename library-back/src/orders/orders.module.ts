import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';
import { User } from '../users/users.entity';
import { Book } from '../book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Book])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports:[OrdersService],
})
export class OrdersModule {}
