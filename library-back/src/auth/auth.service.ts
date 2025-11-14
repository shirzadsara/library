
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // اعتبارسنجی ایمیل/پسورد — برمی‌گرداند کاربر بدون پسورد اگر درست باشد
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('ایمیل یا پسورد اشتباه است');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('ایمیل یا پسورد اشتباه است');

    // حذف password در خروجی — باز هم entity در DB تغییری نکرده
    const { password, ...result } = user;
    return result;
  }

  // ساخت توکن: ایمیل، شناسه (sub) و role داخل payload قرار می‌گیرد
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload,
        { 
          expiresIn: '1h' ,
          secret:process.env.JWT_SECRET 
        }),
    };
  }
}