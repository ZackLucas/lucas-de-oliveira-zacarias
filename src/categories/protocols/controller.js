import { CreateCategories, UpdateCategories, DeleteCategories, FindCategories } from '../data/index.js'
import { SendCatalogMessage } from '../../core/data/index.js'

export default class CategoriesController {
  async findCategories(req, res) {
    try {
      const { ownerId } = req.params
      const useCase = new FindCategories()

      const response = await useCase.execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }

  async createCategories(req, res) {
    try {
      const { title, description } = req.body
      const { ownerId } = req.params
      const useCase = new CreateCategories()

      const response = await useCase.execute(ownerId, title, description)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }

  async updateCategories(req, res) {
    try {
      const { title, description } = req.body
      const { ownerId, categoryId } = req.params
      const useCase = new UpdateCategories()

      const response = await useCase.execute(ownerId, categoryId, title, description)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }

  async deleteCategories(req, res) {
    try {
      const { ownerId, categoryId } = req.params
      const useCase = new DeleteCategories()

      const response = await useCase.execute(ownerId, categoryId)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }
}
