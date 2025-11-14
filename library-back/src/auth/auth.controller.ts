// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Get,Req,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/users.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('test-token')
  testToken(@Req() req) {
    return {
      message: 'Token is valid ✅',
      user: req.user,
    };
  }

  // ثبت‌نام عمومی (user)
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  // لاگین — JWT در کوکی ذخیره می‌شود
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
   @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user);

    // ست کردن کوکی
res.cookie('jwt', token.access_token, {
  httpOnly: true, 
  sameSite: 'none', 
  secure: true,
  // maxAge: 24 * 60 * 60 * 1000, 
});


    return { message: 'ورود موفق بود ✅', role: user.role };

  }

  // Logout — پاک کردن کوکی
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax' });
    return { message: 'خروج انجام شد ✅' };
  }
}
