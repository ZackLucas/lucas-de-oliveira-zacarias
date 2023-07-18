import express from 'express'
import ProductsController from './controller.js'

const routes = express.Router()
const controller = new ProductsController()

routes.post('/:ownerId', controller.createProducts)
routes.put('/:ownerId/:productId', controller.updateProducts)
routes.delete('/:ownerId/:productId', controller.deleteProducts)

export default routes
