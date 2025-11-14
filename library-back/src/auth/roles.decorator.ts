// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * @Roles('admin')این دکوراتور متادیتا می‌چسباند برای استفاده در متدها در کنترلر
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
