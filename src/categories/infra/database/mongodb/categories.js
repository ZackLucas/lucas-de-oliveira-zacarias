import { BadRequestError } from '../../../../core/domain/errors/bad-request-error.js'
import { Categories } from './models/categories.model.js'

export class CategoriesDatabase {
  async create(title, ownerId, description) {
    try {
      const user = await Categories.create({ title, ownerId, description })

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Title is already exists.')
    }
  }

  async update(ownerId, categoryId, title, description) {
    try {
      const user = await Categories.updateOne(
        { ownerId, _id: categoryId },
        {
          $set: {
            title,
            description,
          },
        },
      )

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Title is already in use.')
    }
  }

  async delete(ownerId, categoryId) {
    const user = await Categories.deleteOne({ ownerId, _id: categoryId })

    return user
  }
}
