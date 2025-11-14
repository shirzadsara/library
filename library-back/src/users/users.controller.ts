
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
//import { Roles } from '../auth/roles.decorator';
//import { RolesGuard } from '../auth/roles.guard';

@Controller('register')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ثبت‌نام کاربر
  @Post('user')
  async register(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  // ایجاد ادمین (فقط کاربر با role = 'admin' می‌تواند)
 // @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post('admin')
  async createAdmin(@Body() data: CreateUserDto) {
    return this.usersService.createAdmin(data);
  }

  // لیست کاربران — فقط ادمین
  //@UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // پروفایل کاربر خودِ او (هر کاربر لاگین‌شده)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  // دیدن یک user خاص — فقط ادمین
 // @UseGuards(JwtAuthGuard, RolesGuard)
 // @Roles('admin')
@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
