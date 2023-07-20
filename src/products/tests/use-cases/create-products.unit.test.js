import { ObjectId } from 'mongodb'

import { BadRequestError, ValidationError } from '../../../core/domain/index.js'
import { CategoriesMock } from '../../../categories/tests/mocks/categories.mock.js'

import { CreateProducts } from '../../data/index.js'
import { Products } from '../../infra/index.js'
import { ProductsMock } from '../mocks/products.mock.js'

describe('Use Cases -> Create Products', () => {
  it('Should be able create product and return data', async () => {
    const fakeOwnerId = new ObjectId()
    const { _id } = await CategoriesMock.create().persist(fakeOwnerId)
    const productsMock = ProductsMock.create(_id, fakeOwnerId)

    const createProducts = new CreateProducts()
    const { ownerId, ...rest } = productsMock.product
    const response = await createProducts.execute(ownerId, rest)

    expect(response.description).toStrictEqual(rest.description)
    expect(response.ownerId).toStrictEqual(ownerId.toString())
    expect(response.title).toStrictEqual(rest.title)
    expect(response).toHaveProperty('_id')
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
  })

  it('Should not be able create product - ownerId is required', async () => {
    const productMock = ProductsMock.create()

    const createProducts = new CreateProducts()
    const { title, description } = productMock.product

    await expect(createProducts.execute(null, title, description)).rejects.toThrow(ValidationError)
  })

  it('Should not be able create product - title is required', async () => {
    const productMock = ProductsMock.create()

    const createProducts = new CreateProducts()
    const { ownerId } = productMock.product

    await expect(createProducts.execute(ownerId, {})).rejects.toThrow(ValidationError)
  })

  it('Should not be able create product - price is required', async () => {
    const productMock = ProductsMock.create()

    const createProducts = new CreateProducts()
    const { ownerId, title } = productMock.product

    await expect(createProducts.execute(ownerId, { title })).rejects.toThrow(ValidationError)
  })

  it('Should not be able create product - categoryId is not valid.', async () => {
    const productMock = ProductsMock.create()

    const createProducts = new CreateProducts()
    const { ownerId, title, price } = productMock.product

    await expect(createProducts.execute(ownerId, { title, price, categoryId: 'error-test' })).rejects.toThrow(
      ValidationError,
    )
  })

  it('Should not be able create product - product not registered.', async () => {
    const fakeOwnerId = new ObjectId()
    const { _id } = await CategoriesMock.create(fakeOwnerId).persist()
    const productMock = ProductsMock.create(_id, fakeOwnerId)

    const createProducts = new CreateProducts()
    const { ownerId, ...rest } = productMock.product

    const createCategory = jest.spyOn(Products, 'create').mockImplementationOnce(() => undefined)

    await expect(createProducts.execute(ownerId, rest)).rejects.toThrow(BadRequestError)
    expect(createCategory).toHaveBeenCalled()
  })

  it('Should not be able create product - Category not found or not exists.', async () => {
    const { _id } = CategoriesMock.create().category
    const productMock = await ProductsMock.create(_id).persist('test')

    const createProducts = new CreateProducts()
    const { ownerId, ...rest } = productMock

    await expect(createProducts.execute(ownerId, rest)).rejects.toThrow(BadRequestError)
  })

  it('Should not be able create product - duplicate item', async () => {
    const fakeOwnerId = new ObjectId()
    const { _id } = await CategoriesMock.create(fakeOwnerId).persist()
    const productsMock = await ProductsMock.create(_id, fakeOwnerId).persist()

    const createProducts = new CreateProducts()
    const { ownerId, ...rest } = productsMock.product

    await expect(createProducts.execute(ownerId, rest)).rejects.toThrow('Product is already exists.')
  })

  it('Should not be able create product - unexpected Error.', async () => {
    const fakeOwnerId = new ObjectId()
    const { _id } = await CategoriesMock.create(fakeOwnerId).persist()
    const productMock = await ProductsMock.create(_id, fakeOwnerId).persist()

    const createProducts = new CreateProducts()
    const { ownerId, ...rest } = productMock.product

    const createCategory = jest.spyOn(Products, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(createProducts.execute(ownerId, rest)).rejects.toThrow(Error)
    expect(createCategory).toHaveBeenCalled()
  })
})
