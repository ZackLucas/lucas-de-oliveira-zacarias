import express from 'express'
const routes = express.Router()

import healthcheckRoutes from '../../healthcheck/protocols/routes.js'
import categoriesRoutes from '../../categories/protocols/routes.js'

routes.use('/healthcheck', healthcheckRoutes)
routes.use('/categories', categoriesRoutes)

export default routes
