import CategoriesDatabase from '../../infra/database/mongodb/categories.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'

export class CreateCategories {
  async execute(title, ownerId, description) {
    this.validateEntries(title, ownerId)

    const categoriesDatabase = new CategoriesDatabase()
    const user = await categoriesDatabase.create(title, ownerId, description)

    if (!user) throw new BadRequestError(null, 'unexpected error.')

    return user
  }

  validateEntries(title, ownerId) {
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
  }
}
