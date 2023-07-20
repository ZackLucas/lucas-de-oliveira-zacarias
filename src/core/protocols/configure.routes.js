import express from 'express'
const routes = express.Router()

import categoriesRoutes from '../../categories/protocols/routes.js'
import healthcheckRoutes from '../../healthcheck/protocols/routes.js'
import productsRoutes from '../../products/protocols/routes.js'

routes.use('/categories', categoriesRoutes)
routes.use('/healthcheck', healthcheckRoutes)
routes.use('/products', productsRoutes)

export default routes
