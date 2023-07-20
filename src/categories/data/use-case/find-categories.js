import { InvalidParamError } from '../../../core/domain/index.js'

import { CategoriesDatabase } from '../../infra/index.js'

export class FindCategories {
  async execute(ownerId) {
    this.validateEntries(ownerId)

    const categoriesDatabase = new CategoriesDatabase()
    const category = await categoriesDatabase.findAllByOwnerId(ownerId)

    return category
  }

  validateEntries(ownerId) {
    if (!ownerId) throw new InvalidParamError('ownerId')
  }
}
