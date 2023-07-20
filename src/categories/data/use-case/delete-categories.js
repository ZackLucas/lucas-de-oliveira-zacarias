import { BadRequestError } from '../../../core/domain/index.js'
import { CategoriesDatabase } from '../../infra/index.js'

export class DeleteCategories {
  async execute(ownerId, categoryId) {
    const categoriesDatabase = new CategoriesDatabase()

    // TODO adicionar validação se algum produto utiliza essa categoria antes da deleção

    const { deletedCount } = await categoriesDatabase.delete(ownerId, categoryId)

    if (deletedCount === 0) throw new BadRequestError(null, 'Category not deleted.')

    return { deletedCount }
  }
}
