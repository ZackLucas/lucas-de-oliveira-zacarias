import express from 'express'
import CategoriesController from './controller.js'

const routes = express.Router()
const controller = new CategoriesController()

routes.post('/:ownerId', controller.createCategories, () => {
  /*
    #swagger.tags = ["Categories"]
  */
})
routes.put('/:ownerId/:categoryId', controller.updateCategories, () => {
  /*
    #swagger.tags = ["Categories"]
  */
})
routes.delete('/:ownerId/:categoryId', controller.deleteCategories, () => {
  /*
    #swagger.tags = ["Categories"]
  */
})

export default routes
