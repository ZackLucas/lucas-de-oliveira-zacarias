import { ObjectId } from 'mongodb'

import { BadRequestError, InvalidParamError, RequiredParamError } from '../../../core/domain/index.js'

import { ProductsDatabase } from '../../infra/index.js'
import { verifyCategory } from '../utils/verify-category.js'

export class CreateProducts {
  async execute(ownerId, payload) {
    this.validateEntries(ownerId, payload)

    if (payload.categoryId) await verifyCategory(ownerId, payload.categoryId)

    const productsDatabase = new ProductsDatabase()
    const product = await productsDatabase.create(ownerId, payload)

    if (!product) throw new BadRequestError(null, 'Product not registered.')

    return product
  }

  validateEntries(ownerId, { title, price, categoryId }) {
    if (!ownerId) throw new RequiredParamError('ownerId')
    if (!title) throw new RequiredParamError('title')
    if (!price) throw new RequiredParamError('price')

    if (!!categoryId && !ObjectId.isValid(categoryId)) throw new InvalidParamError('categoryId')
  }
}
