# Expense Tracker TS

## About

This is a full-stack project to practice typescript, [Nest](https://github.com/nestjs/nest) framework and React.

## Prerequisites

Node.js, React.js

## Installation

```bash
$ npm install
```

## Run the server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# check prisma studio (db)
$ npx dotenv -e .env -- prisma studio

# migrate db after change
$ npm run prisma:dev:deploy
```

## Run the front

```bash
# development
$ npm run start
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

-   [Nest class-validator](https://docs.nestjs.com/pipes#class-validator)

Dotenv config:

-   [NestJs/config](https://www.npmjs.com/package/@nestjs/config): NestJS [Configuration](https://docs.nestjs.com/fundamentals/dynamic-modules) module based on the dotenv (to load process environment variables) package.

Hashing:

-   [argon2](https://www.npmjs.com/package/argon2): Hash user password and login token.

Authentication:

-   [NestJS passport](https://www.npmjs.com/package/@nestjs/passport): NestJS [Authentication](https://docs.nestjs.com/security/authentication#jwt-functionality) module
-   [passport](https://www.npmjs.com/package/passport)
-   [NestJS jwt](https://www.npmjs.com/package/@nestjs/jwt): NestJS [Authentication](https://docs.nestjs.com/security/authentication#jwt-functionality) module, JWT functionality.
-   [passport-jwt](https://www.npmjs.com/package/passport-jwt)

Dotenv config:

-   [NestJs/config](https://www.npmjs.com/package/@nestjs/config): NestJS [Configuration](https://docs.nestjs.com/fundamentals/dynamic-modules) module based on the dotenv (to load process environment variables) package.
-   [dotenv-cli](https://www.npmjs.com/package/dotenv-cli): A method to inject a dotenv file of our choice in our scripts, manage a separate .env.test file for testing purposes.

Container and DB:

-   [Docker compose](https://docs.docker.com/compose/): Make PostgreSQL connection in an isolated environment.
-   [Prisma](https://www.prisma.io/): PostgreSQL ORM
-   [Prisma client](https://www.npmjs.com/package/@prisma/client)

Frontend:

-   [React Router](https://www.npmjs.com/package/@types/react-router-dom): Routing for React
-   [axios](https://axios-http.com/)
-   [react-icons](https://react-icons.github.io/react-icons/)
-   [tailwindcss](https://tailwindcss.com/)
-   [framer-motion](https://www.npmjs.com/package/framer-motion): Animation library for React
-   [Chart.js](https://www.npmjs.com/package/@types/chart.js)
-   [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2#docs): Charts for React
-   [react-toastify](https://www.npmjs.com/package/react-toastify): Snackbar notifications for React
-   [react-modal](https://www.npmjs.com/package/@types/react-modal): Accessible modal dialog component for React
-   [React Select](https://react-select.com/home): A select control build with and for React

Testing:

-   Jest
-   [PactumJS](https://pactumjs.github.io/introduction/welcome.html#use-cases): A REST API Testing Tool used to automate e2e, integration, contract & component (or service level) tests. (This project used it to send requests to the server then analyse the responses in e2e test).

## Ports

-   Backend: `127.0.0.1:3333`
-   Frontend: `127.0.0.1:3000`

## Screen shots

![alt text](https://github.com/cligrenet/Expense-tracker-ts/blob/main/frontend/public/shot1.png 'shot 1')
![alt text](https://github.com/cligrenet/Expense-tracker-ts/blob/main/frontend/public/shot2.png 'shot 2')
