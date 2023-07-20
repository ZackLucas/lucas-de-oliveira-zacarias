import express from 'express'
import 'dotenv/config'

import routes from './core/protocols/configure.routes.js'

import { configureApp } from './app.js'
import { logger } from './core/domain/index.js'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json' assert { type: 'json' }

export const server = async () => {
  const app = express()

  app.use(await configureApp())

  app.use('/v1', routes)

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.listen(process.env.APP_SERVER_PORT, () => {
    logger.info(`Server run: localhost:${process.env.APP_SERVER_PORT}/`)
  })
}

server()
