import express from 'express'
const routes = express.Router()

import healthcheckRoutes from '../../healthcheck/protocols/routes.js'
import categoriesRoutes from '../../categories/protocols/routes.js'
import productsRoutes from '../../products/protocols/routes.js'

routes.use('/healthcheck', healthcheckRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/products', productsRoutes)

export default routes
