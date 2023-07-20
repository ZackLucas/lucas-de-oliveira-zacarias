import { FindCategories } from '../../data/index.js'

import { CategoriesMock } from '../mocks/categories.mock.js'

import { ObjectId } from 'mongodb'

describe('Use Cases -> Find Categories', () => {
  it('Should be able find category and return data', async () => {
    const fakeOwnerId = new ObjectId()
    const categoriesMock = await CategoriesMock.create(fakeOwnerId).persist()

    const findCategories = new FindCategories()
    const { description, title } = categoriesMock

    const [response] = await findCategories.execute(fakeOwnerId)

    expect(response.description).toStrictEqual(description)
    expect(response.ownerId).toStrictEqual(fakeOwnerId.toString())
    expect(response.title).toStrictEqual(title)
    expect(response).toHaveProperty('_id')
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
  })

  it('Should not be able find category - category not found', async () => {
    const fakeOwnerId = new ObjectId()
    CategoriesMock.create(fakeOwnerId)

    const findCategories = new FindCategories()

    const response = await findCategories.execute(fakeOwnerId)

    expect(response).toStrictEqual([])
  })
})
