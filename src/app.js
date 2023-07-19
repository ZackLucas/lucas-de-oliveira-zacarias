import mongoose from 'mongoose'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { json, urlencoded } from 'express'

import { CatalogModule } from './catalog/protocols/module.js'

export const configureApp = async () => {
  const app = express.Router()

  // Config
  app.use(cors())
  app.use(helmet())
  app.use(json({ limit: '2mb' }))
  app.use(urlencoded({ extended: true, limit: '2mb' }))

  // Mongoose Config
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DATABASE_NAME } = process.env
  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DATABASE_NAME}`

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  // Catalog module initialize
  await CatalogModule.initialize()

  return app
}
