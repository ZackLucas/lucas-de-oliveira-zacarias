import { FindProducts } from '../../data/index.js'

import { CategoriesMock } from '../../../categories/tests/mocks/categories.mock.js'
import { ProductsMock } from '../mocks/products.mock.js'

import { ObjectId } from 'mongodb'

describe('Use Cases -> Find Products', () => {
  it('Should be able find products and return data', async () => {
    const fakeOwnerId = new ObjectId()
    const categoriesMock = await CategoriesMock.create(fakeOwnerId).persist()
    const productsMock = await ProductsMock.create(categoriesMock._id, fakeOwnerId).persist()

    const findProducts = new FindProducts()
    const { description, title } = productsMock

    const [response] = await findProducts.execute(fakeOwnerId)

    expect(response.description).toStrictEqual(description)
    expect(response.ownerId).toStrictEqual(fakeOwnerId.toString())
    expect(response.title).toStrictEqual(title)
    expect(response).toHaveProperty('_id')
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
  })

  it('Should not be able find products - products not found', async () => {
    const fakeOwnerId = new ObjectId()
    CategoriesMock.create(fakeOwnerId)

    const createCategories = new FindProducts()

    const response = await createCategories.execute(fakeOwnerId)

    expect(response).toStrictEqual([])
  })
})
