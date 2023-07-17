import express from 'express'
import CategoriesController from './controller.js'

const routes = express.Router()
const controller = new CategoriesController()

routes.post('/:owner', controller.createCategories)

export default routes
