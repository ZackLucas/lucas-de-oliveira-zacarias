import { CreateCategories } from '../../data/index.js'

import { CategoriesMock } from '../mocks/categories.mock.js'

import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'

import { Categories } from '../../infra/index.js'

describe('Use Cases -> Create Categories', () => {
  it('Should be able create category and return data', async () => {
    const categoriesMock = CategoriesMock.create()

    const createCategories = new CreateCategories()
    const { ownerId, title, description } = categoriesMock.category
    const response = await createCategories.execute(ownerId, title, description)

    expect(response.description).toStrictEqual(description)
    expect(response.ownerId).toStrictEqual(ownerId.toString())
    expect(response.title).toStrictEqual(title)
    expect(response).toHaveProperty('_id')
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
  })

  it('Should not be able create category - title is required', async () => {
    const categoriesMock = CategoriesMock.create()

    const createCategories = new CreateCategories()
    const { ownerId, description } = categoriesMock.category

    await expect(createCategories.execute(ownerId, null, description)).rejects.toThrow(ValidationError)
  })

  it('Should not be able create category - ownerId is required', async () => {
    const categoriesMock = CategoriesMock.create()

    const createCategories = new CreateCategories()
    const { title, description } = categoriesMock.category

    await expect(createCategories.execute(null, title, description)).rejects.toThrow(ValidationError)
  })

  it('Should not be able create category - category not registered.', async () => {
    const categoriesMock = CategoriesMock.create()

    const createCategories = new CreateCategories()
    const { ownerId, title, description } = categoriesMock.category

    const createCategory = jest.spyOn(Categories, 'create').mockImplementationOnce(() => undefined)

    await expect(createCategories.execute(ownerId, title, description)).rejects.toThrow(BadRequestError)
    expect(createCategory).toHaveBeenCalled()
  })

  it('Should not be able create category - duplicate item', async () => {
    const categoriesMock = await CategoriesMock.create().persist()

    const createCategories = new CreateCategories()
    const { ownerId, title, description } = categoriesMock

    await expect(createCategories.execute(ownerId, title, description)).rejects.toThrow('Title is already exists.')
  })

  it('Should not be able create category - unexpected Error.', async () => {
    const categoriesMock = CategoriesMock.create()

    const createCategories = new CreateCategories()
    const { ownerId, title, description } = categoriesMock.category

    const createCategory = jest.spyOn(Categories, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(createCategories.execute(ownerId, title, description)).rejects.toThrow(Error)
    expect(createCategory).toHaveBeenCalled()
  })
})
