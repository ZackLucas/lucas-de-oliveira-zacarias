import createCategories from '../data/use-case/create-categories.js'

export default class CategoriesController {
  async createCategories(req, res) {
    try {
      const { title, description } = req.body
      const { owner } = req.params
      const useCase = new createCategories()

      const response = await useCase.execute(title, owner, description)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }
}
