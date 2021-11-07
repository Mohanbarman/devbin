import { Visibility } from '@prisma/client';
import { IsNotEmpty, IsOptional, Length, IsEnum } from 'class-validator';

export class CreateBinDto {
  @IsNotEmpty()
  @Length(10, 255)
  title: string;

  @IsNotEmpty()
  @Length(5, 100_000)
  body: string;

  @IsOptional()
  @Length(8, 20)
  password?: string;

  @IsNotEmpty()
  lang: string;

  @IsNotEmpty()
  @IsEnum(Visibility)
  visibility: Visibility;

  @IsNotEmpty()
  slug: string;
}
