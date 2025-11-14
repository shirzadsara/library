import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  year!: number;

  @Column('decimal')
  price!: number;

  @Column()
  photo!: string; // مسیر عکس به صورت string (مثلاً "/assets/book1.jpg")

  @Column({ default: 0 })
  stock!: number;

  @Column({ default: true })
  available!: boolean; // آیا کتاب موجود است؟

  // رابطه برعکس سفارش‌ها
  @OneToMany(() => Order, (order) => order.book)
  orders!: Order[];
}