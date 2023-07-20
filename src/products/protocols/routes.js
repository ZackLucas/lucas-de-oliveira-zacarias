import express from 'express'
import ProductsController from './controller.js'

const routes = express.Router()
const controller = new ProductsController()

routes.post('/:ownerId', controller.createProducts, () => {
  /*
    #swagger.tags = ["Products"]
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create Product',
      schema: {
        $title: 'Peperoni',
        $price: 59,
        $description: "Pizza de Queijo com calabresa",
        $categoryId: 'Id de teste'
      }
    }
  */
})
routes.put('/:ownerId/:productId', controller.updateProducts, () => {
  /*
    #swagger.tags = ["Products"]
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      description: 'Update Product',
      schema: {
        $title: 'Peperoni',
        $price: 59,
        $description: "Pizza de Queijo com calabresa",
        $categoryId: 'Id de teste'
      }
    }
  */
})
routes.delete('/:ownerId/:productId', controller.deleteProducts, () => {
  /*
    #swagger.tags = ["Products"]
  */
})

export default routes
