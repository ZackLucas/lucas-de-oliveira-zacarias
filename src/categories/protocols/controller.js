import { CreateCategories, UpdateCategories, DeleteCategories } from '../data/index.js'

export default class CategoriesController {
  async createCategories(req, res) {
    try {
      const { title, description } = req.body
      const { ownerId } = req.params
      const useCase = new CreateCategories()

      const response = await useCase.execute(ownerId, title, description)

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

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }
}
