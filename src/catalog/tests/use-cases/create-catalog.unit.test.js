import { CreateCatalog } from '../../data/index.js'

import { CategoriesMock } from '../../../categories/tests/mocks/categories.mock.js'
import { ProductsMock } from '../../../products/tests/mocks/products.mock.js'

import AWS from 'aws-sdk'
import { ProductsDatabase } from '../../../products/infra/index.js'

jest.mock('aws-sdk', () => {
  const S3Mocked = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn().mockReturnValue([]),
  }
  return {
    config: {
      update: jest.fn(),
    },
    S3: jest.fn(() => S3Mocked),
  }
})

const s3 = new AWS.S3({
  region: 'us-east-2',
})

describe('Use Cases -> Catalog -> Create Catalog', () => {
  it('Should be able create catalog', async () => {
    const fakeOwnerId = 'test'
    const categoriesMock = await CategoriesMock.create(fakeOwnerId).persist()
    const productsMock = await ProductsMock.create(categoriesMock._id, fakeOwnerId).persist()

    const createCategories = new CreateCatalog()
    await createCategories.execute(fakeOwnerId)

    const [{ catalog }] = await new ProductsDatabase().findCatalogByOwnerId(fakeOwnerId)

    expect(s3.upload).toHaveBeenCalledTimes(1)
    expect(s3.upload().promise).toHaveBeenCalledTimes(1)

    expect(catalog[0].category_title).toStrictEqual(categoriesMock.title)
    expect(catalog[0].category_description).toStrictEqual(categoriesMock.description)
    expect(catalog[0].itens).toStrictEqual([
      {
        title: productsMock.title,
        description: productsMock.description,
        price: productsMock.price,
      },
    ])
  })

  it('Should be able create catalog - but categories not exists', async () => {
    const fakeOwnerId = 'test'
    const categoriesMock = CategoriesMock.create(fakeOwnerId)
    const productsMock = await ProductsMock.create(categoriesMock._id, fakeOwnerId).persist()

    const createCategories = new CreateCatalog()
    await createCategories.execute(fakeOwnerId)

    const catalog = await new ProductsDatabase().findCatalogByOwnerId(fakeOwnerId)

    expect(s3.upload).toHaveBeenCalledTimes(1)
    expect(s3.upload().promise).toHaveBeenCalledTimes(1)

    expect(catalog).toStrictEqual([])
  })
})
