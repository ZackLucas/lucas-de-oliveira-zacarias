import { UpdateProducts } from '../../data/index.js'

import { ProductsMock } from '../mocks/products.mock.js'
import { CategoriesMock } from '../../../categories/tests/mocks/categories.mock.js'

import { ValidationError } from '../../../core/domain/errors/validation.error.js'

import { Products } from '../../infra/index.js'
import { ObjectId } from 'mongodb'

describe('Use Cases -> Update Products', () => {
  it('Should be able update a products', async () => {
    const fakeOwnerId = new ObjectId()
    const categoryMock = await CategoriesMock.create(fakeOwnerId).persist()
    const productMock = await ProductsMock.create(categoryMock._id, fakeOwnerId).persist()

    const updateProducts = new UpdateProducts()

    const { ownerId, ...rest } = ProductsMock.create(categoryMock._id, fakeOwnerId).productWithoutId

    const response = await updateProducts.execute(fakeOwnerId, productMock._id, rest)

    const updatedProduct = await Products.findOne({ ownerId, _id: productMock._id })

    expect(updatedProduct.ownerId).toStrictEqual(ownerId.toString())
    expect(updatedProduct.title).toStrictEqual(rest.title)
    expect(updatedProduct.description).toStrictEqual(rest.description)
    expect(updatedProduct.price).toStrictEqual(rest.price)
    expect(response).toHaveProperty('modifiedCount', 1)
  })

  it('Should not be able update products - ownerId is required.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id } = productMock

    await expect(updateProducts.execute(null, _id, {})).rejects.toThrow(ValidationError)
  })

  it('Should not be able update products - title is required.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id } = productMock

    await expect(updateProducts.execute(ownerId, _id, {})).rejects.toThrow(ValidationError)
  })

  it('Should not be able update products - price is required.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, title } = productMock

    await expect(updateProducts.execute(ownerId, _id, { title })).rejects.toThrow(ValidationError)
  })

  it('Should not be able update products - price is not valid.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, title } = productMock

    await expect(updateProducts.execute(ownerId, _id, { title, price: 'text' })).rejects.toThrow(ValidationError)
  })

  it('Should not be able update products - productId is not valid.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, title, price } = productMock

    await expect(updateProducts.execute(ownerId, 'test', { title, price })).rejects.toThrow(ValidationError)
  })

  it('Should not be able update products - categoryId is not valid.', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, title, price } = productMock

    await expect(updateProducts.execute(ownerId, _id, { title, price, categoryId: 'test' })).rejects.toThrow(
      ValidationError,
    )
  })

  it('Should not be able update products - No information has been updated.', async () => {
    const productMock = ProductsMock.create()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, ...rest } = productMock.product

    await expect(updateProducts.execute(ownerId, _id, rest)).rejects.toThrow('No information has been updated.')
  })

  it('Should not be able update products - duplicate item', async () => {
    const fakeOwnerId = new ObjectId()
    const categoryMock = await CategoriesMock.create(fakeOwnerId).persist()
    const productMock1 = await ProductsMock.create(categoryMock._id, fakeOwnerId).persist()
    const productMock2 = await ProductsMock.create(categoryMock._id, fakeOwnerId).persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id } = productMock1
    const { title, description, price, categoryId } = productMock2

    await expect(updateProducts.execute(ownerId, _id, { title, description, price, categoryId })).rejects.toThrow(
      'Product is already exists.',
    )
  })

  it('Should not be able update products - unexpected error', async () => {
    const productMock = await ProductsMock.create().persist()

    const updateProducts = new UpdateProducts()
    const { ownerId, _id, ...rest } = productMock

    jest.spyOn(Products, 'updateOne').mockImplementation(() => {
      throw new Error()
    })

    await expect(updateProducts.execute(ownerId, _id, rest)).rejects.toThrow(Error)
  })
})
