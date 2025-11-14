import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { User } from '../users/users.entity';
import { Book } from '../book/book.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('کاربر پیدا نشد');

    const book = await this.booksRepository.findOne({ where: { id: dto.bookId } });
    if (!book) throw new NotFoundException('کتاب پیدا نشد');

    const order = this.ordersRepository.create({
      user,
      book,
      quantity: dto.quantity,
    });
    return this.ordersRepository.save(order);
  }



  async findAllByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('سفارش پیدا نشد');

    if (dto.quantity !== undefined) order.quantity = dto.quantity;

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('سفارش پیدا نشد');

    await this.ordersRepository.remove(order);
    return { message: 'سفارش حذف شد' };
  }
}
