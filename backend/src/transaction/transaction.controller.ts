import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AddTransactionDto, EditTransactionDto } from './dto';
import { TransactionService } from './transaction.service';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  addTransaction(
    @GetUser('id') userId: number,
    @Body() dto: AddTransactionDto,
  ) {
    return this.transactionService.addTransaction(userId, dto);
  }

  @Get()
  getTransactions(@GetUser('id') userId: number) {
    return this.transactionService.getTransactions(userId);
  }

  @Get(':id')
  getTransactionById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) transactionId: number,
  ) {
    return this.transactionService.getTransactionById(userId, transactionId);
  }

  @Patch(':id')
  editTransactionById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) transactionId: number,
    @Body() dto: EditTransactionDto,
  ) {
    return this.transactionService.editTransactionById(
      userId,
      transactionId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTransactionById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) transactionId: number,
  ) {
    return this.transactionService.deleteTransactionById(userId, transactionId);
  }
}
