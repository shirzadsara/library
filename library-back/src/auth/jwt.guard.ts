
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * استفاده در کنترلر: @UseGuards(JwtAuthGuard, RolesGuard)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}