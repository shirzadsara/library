import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'نام اجباری است' })          // ⚠ نام نباید خالی باشد
  @IsString()                                         // باید رشته باشد
  @MinLength(3, { message: 'حداقل ۳ کاراکتر باشد' }) // حداقل طول ۳
  @MaxLength(50, { message: 'حداکثر ۵۰ کاراکتر' })   // حداکثر طول ۵۰
  name!: string;

  @IsNotEmpty({ message: 'ایمیل اجباری است' })
  @IsEmail({}, { message: 'ایمیل معتبر نیست' })       // معتبر بودن فرمت ایمیل
  email!: string;

  @IsNotEmpty({ message: 'رمز عبور اجباری است' })
  @IsString()
  @MinLength(6, { message: 'رمز حداقل ۶ کاراکتر' })
  @MaxLength(20, { message: 'رمز حداکثر ۲۰ کاراکتر' })
  password!: string;
}
