import express from 'express'
import CategoriesController from './controller.js'

const routes = express.Router()
const controller = new CategoriesController()

routes.post('/:ownerId', controller.createCategories)
routes.put('/:ownerId/:categoryId', controller.updateCategories)
routes.delete('/:ownerId/:categoryId', controller.deleteCategories)

export default routes
