import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable() // Configure db connection
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  // Teardown logic before running e2e test
  cleanDb() {
    // Make sure things are done in a specific order, use $transation
    return this.$transaction([
      this.transaction.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
