import { CategoriesDatabase } from '../../../categories/infra/index.js'
import { BadRequestError } from '../../../core/domain/index.js'

export const verifyCategory = async (ownerId, categoryId) => {
  const categoriesDatabase = new CategoriesDatabase()

  const category = await categoriesDatabase.findOneById(ownerId, categoryId)

  if (!category) throw new BadRequestError(null, 'Category not found or not exists.')
}
