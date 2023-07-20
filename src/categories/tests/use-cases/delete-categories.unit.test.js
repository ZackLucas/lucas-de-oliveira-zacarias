import { DeleteCategories } from '../../data/index.js'

import { CategoriesMock } from '../mocks/categories.mock.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'

import { CategoriesDatabase } from '../../infra/index.js'
import { ProductsDatabase } from '../../../products/infra/index.js'

describe('Use Cases -> Delete Categories', () => {
  beforeAll(() => {
    new ProductsDatabase()
  })
  it('Should be able delete category', async () => {
    const categoriesMock = await CategoriesMock.create().persist()

    const deleteCategories = new DeleteCategories()
    const { ownerId, _id } = categoriesMock
    const response = await deleteCategories.execute(ownerId, _id)

    const categoriesDatabase = new CategoriesDatabase()
    const updatedCategory = await categoriesDatabase.findOneById(ownerId, _id)

    expect(updatedCategory).toStrictEqual(null)
    expect(response.deletedCount).toStrictEqual(1)
  })

  it('Should not be able delete category - Category not deleted.', async () => {
    const categoriesMock = CategoriesMock.create()

    const deleteCategories = new DeleteCategories()
    const { ownerId, _id } = categoriesMock.category

    await expect(deleteCategories.execute(ownerId, _id)).rejects.toThrow(BadRequestError)
  })

  it('Should not be able delete category - unexpected error.', async () => {
    const categoriesMock = CategoriesMock.create()

    const deleteCategories = new DeleteCategories()
    const { ownerId, _id } = categoriesMock.category

    await expect(deleteCategories.execute(ownerId, _id)).rejects.toThrow(BadRequestError)
  })
})
