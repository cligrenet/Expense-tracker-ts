import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddTransactionDto, EditTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async addTransaction(userId: number, dto: AddTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        ...dto,
      },
    });
    return transaction;
  }

  getTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  getTransactionById(userId: number, transactionId: number) {
    return this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async editTransactionById(
    userId: number,
    transactionId: number,
    dto: EditTransactionDto,
  ) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new ForbiddenException('Access to resources denied.');
    }

    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTransactionById(userId: number, transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new ForbiddenException('Access to resources denied.');
    }

    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
