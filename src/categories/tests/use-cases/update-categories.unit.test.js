import { UpdateCategories } from '../../data/index.js'

import { CategoriesMock } from '../mocks/categories.mock.js'

import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'

import { Categories } from '../../infra/index.js'
import { ObjectId } from 'mongodb'

describe('Use Cases -> Update Categories', () => {
  it('Should be able update a category', async () => {
    const categoriesMock1 = await CategoriesMock.create().persist()
    const categoriesMock2 = CategoriesMock.create()

    const updateCategories = new UpdateCategories()

    const { _id, ownerId } = categoriesMock1
    const { title, description } = categoriesMock2.category

    const response = await updateCategories.execute(ownerId, _id, title, description)

    const updatedCategory = await Categories.findOne({ ownerId, _id })

    expect(updatedCategory.ownerId).toStrictEqual(ownerId)
    expect(updatedCategory.title).toStrictEqual(title)
    expect(updatedCategory.description).toStrictEqual(description)
    expect(response).toHaveProperty('modifiedCount', 1)
  })

  it('Should not be able update category - information not passed', async () => {
    const categoriesMock = await CategoriesMock.create().persist()

    const updateCategories = new UpdateCategories()
    const { ownerId, _id } = categoriesMock

    await expect(updateCategories.execute(ownerId, _id)).rejects.toThrow(ValidationError)
  })

  it('Should not be able update category - No information has been updated.', async () => {
    const categoriesMock = CategoriesMock.create()

    const updateCategories = new UpdateCategories()
    const { ownerId, _id } = categoriesMock.category

    await expect(updateCategories.execute(ownerId, _id, 'test', 'test description')).rejects.toThrow(BadRequestError)
  })

  it('Should not be able update category - duplicate item', async () => {
    const id = new ObjectId()
    const categoriesMock1 = await CategoriesMock.create().persist(id)
    const categoriesMock2 = await CategoriesMock.create().persist(id)

    const updateCategories = new UpdateCategories()
    const { ownerId, _id } = categoriesMock1
    const { title, description } = categoriesMock2

    await expect(updateCategories.execute(ownerId, _id, title, description)).rejects.toThrow(BadRequestError)
  })

  it('Should not be able update category - unexpected error', async () => {
    const categoriesMock = await CategoriesMock.create().persist()

    const updateCategories = new UpdateCategories()
    const { ownerId, _id } = categoriesMock

    jest.spyOn(Categories, 'updateOne').mockImplementation(() => {
      throw new Error()
    })

    await expect(updateCategories.execute(ownerId, _id, 'test title', 'test description')).rejects.toThrow(Error)
  })
})
