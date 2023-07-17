import { BadRequestError } from '../../../../core/domain/errors/bad-request-error.js'
import Categories from './models/categories.model.js'

export default class CategoriesDatabase {
  async create(title, owner, description) {
    try {
      const user = await Categories.create({ title, owner, description })

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Title is already exists.')
    }
  }
}
