import { CategoriesDatabase } from '../../infra/index.js'

import { BadRequestError, InvalidParamError } from '../../../core/domain/index.js'

export class CreateCategories {
  async execute(ownerId, title, description) {
    this.validateEntries(title, ownerId)

    const categoriesDatabase = new CategoriesDatabase()
    const category = await categoriesDatabase.create(title, ownerId, description)

    if (!category) throw new BadRequestError(null, 'category not registered.')

    return category
  }

  validateEntries(title, ownerId) {
    if (!title) throw new InvalidParamError('title')
    if (!ownerId) throw new InvalidParamError('ownerId')
  }
}
