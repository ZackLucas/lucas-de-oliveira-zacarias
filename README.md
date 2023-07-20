## Description

Aplication test

## OBS

- For simplicity, the owner doesn't need to be created, when using routes you must inform the ownerId in the route parameters as a string.

  Example -> GET /v1/categories/Pizzaria-1/

- If docker is used to launch the application, it will also use mongodb instantiated in docker. If you choose default startup, mongodb will be used on atlas clusters.

## Installation And Config

```bash
$ npm install

-> Copie o .env para a raiz do projeto
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run on Docker

```bash
# build image docker without cache
$ docker-compose build --no-cache

# run docker
$ docker-compose up
```
