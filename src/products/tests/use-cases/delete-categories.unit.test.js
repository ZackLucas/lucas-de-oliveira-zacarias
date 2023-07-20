import { DeleteProducts } from '../../data/index.js'

import { ProductsMock } from '../mocks/products.mock.js'
import { CategoriesMock } from '../../../categories/tests/mocks/categories.mock.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'

import { ProductsDatabase, Products } from '../../infra/index.js'
import { ObjectId } from 'mongodb'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'

describe('Use Cases -> Delete Products', () => {
  it('Should be able delete category', async () => {
    const fakeOwnerId = new ObjectId()
    const categoryMock = await CategoriesMock.create(fakeOwnerId).persist()
    const productsMock = await ProductsMock.create(categoryMock._id, fakeOwnerId).persist()

    const deleteProducts = new DeleteProducts()
    const { _id } = productsMock
    const response = await deleteProducts.execute(fakeOwnerId, _id)

    const categoriesDatabase = new ProductsDatabase()
    const deletedCategory = await categoriesDatabase.findOneById(fakeOwnerId, _id)

    expect(deletedCategory).toStrictEqual(null)
    expect(response.deletedCount).toStrictEqual(1)
  })

  it('Should not be able delete category - Category not deleted.', async () => {
    const productsMock = CategoriesMock.create()

    const deleteProducts = new DeleteProducts()
    const { ownerId, _id } = productsMock.category

    await expect(deleteProducts.execute(ownerId, _id)).rejects.toThrow(BadRequestError)
  })

  it('Should not be able delete category - ownerId is required.', async () => {
    const productsMock = CategoriesMock.create()

    const deleteProducts = new DeleteProducts()
    const { _id } = productsMock.category

    await expect(deleteProducts.execute(null, _id)).rejects.toThrow(ValidationError)
  })

  it('Should not be able delete category - ownerId is required.', async () => {
    const productsMock = CategoriesMock.create()

    const deleteProducts = new DeleteProducts()
    const { ownerId, _id } = productsMock.category

    await expect(deleteProducts.execute(ownerId, 'test')).rejects.toThrow(ValidationError)
  })

  it('Should not be able delete category - unexpected error.', async () => {
    const productsMock = CategoriesMock.create()

    const deleteProducts = new DeleteProducts()
    const { ownerId, _id } = productsMock.category

    const deleteCategory = jest.spyOn(Products, 'deleteOne').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(deleteProducts.execute(ownerId, _id)).rejects.toThrow(Error)
    expect(deleteCategory).toHaveBeenCalled()
  })
})
