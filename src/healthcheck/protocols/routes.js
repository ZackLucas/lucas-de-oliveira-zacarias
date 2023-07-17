import express from 'express'
import { HealthCheckController } from './controller.js'

const routes = express.Router()
const controller = new HealthCheckController()

routes.get('/', controller.healthcheck)

export default routes
