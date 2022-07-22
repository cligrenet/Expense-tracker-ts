import { category } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTransactionDto {
  @IsString()
  text: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  category?: category;
}
