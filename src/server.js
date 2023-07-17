import express from 'express'
import 'dotenv/config'

import routes from './core/protocols/configure.routes.js'

import { configureApp } from './app.js'

async function server() {
  const app = express()

  app.use(await configureApp())

  app.use('/v1', routes)

  app.listen(process.env.APP_SERVER_PORT, () => {
    console.log(`Server run: localhost:${process.env.APP_SERVER_PORT}/`)
  })
}

server()
