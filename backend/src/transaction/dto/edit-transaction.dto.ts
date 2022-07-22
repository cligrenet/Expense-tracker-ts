import { category } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditTransactionDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  category?: category;
}
