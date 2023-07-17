import express from 'express'
import CategoriesController from './controller.js'

const routes = express.Router()
const controller = new CategoriesController()

routes.post('/', controller.createCategories)

export default routes
