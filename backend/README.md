# Expense Tracker TS

## About

This is a full-stack project to practice typescript, [Nest](https://github.com/nestjs/nest) framework and React.

## Prerequisites

Node.js, React.js

## Installation

```bash
$ npm install
```

## Running the server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# check prisma studio (db)
$npx dotenv -e .env -- prisma studio

# migrate db after change
$npm run prisma:dev:deploy
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# check prisma studio (db)
$ npx dotenv -e .env.test -- prisma studio

# migrate test db after change
$ npm run prisma:test:deploy
```

## Dependencies

Validation:

- [Nest class-validator](https://docs.nestjs.com/pipes#class-validator)

Dotenv config:

- [NestJs/config](https://www.npmjs.com/package/@nestjs/config): NestJS [Configuration](https://docs.nestjs.com/fundamentals/dynamic-modules) module based on the dotenv (to load process environment variables) package.

Hashing:

- [argon2](https://www.npmjs.com/package/argon2): Hash user password and login token

Authentication:

- [NestJS passport](https://www.npmjs.com/package/@nestjs/passport): NestJS [Authentication](https://docs.nestjs.com/security/authentication#jwt-functionality) module
- [passport](https://www.npmjs.com/package/passport)
- [NestJS jwt](https://www.npmjs.com/package/@nestjs/jwt): NestJS [Authentication](https://docs.nestjs.com/security/authentication#jwt-functionality) module, JWT functionality
- [passport-jwt](https://www.npmjs.com/package/passport-jwt)

Dotenv config:

- [NestJs/config](https://www.npmjs.com/package/@nestjs/config): NestJS [Configuration](https://docs.nestjs.com/fundamentals/dynamic-modules) module based on the dotenv (to load process environment variables) package.

Container and DB:

- [Docker compose](https://docs.docker.com/compose/): Make PostgreSQL connection in an isolated environment
- [Prisma](https://www.prisma.io/): PostgreSQL ORM
- [Prisma client](https://www.npmjs.com/package/@prisma/client)

Testing:

- [PactumJS](https://www.npmjs.com/package/pactum): A REST API Testing Tool used to automate e2e, integration, contract & component (or service level) tests. (This project used this to make http calls in e2e tests).
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli): A method to manage a separate .env.test file for testing purpose
