import { CategoriesDatabase } from '../../infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'

export class UpdateCategories {
  async execute(ownerId, categoryId, title, description) {
    this.validateEntries(title, description)

    const categoriesDatabase = new CategoriesDatabase()
    const { modifiedCount } = await categoriesDatabase.update(ownerId, categoryId, title, description)

    if (modifiedCount === 0) throw new BadRequestError(null, 'No information has been updated.')

    return { modifiedCount }
  }

  validateEntries(title, description) {
    if (!title && !description) throw new ValidationError(null, 'Nothing to update.')
  }
}
