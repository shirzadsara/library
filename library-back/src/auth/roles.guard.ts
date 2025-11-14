// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // نقش/نقش‌های مورد نیاز را از متادیتا می‌خوانیم.
    // getAllAndOverride: ابتدا handler (متد)، سپس کلاس را بررسی می‌کند.
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // اگر هیچ نقشِ خاصی مشخص نشده، با این گارد کاری نداریم → اجازه داده می‌شود.
    if (!requiredRoles) return true;

    //  گرفتن request 
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User in RolesGuard:', user);

    // اگر user وجود نداشته باشد (یعنی کاربر احراز هویت نشده) → دسترسی رد می‌شود
    if (!user) return false;

    //  بررسی می‌کنیم role کاربر داخل لیست requiredRoles هست یا نه
    return requiredRoles.includes(user.role);
  }
}
