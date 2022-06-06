# NestJS MySQL example

NodeJS >= 16

## project setup

```sh
npm install @nestjs/core @nestjs/common reflect-metadata rxjs

npm install --save-dev @types/node ts-node ts-node-dev typescript

npm install @nestjs/platform-fastify

npm install mysql2
```

```sh
# for lint
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint

# for format
npm install --save-dev eslint-config-prettier prettier

# for unit test
npm install --save-dev @nestjs/testing @types/jest eslint-plugin-jest jest ts-jest
```

## scripts

### lint & format check

```sh
npm run lint
```

### lint & format fix

```sh
npm run fix
```

### test

```sh
npm run test
```

### run (watch)

```sh
npm run dev
```
