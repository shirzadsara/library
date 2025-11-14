
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({

      jwtFromRequest: ExtractJwt.fromExtractors([
        // از کوکی بخوان
        (req) => req?.cookies?.jwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),

      ignoreExpiration: false,
      // secret باید از .env بیاد؛ اینجا fallback هم می‌ذاریم
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  // وقتی توکن صحیح باشه، payload را اینجا میگیریم — مقدار برگشتی قرار می‌گیرد در req.user
  async validate(payload: any) {
    console.log('✅ JWT payload:', payload);

    // انتظار داریم payload شامل { sub: userId, email, role } باشد
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
