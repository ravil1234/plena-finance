# Plena Backend Assignement

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Module API's

```bash
Comment Module

@Post('BASE_URL'): Save a New Comment
@Get('BASE_URL'): Get all comments by pagination
@Get('BASE_URL/:postId'): Get comments by postIds
@Put('BASE_URL/:commentId'): Update a comment by ID
@Delete('BASE_URL/:commentId'): Delete a comment by ID
```

```bash
Post Module

@Post('BASE_URL/'): Save a New Post
@Get('BASE_URL/'): Get all posts by pagination
@Get('BASE_URL/:postId'): Get a post by ID
@Put('BASE_URL/:postId'): Update a post by ID
@Delete('BASE_URL/:postId'): Delete a Post by ID
```

```bash
User Module

@Post('BASE_URL/signup'): Signup a new user and save them to database
@Post('BASE_URL/login'): Checks if an existing user then login
@Get('BASE_URL/'): Get all users by pagination
@Put('BASE_URL/:userId'): Updates a user by Id
@Delete('BASE_URL/:userId'): Deletes a user by Id

```

## Technologies used

## Nest Js Framework

- A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- Gives you true flexibility by allowing use of any other libraries.
- Provides Modular Architecture.
- It is helpful in implelmenting design patterns in javascript easily.

### Nodejs/Express

- Node Js is a javascript runtime coupled with ExpressJs framework it allows and helps in creating higly scalable servers easily.

### NestJS RabbitMQ Microservice

Nest JS provides built-in support for the RBMQ messaging systems as transporters.

We are going to develop two applications one is plena-backend(client) and plena-consumer (microservice) which will be implementing communication between them over RabbitMQ.

### Mongo DB

- MongoDb is a NoSql database used to build highly available and scalable internet applications.
- Schema Design is flexible

### Mongoose Framework

Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB.

### TypeScript

- Typescript is strongly typed programming language build over javascript.
- It's used to provide typecheck and type errors.

### Docker

- Docker is used for deployment in production.

## Key Points

1. Design a modular based architecture.
2. Provides CRUD operations of everytable design.
3. Design a simple efficinet schema in mongoose
4. Version Control of Api is handled properly
5. Guards are used for auhentication and authorization of API's.
6. Common Response Interceptor
7. Global Error Handler Middleware
8. Winston logger has been integrated for logging purpose.
9. Clean code architecture.
