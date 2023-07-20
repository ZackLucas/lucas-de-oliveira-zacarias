import { ObjectId } from 'mongodb'

import { BadRequestError, InvalidParamError, RequiredParamError } from '../../../core/domain/index.js'

import { ProductsDatabase } from '../../infra/index.js'

import { verifyCategory } from '../utils/verify-category.js'

export class UpdateProducts {
  async execute(ownerId, productId, payload) {
    this.validateEntries(ownerId, productId, payload)

    if (payload.categoryId) await verifyCategory(ownerId, payload.categoryId)

    const productsDatabase = new ProductsDatabase()
    const { modifiedCount } = await productsDatabase.update(ownerId, productId, payload)

    if (modifiedCount === 0) throw new BadRequestError(null, 'No information has been updated.')

    return { modifiedCount }
  }

  validateEntries(ownerId, productId, { title, price, categoryId }) {
    if (!ownerId) throw new RequiredParamError('ownerId')
    if (!title) throw new RequiredParamError('title')
    if (!price) throw new RequiredParamError('price')
    if (!Number(price)) throw new InvalidParamError('price')
    if (!ObjectId.isValid(productId)) throw new InvalidParamError('productId')

    if (categoryId && !ObjectId.isValid(categoryId)) throw new InvalidParamError('categoryId')
  }
}
