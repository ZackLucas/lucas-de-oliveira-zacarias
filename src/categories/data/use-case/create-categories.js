import CategoriesDatabase from '../../infra/database/mongodb/categories.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'

export default class CreateCategories {
  async execute(title, owner, description) {
    const categoriesDatabase = new CategoriesDatabase()

    this.validateEntries(title, owner)

    const user = await categoriesDatabase.create(title, owner, description)

    if (!user) throw new BadRequestError(null, 'unexpected error.')

    return user
  }

  validateEntries(title, owner) {
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!owner) throw new ValidationError(null, 'owner is required.')
  }
}
