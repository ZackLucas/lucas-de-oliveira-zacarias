import express from 'express'
import 'dotenv/config'

import routes from './core/protocols/configure.routes.js'

import { configureApp } from './app.js'
import { logger } from './core/domain/index.js'

async function server() {
  const app = express()

  app.use(await configureApp())

  app.use('/v1', routes)

  app.listen(process.env.APP_SERVER_PORT, () => {
    logger.info(`Server run: localhost:${process.env.APP_SERVER_PORT}/`)
  })
}

server()
