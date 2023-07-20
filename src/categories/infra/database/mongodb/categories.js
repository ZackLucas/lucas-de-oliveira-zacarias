import { BadRequestError } from '../../../../core/domain/index.js'

import { Categories } from './models/categories.model.js'

export class CategoriesDatabase {
  async findAllByOwnerId(ownerId) {
    const user = await Categories.find({ ownerId })

    return user
  }

  async findOneById(ownerId, categoryId) {
    const user = await Categories.findOne({ ownerId, _id: categoryId })

    return user
  }

  async create(title, ownerId, description) {
    try {
      const user = await Categories.create({ title, ownerId, description })

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Title is already exists.')
      throw new Error(error)
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
      throw new Error(error)
    }
  }

  async delete(ownerId, categoryId) {
    const user = await Categories.deleteOne({ ownerId, _id: categoryId })

    return user
  }
}
