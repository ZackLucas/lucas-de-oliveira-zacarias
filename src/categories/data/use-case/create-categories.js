import { CategoriesDatabase } from '../../infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'

export class CreateCategories {
  async execute(ownerId, title, description) {
    this.validateEntries(title, ownerId)

    const categoriesDatabase = new CategoriesDatabase()
    const category = await categoriesDatabase.create(title, ownerId, description)

    if (!category) throw new BadRequestError(null, 'category not registered.')

    return category
  }

  validateEntries(title, ownerId) {
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
  }
}
