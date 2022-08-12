import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { AddTransactionDto, EditTransactionDto } from 'src/transaction/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService; // Dependency injection

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip out elements which are not defined in the dto
      }),
    );

    await app.init(); // Start the server
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  // Auth
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'bob@email.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
        // .inspect();
      });
    });

    describe('Login', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no body provided', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      it('should log in', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token'); // pactum method: stores(setAVariable, infoInTheResponse)
      });
    });
  });

  // User
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Bob',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName);
      });
    });
  });

  // Transaction
  describe('Transaction', () => {
    describe('Get empty transactions', () => {
      it('should get transactions', () => {
        return pactum
          .spec()
          .get('/transactions')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create a transaction', () => {
      const dto: AddTransactionDto = {
        text: 'Book',
        amount: -20,
        category: 'Entertainment',
      };
      it('should crerate transaction', () => {
        return pactum
          .spec()
          .post('/transactions')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .withBody(dto)
          .expectStatus(201)
          .stores('transactionId', 'id');
      });
    });

    describe('Get all transactions', () => {
      it('should get all transactions', () => {
        return pactum
          .spec()
          .get('/transactions')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get transaction by id', () => {
      it('should get transaction by id', () => {
        return pactum
          .spec()
          .get('/transactions/{id}')
          .withPathParams('id', '$S{transactionId}')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .expectStatus(200)
          .expectBodyContains('$S{transactionId}');
      });
    });

    describe('Edit transaction by id', () => {
      const dto: EditTransactionDto = {
        category: 'Shopping',
      };
      it('should edit transaction', () => {
        return pactum
          .spec()
          .patch('/transactions/{id}')
          .withPathParams('id', '$S{transactionId}')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.category);
      });
    });

    describe('Delete transaction by id', () => {
      it('should delete transaction', () => {
        return pactum
          .spec()
          .delete('/transactions/{id}')
          .withPathParams('id', '$S{transactionId}')
          .withHeaders('Authorization', 'Bearer $S{userAccessToken}')
          .expectStatus(204);
      });

      it('should get empty transactions', () => {
        return pactum
          .spec()
          .get('/transactions')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
