import express from 'express'
import 'dotenv/config'

import healthcheckRoutes from './healthcheck/protocols/routes.js'

import { configureApp } from './server.js'

async function server() {
  const app = express()

  app.use(configureApp())

  app.use('/healthcheck', healthcheckRoutes)

  app.listen(process.env.APP_SERVER_PORT, () => {
    console.log(`Server run: localhost:${process.env.APP_SERVER_PORT}/`)
  })
}

server()
