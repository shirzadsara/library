import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsNumber()
  year!: number;

  @IsNumber()
  quantity!: number;

  @IsString()
  photo!: string;

  @IsOptional()
  @IsBoolean()
  available!: boolean;
}
export class UpdateDto {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  author!: string;

  @IsOptional()
  @IsNumber()
  year!: number;

  @IsNumber()
  price!: number;

  @IsString()
  photo!: string;

  @IsNumber()
  stock!: number;

  @IsOptional()
  @IsBoolean()
  available!: boolean;
}