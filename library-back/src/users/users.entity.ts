import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { Order } from '../orders/orders.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // هش میشه با bcrypt

   @Column({ default: 'user' })
  role!: string; // 'user' | 'admin'

    // این رابطه برعکس سفارش‌ها
  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

}
