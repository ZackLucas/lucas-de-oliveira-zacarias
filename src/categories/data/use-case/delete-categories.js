import CategoriesDatabase from '../../infra/database/mongodb/categories.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'

export class DeleteCategories {
  async execute(ownerId, categoryId) {
    const categoriesDatabase = new CategoriesDatabase()

    // TODO adicionar validação se algum produto utiliza essa categoria antes da deleção

    const { modifiedCount } = await categoriesDatabase.delete(ownerId, categoryId)

    if (modifiedCount === 0) throw new BadRequestError(null, 'Category not deleted.')

    return { modifiedCount }
  }
}
