
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ثبت‌نام عادی (role = 'user')
  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = data;

    const user= await this.usersRepository.findOne({ where: { email } }) ?? null;
    if (user) throw new ConflictException('کاربری با این ایمیل وجود دارد');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const saved = await this.usersRepository.save(newUser);
    const { password: _p, ...result } = saved;
    return result;
  }

  // ساخت ادمین — این متد باید توسط یک endpoint محافظت‌شده صدا زده شود
  async createAdmin(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = data;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('کاربری با این ایمیل وجود دارد');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const saved = await this.usersRepository.save(newAdmin);
    const { password: _p, ...result } = saved;
    return result;
  }

  // برای لاگین: نیاز داریم کاربر و پسورد را بگیریم
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // لیست همه کاربران (بدون پسورد)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('کاربری پیدا نشد');
    const { password, ...rest } = user;
    return rest;
  }
}
