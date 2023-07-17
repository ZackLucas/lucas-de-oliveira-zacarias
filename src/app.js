import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { json, urlencoded } from 'express'

export const configureApp = () => {
  const app = express.Router()

  // Config
  app.use(cors())
  app.use(helmet())
  app.use(json({ limit: '2mb' }))
  app.use(urlencoded({ extended: true, limit: '2mb' }))

  return app
}
